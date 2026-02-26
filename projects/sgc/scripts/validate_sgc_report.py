#!/usr/bin/env python3
"""
Validador local de calidad documental SGC (Wave 3 - S5).

Uso:
  python3 scripts/validate_sgc_report.py <ruta_documento>
  python3 scripts/validate_sgc_report.py <ruta_documento> --json
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from dataclasses import asdict, dataclass
from datetime import datetime
from pathlib import Path
from typing import List, Optional


REGEX = {
    "doc_code": re.compile(r"\bREG-SGC-[A-Z]{3}-\d{4}-\d{3}\b"),
    "placeholder_curly": re.compile(r"\{\{[A-Z0-9_\-.]+\}\}"),
    "placeholder_square": re.compile(r"\[[^\]\n]{2,80}\]"),
    "wildcards": re.compile(r"\b(XXX|00X|00\?)\b", re.IGNORECASE),
    "annex_current": re.compile(r"^ANEXO-SGC-[A-Z]{3}-[A-Z]{3,5}-\d{4}-\d{3}$"),
    "annex_legacy": re.compile(r"^ANEXO-[A-Z]+-\d{3}(\.\.[A-Z0-9]+)?$"),
    "frm_current": re.compile(r"^FRM-SGC-[A-Z]{3}-[A-Z]{2,5}-\d{3}$"),
    "date_iso": re.compile(r"\b(\d{4}-\d{2}-\d{2})\b"),
    "date_latam": re.compile(r"\b(\d{2}/\d{2}/\d{4})\b"),
}

REQUIRED_SECTIONS = [
    "ALCANCE",
    "DATOS DEL CLIENTE",
    "DETALLES DEL EQUIPO",
    "NORMATIVA",
    "CRITERIOS DE ACEPTACIÓN",
    "RESULTADOS OBTENIDOS",
    "HALLAZGOS CRÍTICOS",
    "ANÁLISIS DE RIESGO",
    "DICTAMEN FINAL",
    "TRAZABILIDAD Y EVIDENCIAS",
]


@dataclass
class CheckResult:
    rule_id: str
    severity: str
    status: str
    message: str
    evidence: str = ""
    recommendation: str = ""


@dataclass
class ValidationSummary:
    file: str
    state: str
    passed: int
    warnings: int
    errors: int
    exit_code: int


class SGCValidator:
    def __init__(self, file_path: Path):
        self.file_path = file_path
        self.raw_text = self.file_path.read_text(encoding="utf-8", errors="ignore")
        self.text = self._normalize_text(self.raw_text)
        self.text_upper = self.text.upper()
        self.results: List[CheckResult] = []

    @staticmethod
    def _normalize_text(content: str) -> str:
        no_html = re.sub(r"<[^>]+>", " ", content)
        compact = re.sub(r"[\t\r]+", " ", no_html)
        compact = re.sub(r"\n{3,}", "\n\n", compact)
        return compact

    def _add(self, rule_id: str, severity: str, ok: bool, message_ok: str, message_fail: str, evidence: str = "", recommendation: str = ""):
        self.results.append(
            CheckResult(
                rule_id=rule_id,
                severity=severity,
                status="PASS" if ok else ("WARN" if severity == "WARN" else "FAIL"),
                message=message_ok if ok else message_fail,
                evidence=evidence,
                recommendation=recommendation,
            )
        )

    def _extract_state(self) -> str:
        # Tolerante a markdown/html: "**Estado del informe:** FINAL"
        m = re.search(
            r"ESTADO(?:\s+DEL\s+INFORME)?[^A-Z0-9]{0,20}(BORRADOR|REVISION|REVISIÓN|FINAL|RECHAZADO)",
            self.text_upper,
        )
        if not m:
            return "UNKNOWN"
        state = m.group(1).strip()
        mapping = {
            "BORRADOR": "BORRADOR",
            "REVISION": "REVISION",
            "REVISIÓN": "REVISION",
            "FINAL": "FINAL",
            "RECHAZADO": "RECHAZADO",
        }
        return mapping.get(state, state)

    def _extract_labeled_date(self, label: str) -> Optional[datetime]:
        pattern = re.compile(rf"{label}\s*[:\-]\s*([^\n]+)", re.IGNORECASE)
        m = pattern.search(self.text)
        if not m:
            return None
        line = m.group(1)
        iso = REGEX["date_iso"].search(line)
        if iso:
            return datetime.strptime(iso.group(1), "%Y-%m-%d")
        latam = REGEX["date_latam"].search(line)
        if latam:
            return datetime.strptime(latam.group(1), "%d/%m/%Y")
        return None

    def _extract_section_text(self, title_keyword: str) -> str:
        # Extrae bloque desde un título que contenga keyword hasta el siguiente título markdown "##"
        pattern = re.compile(
            rf"(^|\n)\s*#+\s*[^\n]*{re.escape(title_keyword)}[^\n]*\n(.*?)(?=\n\s*#+\s|\Z)",
            flags=re.IGNORECASE | re.DOTALL,
        )
        m = pattern.search(self.text)
        return m.group(2) if m else ""

    def run(self):
        state = self._extract_state()
        is_final = state == "FINAL"

        # S5-001 Código documental
        code_match = REGEX["doc_code"].search(self.text_upper)
        self._add(
            "S5-001",
            "ERROR",
            bool(code_match),
            "Código documental REG-SGC válido detectado.",
            "No se detectó código documental válido con patrón REG-SGC-XXX-YYYY-###.",
            evidence=code_match.group(0) if code_match else "",
            recommendation="Agregar/normalizar el código documental según STD-SGC-COD-v1.",
        )

        # S5-002 Placeholders y comodines
        placeholders = REGEX["placeholder_curly"].findall(self.text) + REGEX["placeholder_square"].findall(self.text)
        wildcards = REGEX["wildcards"].findall(self.text)
        if is_final:
            ok = len(placeholders) == 0 and len(wildcards) == 0
            self._add(
                "S5-002",
                "ERROR",
                ok,
                "Sin placeholders/comodines prohibidos para estado FINAL.",
                "Se detectaron placeholders o comodines prohibidos en estado FINAL.",
                evidence=f"placeholders={len(placeholders)}, wildcards={len(wildcards)}",
                recommendation="Reemplazar tokens [..], {{..}}, XXX/00X antes de emitir.",
            )
        else:
            ok = True
            self._add(
                "S5-002",
                "WARN",
                ok,
                "Documento no está en FINAL; placeholders permitidos temporalmente.",
                "",
                evidence=f"state={state}, placeholders={len(placeholders)}",
                recommendation="Limpiar placeholders antes de promover a FINAL.",
            )

        # S5-003 Secciones obligatorias
        missing_sections = [s for s in REQUIRED_SECTIONS if s not in self.text_upper]
        self._add(
            "S5-003",
            "ERROR",
            len(missing_sections) == 0,
            "Se detectaron todas las secciones obligatorias mínimas.",
            "Faltan secciones obligatorias del informe SGC.",
            evidence=", ".join(missing_sections[:8]),
            recommendation="Completar estructura conforme a sgc-master-template-v1.md.",
        )

        # S5-004 Fechas y consistencia temporal
        fecha_ins = self._extract_labeled_date(r"Fecha de inspecci[oó]n")
        fecha_emi = self._extract_labeled_date(r"Fecha de emisi[oó]n")
        fechas_ok = bool(fecha_ins and fecha_emi and fecha_ins <= fecha_emi)
        evidence = f"inspeccion={fecha_ins.date() if fecha_ins else None}, emision={fecha_emi.date() if fecha_emi else None}"
        self._add(
            "S5-004",
            "ERROR",
            fechas_ok,
            "Fechas válidas y consistentes (inspección <= emisión).",
            "Fechas faltantes o inconsistentes (inspección > emisión).",
            evidence=evidence,
            recommendation="Completar fechas y asegurar orden temporal correcto.",
        )

        # S5-005 Firmas
        firma_labels = ["REALIZADO POR", "VERIFICADO POR", "APROBADO POR"]
        missing_signatures = [lbl for lbl in firma_labels if lbl not in self.text_upper]
        signature_placeholder = any(
            re.search(rf"{lbl}[^\n]{{0,120}}(\[[^\]]+\]|\{{\{{[^}}]+\}}\}})", self.text, flags=re.IGNORECASE)
            for lbl in firma_labels
        )
        firmas_ok = len(missing_signatures) == 0 and not signature_placeholder
        if not is_final:
            severity = "WARN"
            firmas_ok = True
        else:
            severity = "ERROR"
        self._add(
            "S5-005",
            severity,
            firmas_ok,
            "Bloque de firmas completo y sin placeholders críticos.",
            "Bloque de firmas incompleto o con placeholders.",
            evidence=f"missing={missing_signatures}, placeholders_en_firma={signature_placeholder}",
            recommendation="Completar nombres/cargos/firmas para realizado, verificado y aprobado.",
        )

        # S5-006 Dictamen + CAPA condicional
        has_no_apto = bool(re.search(r"\bNO\s*APTO\b", self.text_upper))
        has_apto = bool(re.search(r"(?<!NO\s)\bAPTO\b", self.text_upper))
        dictamen_ok = has_no_apto or has_apto
        self._add(
            "S5-006",
            "ERROR",
            dictamen_ok,
            "Dictamen final detectado (APTO/NO APTO).",
            "No se detectó dictamen final explícito APTO/NO APTO.",
            evidence=f"apto={has_apto}, no_apto={has_no_apto}",
            recommendation="Incluir dictamen final explícito conforme plantilla.",
        )

        if has_no_apto:
            capa_section_text = self._extract_section_text("CAPA")
            capa_section = bool(capa_section_text)
            capa_actions = re.findall(r"\n\s*\d+[\.)]\s+.+", "\n" + capa_section_text)
            self._add(
                "S5-007",
                "ERROR",
                capa_section and len(capa_actions) > 0,
                "CAPA presente con acciones para caso NO APTO.",
                "Dictamen NO APTO sin CAPA accionable.",
                evidence=f"capa_section={capa_section}, acciones={len(capa_actions)}",
                recommendation="Agregar sección CAPA con acciones concretas y responsables.",
            )
        else:
            self._add(
                "S5-007",
                "WARN",
                True,
                "CAPA no requerida al no detectarse NO APTO.",
                "",
                evidence="",
                recommendation="",
            )

        # S5-008 Unidades críticas
        units_checks = {
            "TON": bool(re.search(r"\b\d+[\.,]?\d*\s*TON\b", self.text_upper)),
            "MIN": bool(re.search(r"\b\d+[\.,]?\d*\s*MIN\b", self.text_upper)),
            "MM": bool(re.search(r"\b\d+[\.,]?\d*\s*MM\b", self.text_upper)),
        }
        units_ok = units_checks["TON"] and units_checks["MIN"]
        self._add(
            "S5-008",
            "WARN" if not has_no_apto else "ERROR",
            units_ok and (units_checks["MM"] if has_no_apto else True),
            "Unidades críticas detectadas (TON/MIN y MM cuando aplica).",
            "Faltan unidades críticas o cuantificación requerida.",
            evidence=str(units_checks),
            recommendation="Asegurar unidades técnicas explícitas en resultados (TON, min, mm).",
        )

        # S5-009 Trazabilidad de anexos
        tokens = sorted(set(re.findall(r"\b(?:ANEXO|FRM)-SGC-[A-Z0-9\-]+\b|\bANEXO-[A-Z0-9\.\-]+\b", self.text_upper)))
        annexes = [t for t in tokens if t.startswith("ANEXO")]
        frms = [t for t in tokens if t.startswith("FRM")]

        annex_ok = len(annexes) > 0
        frm_ok = len(frms) > 0
        naming_issues = []
        for t in annexes:
            if not (REGEX["annex_current"].match(t) or REGEX["annex_legacy"].match(t)):
                naming_issues.append(t)
            if "XXX" in t:
                naming_issues.append(t)
        for t in frms:
            if not REGEX["frm_current"].match(t):
                naming_issues.append(t)
            if "XXX" in t:
                naming_issues.append(t)

        trace_ok = annex_ok and frm_ok and len(naming_issues) == 0
        severity = "ERROR" if is_final else "WARN"
        self._add(
            "S5-009",
            severity,
            trace_ok,
            "Referencias de anexos/formatos detectadas y con naming válido.",
            "Trazabilidad incompleta o naming de anexos/formatos no conforme.",
            evidence=f"anexos={annexes}, frms={frms}, issues={sorted(set(naming_issues))}",
            recommendation="Usar naming ANEXO-SGC-* y FRM-SGC-*-###; evitar legacy/XXX en FINAL.",
        )

        # S5-010 Completitud de resultados técnicos
        has_checklist = "8.1" in self.text_upper or "CHECKLIST" in self.text_upper
        has_pt = "8.2" in self.text_upper or "PENETRANTES" in self.text_upper or "ENSAYO PT" in self.text_upper
        has_carga = "8.3" in self.text_upper or "PRUEBA DE CARGA" in self.text_upper
        self._add(
            "S5-010",
            "ERROR",
            has_checklist and has_pt and has_carga,
            "Resultados técnicos mínimos (checklist/PT/carga) presentes.",
            "Faltan bloques de resultados técnicos mínimos (8.1/8.2/8.3).",
            evidence=f"checklist={has_checklist}, pt={has_pt}, carga={has_carga}",
            recommendation="Completar secciones de resultados conforme plantilla maestra.",
        )

        return state, self.results


def render_text(summary: ValidationSummary, results: List[CheckResult]) -> str:
    lines = []
    lines.append(f"SGC Quality Validator v1")
    lines.append(f"Archivo: {summary.file}")
    lines.append(f"Estado detectado: {summary.state}")
    lines.append("-" * 72)
    for item in results:
        lines.append(f"[{item.status}] {item.rule_id} ({item.severity}) - {item.message}")
        if item.evidence:
            lines.append(f"   evidencia: {item.evidence}")
        if item.recommendation and item.status != "PASS":
            lines.append(f"   acción: {item.recommendation}")
    lines.append("-" * 72)
    lines.append(
        f"Resumen: PASS={summary.passed} WARN={summary.warnings} FAIL={summary.errors} -> exit_code={summary.exit_code}"
    )
    return "\n".join(lines)


def main() -> int:
    parser = argparse.ArgumentParser(description="Validador de calidad documental SGC")
    parser.add_argument("document", type=Path, help="Ruta del informe .md/.html/.txt")
    parser.add_argument("--json", action="store_true", help="Salida en JSON")
    args = parser.parse_args()

    if not args.document.exists() or not args.document.is_file():
        print(f"ERROR: archivo no encontrado: {args.document}", file=sys.stderr)
        return 2

    validator = SGCValidator(args.document)
    state, results = validator.run()

    passed = sum(1 for r in results if r.status == "PASS")
    warnings = sum(1 for r in results if r.status == "WARN")
    errors = sum(1 for r in results if r.status == "FAIL")

    summary = ValidationSummary(
        file=str(args.document),
        state=state,
        passed=passed,
        warnings=warnings,
        errors=errors,
        exit_code=1 if errors > 0 else 0,
    )

    if args.json:
        payload = {
            "summary": asdict(summary),
            "results": [asdict(r) for r in results],
        }
        print(json.dumps(payload, ensure_ascii=False, indent=2))
    else:
        print(render_text(summary, results))

    return summary.exit_code


if __name__ == "__main__":
    raise SystemExit(main())
