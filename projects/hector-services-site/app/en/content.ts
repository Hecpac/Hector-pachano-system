export const blogEn: Record<
  string,
  {
    title: string
    excerpt: string
    summary: string
    takeaways: string[]
    content?: string[]
  }
> = {
  'guidelines-copy-ads-b2b-2026-w09': {
    title: 'B2B Ads copy guidelines for 2026',
    excerpt: 'Practical framework for promises, tone and prohibited claims across TOFU/MOFU/BOFU campaigns.',
    summary: 'This article defines a simple operating system to write ad copy that converts without overpromising.',
    takeaways: [
      'Match message to funnel stage (TOFU/MOFU/BOFU).',
      'Only publish claims you can prove with data.',
      'Align ad promise with landing H1 and CTA.'
    ]
  },
  'openai-londres-anthropic-enterprise-2026-w09': {
    title: 'OpenAI London + Anthropic enterprise push: what it means for B2B teams',
    excerpt: 'How the latest moves from OpenAI and Anthropic impact practical AI execution for service businesses.',
    summary: 'The competitive edge is no longer "using AI" but integrating it into measurable business workflows.',
    takeaways: [
      'Prioritize one critical flow over broad pilots.',
      'Define measurable KPIs before scaling.',
      'Tie AI output to revenue or operational speed.'
    ]
  },
  'texas-hb2067-explicaciones-aseguradoras-2026': {
    title: 'Texas HB 2067 (2026): written explanations from insurers',
    excerpt: 'What changed in Texas and what policyholders should do after denial, cancellation or non-renewal notices.',
    summary: 'Policyholders now gain stronger transparency rights; the key is acting quickly with documentation.',
    takeaways: [
      'Save every notice and effective date.',
      'Validate insurer data and request corrections in writing.',
      'Escalate to TDI when explanations are unclear.'
    ]
  },
  'si-la-ia-no-te-ve-2026-w09': {
    title: 'If AI cannot see your business: you are blocking search bots and losing assisted purchases',
    excerpt: 'Your SEO may look healthy yet lose sales. Fix your bot policy by channel and activate conversational purchase journeys with a 30-day plan.',
    summary: 'A growing share of the B2B buying journey happens inside AI-assisted experiences. If your site is not designed for that, you are invisible before the first meeting.',
    takeaways: [
      'Separate search bots from training bots in your robots.txt policy.',
      'Prioritize 5 high-commercial-intent URLs and make each one answer-ready.',
      'Reduce friction between AI discovery and conversion action.'
    ],
    content: [
      '## The real problem: visibility without conversion capacity',
      'Many B2B companies believe they are "doing fine" because organic traffic is stable and classic search positions hold. The issue is that a growing portion of the buying journey now happens inside AI-assisted experiences. In that channel, the criterion is not just ranking — it is whether your content is crawlable by search bots and whether your offer can capture transactional intent when the buyer is already decided.',
      'If today you indiscriminately block crawlers in robots.txt or do not distinguish between search bots and training bots, you may be closing exactly the channel that was generating high-intent discovery. Result: your website exists, but for the new commercial journey it is practically invisible.',
      '## What changed in 2025–2026 (verified data)',
      'Google confirmed that AI Overviews is live in more than 200 countries and territories and over 40 languages (source: blog.google/products-and-platforms/products/search/ai-overview-expansion-may-2025-update). That means the AI-assisted discovery layer is already a global interface — not an isolated test.',
      'In that same update, Google reported that in markets like the US and India, AI Overviews drove more than 10% higher usage of Google in queries where it appeared. For B2B, this translates to more initial decisions being made in synthesized answers and fewer in traditional link lists.',
      'Microsoft Advertising reported that in shopping experiences with Copilot, there were 53% more purchases in the 30 minutes following the interaction versus journeys without Copilot — and when purchase intent was present, Copilot journeys were 194% more likely to end in a purchase (source: about.ads.microsoft.com). This is not content theory: it is transactional impact.',
      '## Before vs after: a concrete case that moves revenue',
      'Before: a B2B company with a solid SEO baseline but a legacy robots file and a "block all new bots by default" policy. The marketing team celebrated stable traffic; sales noticed fewer qualified organic mentions in early prospect conversations. The purchase experience was also fragmented: from the assistant to the site, from the site to the form, from the form to scheduling — with drop-off at every step.',
      'After: the company separated governance by channel. It allowed relevant search bots and maintained stricter controls for training where applicable. In parallel, it adapted its commercial experience for AI-assisted journeys, drawing on the conversational checkout approach Microsoft describes in Copilot Checkout — where the purchase completes inside the conversation and the merchant retains commercial control.',
      'Expected result: less friction in discovery (higher eligibility to appear in AI responses) and less transactional friction (higher conversion probability when intent already exists).',
      '## 30-day execution plan for a B2B team',
      'Step 1 (days 1–5): bot inventory and policy by objective. Review robots.txt and define explicitly what you allow for search, what you restrict for training, and what requires legal or compliance review. Use official documentation from OpenAI, Google and Anthropic to avoid mixing bot categories.',
      'Step 2 (days 6–12): prioritize 5 URLs with the highest commercial impact (services, comparisons, pricing or cases). Each URL must clearly answer: problem, solution, evidence and next action. If an assistant cannot extract this in seconds, your citability drops.',
      'Step 3 (days 13–20): eliminate conversion friction in high-intent flows. Simplify forms, reduce steps between interest and action, and prepare an experience that supports assisted journeys where the user arrives already convinced. This is not about more content — it is about fewer obstacles to close.',
      'Step 4 (days 21–30): measure in a single dashboard. Do not stop at impressions or sessions — monitor incoming queries referencing assistants, qualified lead rate, time to first contact, and close rates in short windows when explicit intent is present.',
      '## Executive decision: what to do this week',
      'If your company still does not technically distinguish search from training, and still forces buyers across too many screens to purchase or schedule, you are losing efficiency at the most valuable moment of the journey.',
      'This week: define your bot policy by channel and select one commercial flow to redesign with conversational, close-oriented logic. You do not need to rebuild your entire site. You need technical clarity on crawling, focus on pages that sell, and operational discipline to measure real conversion.',
      '## Verified sources',
      '- blog.google/products-and-platforms/products/search/ai-overview-expansion-may-2025-update',
      '- about.ads.microsoft.com/en/blog/post/january-2026/conversations-that-convert-copilot-checkout-and-brand-agents',
      '- developers.openai.com/api/docs/bots',
      '- developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers',
      '- support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web'
    ]
  },
  'ia-b2b-global-2026-playbook-90-dias': {
    title: 'Global B2B AI playbook: 90-day execution plan',
    excerpt: 'A direct framework to convert AI experiments into measurable commercial results: pipeline, margin and risk control in global markets.',
    summary: 'The fastest path is phased deployment with explicit owners and weekly scorecards.',
    takeaways: [
      'Start with one business-critical use case.',
      'Ship in 2-week sprints with rollback criteria.',
      'Review outcomes every week against baseline.'
    ],
    content: [
      '## The pattern holding B2B teams back',
      'Most companies have already piloted AI in sales, support or marketing — but they remain in pilot mode: isolated use cases, disconnected data and zero financial accountability. The result is predictable: many internal demos and minimal real impact on pipeline or margin.',
      'The shift in 2026 is that the conversation is no longer "use AI or not" — it is which critical processes run with AI and under what control. If you do not define that system now, your competition will and will gain commercial velocity.',
      '## What changed in the global market (in production, not in theory)',
      'The Stanford AI Index 2025 reports acceleration in enterprise adoption and a growing gap between organizations that industrialize AI and those that remain in experiments. At the same time, Google expanded AI Overviews to 200+ countries and 40+ languages, and Microsoft is pushing conversational purchase journeys with Copilot Checkout.',
      'Translation for B2B: your global buyer already makes decisions with AI assistance. If your operation is not designed to respond, demonstrate value and convert in that channel, you are losing opportunities before the first meeting.',
      '## 90-day playbook: from pilot to commercial system',
      '### Front 1: business impact from week 1',
      '- Choose two use cases with a clear owner and P&L: inbound lead qualification and AI-assisted commercial proposal.',
      '- Define hard metrics per case: first response time, meeting scheduled rate, win rate and cost per opportunity.',
      '- Close each case with an SLA and rollback criteria to prevent eternal experiments.',
      '### Front 2: data and operations ready to scale',
      '- Centralize critical sources (CRM, tickets, pricing, cases) and eliminate duplicates before automating.',
      '- Design flows with human oversight at high-risk points: discounts, contractual commitments and technical claims.',
      '- Document prompts, tools and model versions as operational assets, not loose notes.',
      '### Front 3: risk and global compliance from the start',
      '- Adopt NIST AI RMF as a governance baseline and use the generative AI profile for specific controls.',
      '- Classify your use cases by regulatory risk, including EU AI Act obligations if you sell or serve in Europe.',
      '- Require traceability: who decided, with what data, which model and what result was produced.',
      '## KPIs that convince leadership',
      '- Percentage of AI-assisted pipeline with complete audit trail.',
      '- Reduction in commercial cycle (MQL to SQL and SQL to close).',
      '- Margin per account in assisted versus non-assisted processes.',
      '- Risk incidents per 1,000 automated interactions.',
      '## Executive decision for this week',
      'If in the next 7 days you cannot name owners, metrics and controls for your two priority use cases, you do not yet have an AI strategy — you have pilots. Fix that now and convert it into a global operational advantage.',
      '## Verified sources',
      '- hai.stanford.edu/ai-index/2025-ai-index-report',
      '- blog.google/products-and-platforms/products/search/ai-overview-expansion-may-2025-update',
      '- about.ads.microsoft.com/en/blog/post/january-2026/conversations-that-convert-copilot-checkout-and-brand-agents',
      '- nist.gov/itl/ai-risk-management-framework',
      '- eur-lex.europa.eu/eli/reg/2024/1689/oj'
    ]
  },
  'si-la-ia-no-te-ve-2026-w08': {
    title: 'AI visibility playbook: why your old website is invisible in AI search (and how to fix it)',
    excerpt: 'Visibility in AI is not fixed with better design. It is earned with bot policy, semantic architecture and content that assistants can actually cite.',
    summary: 'Visibility now depends on clarity, structured content and trust signals.',
    takeaways: [
      'Map long-tail intent before writing content.',
      'Publish pages with direct answers and clear CTA.',
      'Link evidence from case studies to service pages.'
    ],
    content: [
      '## I opened ChatGPT and your company did not appear — why this happens',
      'Many B2B companies still measure their websites only with traditional metrics: Google ranking, visits and form completions. The problem is that the discovery layer has changed. Clients and decision-makers now ask assistants like ChatGPT, Claude or Copilot before opening classic search results. If your site is not ready for that kind of reading, you can still look "fine" in classic SEO and yet fall completely outside the shortlist the buyer sees.',
      'The common mistake is treating AI visibility as an automatic extension of traditional SEO. It is not. OpenAI separates OAI-SearchBot (discovery) from GPTBot (training). Google distinguishes Google-Extended from its Search crawlers. Anthropic differentiates user-facing bots from training bots. In other words: the technical policy you apply today may be blocking exactly the channel that would have recommended you tomorrow.',
      '## Typical B2B case: same company, two different outcomes',
      'Scenario A (old web): generic homepage, ambiguous service pages, legacy robots.txt blocking bots without channel criteria, and long content without direct answers. Result: the assistant cannot clearly identify what problem you solve, for whom, and with what proof. The user asks "which provider helps me with X?" and your brand never enters the conversation.',
      'Scenario B (citability-oriented web): one URL per service with problem → solution → evidence structure, direct Q&A blocks, clean semantic markup, updated sitemap and per-user-agent rules decided with intent — what you allow for search and what you restrict for training. Result: higher probability of being extracted as a useful answer instead of just another lost link.',
      '## 30-day execution plan (without rebuilding your entire site)',
      '- Week 1: audit robots.txt and policies per bot (OpenAI, Anthropic, Google, Microsoft). Define what you enable for discovery and what you restrict for training, with an explicit decision per channel.',
      '- Week 2: restructure 3–5 critical service pages. Each must answer clearly: what problem you solve, for whom, how you execute it, and what result the client can expect.',
      '- Week 3: add citable content blocks (real Q&As, comparisons, common objections) and structured markup where applicable. Avoid filler — prioritize clarity and specificity.',
      '- Week 4: measure business signals, not just traffic. Watch lead quality, qualification speed and incoming queries where you are mentioned via AI recommendation.',
      '## Data that makes this impossible to ignore',
      'Google reported AI Overviews expansion to 200+ countries and 40+ languages. Microsoft reported purchase increases in Copilot-assisted journeys. This is not a future experiment — it is an active layer of discovery and conversion today. If your website is not designed to be understood and cited, you are competing at a disadvantage from the first minute of the commercial process.',
      '## Verified sources',
      '- developers.openai.com/api/docs/bots',
      '- developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers',
      '- support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web',
      '- blog.google/products-and-platforms/products/search/ai-overview-expansion-may-2025-update',
      '- about.ads.microsoft.com/en/blog/post/january-2026/conversations-that-convert-copilot-checkout-and-brand-agents'
    ]
  },
  'agentes-ia-vs-automatizacion-tradicional': {
    title: 'AI agents vs traditional automation: when rules break down',
    excerpt: 'When to use deterministic automation and when to deploy AI agents in B2B operations — a practical decision framework.',
    summary: 'Agents are useful for ambiguity; deterministic automations are best for stable repetitive flows.',
    takeaways: [
      'Use deterministic workflows for compliance-heavy tasks.',
      'Use agents where context interpretation matters.',
      'Always include human oversight for high-risk actions.'
    ],
    content: [
      '## The rule-based automation wall',
      'For years, B2B automation relied on rigid tools: if X happens, then Y occurs. This works perfectly for stable, predictable flows. The problem appears when the input is ambiguous — an unclear lead email, a support ticket that mixes multiple issues, or a sales inquiry that does not fit any predefined category.',
      'In 2026, AI agents powered by LLMs have changed the rules. You no longer program closed routes — you program objectives. An agent can read an email, decide if it is a qualified prospect, draft a personalized response by consulting your internal knowledge base, and schedule a meeting — all without a human touching it.',
      '## When deterministic automation wins',
      'Rule-based automation is the right choice when the flow is well-defined, compliance matters and errors are costly:',
      '- Invoice processing and financial reconciliation.',
      '- CRM field updates when data is structured (form → record).',
      '- SLA alerts triggered by time thresholds.',
      '- Status notifications with fixed templates.',
      'For these flows, LLM variability is a liability, not an asset. Deterministic systems are faster, cheaper and auditable.',
      '## When AI agents unlock new capacity',
      'Agents become valuable when inputs are unstructured, context interpretation matters, or the task requires judgment that rules cannot encode:',
      '- Inbound lead qualification from mixed-format emails or chat.',
      '- First-draft proposal generation from a structured brief.',
      '- Support triage when tickets span multiple categories.',
      '- Research-to-insight pipelines where synthesis is the deliverable.',
      '## Practical architecture: guard rails and oversight',
      'Deploying agents without oversight is the fastest way to lose trust and create operational risk. The architecture that works in production:',
      '- Human-in-the-loop on high-stakes outputs (contracts, pricing, public commitments).',
      '- Confidence thresholds: agent acts autonomously above threshold, escalates below.',
      '- Audit log per agent action: what it read, what it decided, what it produced.',
      '- Rollback at every stage — never build agents that write to production without a reversible step.',
      '## Decision framework: which tool for which problem',
      '- Input is structured + stakes are high → deterministic automation.',
      '- Input is unstructured + judgment is needed → AI agent with oversight.',
      '- Mixed: deterministic intake (normalize the data), agent for downstream interpretation.',
      '- Always: document the decision boundary so the team knows when to escalate.',
      '## Where to start this week',
      'Map your top three manual bottlenecks. For each one, ask: is the input structured? Is the error cost high? If yes to both — automate deterministically. If no to the first — evaluate an agent with a tightly scoped objective and a human review step. Start with the safest case and build trust before expanding scope.'
    ]
  },
  'rendimiento-web-react-19-conversion': {
    title: 'React 19 performance and conversion: why speed is your best salesperson',
    excerpt: 'How modern React performance patterns directly influence B2B conversion metrics — and what to measure.',
    summary: 'Performance is not only technical quality; it directly affects lead capture and form completion.',
    takeaways: [
      'Optimize interaction latency on mobile first.',
      'Reduce above-the-fold JS and non-critical effects.',
      'Track conversion deltas after each performance release.'
    ],
    content: [
      '## Visual design attracts, performance retains',
      'A B2B user unconsciously evaluates the quality of your services based on how fast and responsive your website feels. A site that stutters on mobile, delays above-the-fold content, or flickers on hydration signals technical debt — and that signal transfers to your offer.',
      'With React 19 and Next.js 16, the patterns that caused most of these problems (render waterfalls, heavy client-side hydration, blocking third-party scripts) have concrete solutions that ship to production today.',
      '## What changed with React 19 + Next.js 16',
      'Server Components eliminate the client-side JS waterfalls that were responsible for the majority of LCP and INP regressions. The component renders on the server, the HTML arrives ready, and the browser does not need to fetch and execute megabytes of JavaScript before showing meaningful content.',
      'Server Actions enable form submissions — including lead capture forms — without loading heavy client-side form libraries. A lead form built with Server Actions sends the data server-side, validates it and returns a result without a full page reload and without extra JavaScript in the browser.',
      '## The conversion numbers that make this a business case',
      '- Every 100ms reduction in LCP correlates with measurable improvements in conversion rate (Google CrUX data).',
      '- INP (Interaction to Next Paint) above 200ms on mobile creates form abandonment. Below 100ms, completion rates climb.',
      '- A B2B landing with LCP under 2.5s and INP under 100ms consistently outperforms its slower equivalent on the same traffic.',
      '## What to implement first',
      '- Move data fetching to Server Components — eliminate client waterfalls on service and case pages.',
      '- Replace client-side form handlers with Server Actions on lead capture flows.',
      '- Defer analytics and chat scripts using next/script with strategy="lazyOnload".',
      '- Set explicit width/height on all images and use next/image to prevent CLS.',
      '- Run a Core Web Vitals audit on your top 3 commercial pages (service, contact, case study) and fix LCP and INP first.',
      '## How to track performance as a conversion lever',
      'Instrument two dashboards in parallel: one technical (LCP, INP, CLS per page from CrUX or RUM), one commercial (form start rate, form completion rate, CTA click rate). Run a performance release and compare both dashboards in the 7 days before and after. That delta is your ROI argument for the next optimization sprint.',
      '## Where to start this week',
      'Pick the single highest-traffic commercial page on your site. Run a Lighthouse audit on mobile. If LCP is above 2.5s or INP is above 200ms, you have a direct conversion lever waiting. Fix the top two findings and measure the delta in form completions within 14 days.'
    ]
  },
  'estrategia-aeo-2026': {
    title: 'AEO strategy for 2026: how to make your pages citable in AI answers',
    excerpt: 'A practical framework to become the source AI assistants cite — not just rank in classic search.',
    summary: 'AEO is about answer clarity, authority signals and measurable intent coverage.',
    takeaways: [
      'Use concise answer blocks near the top of each page.',
      'Connect services to proof-heavy case studies.',
      'Measure qualified clicks, not vanity impressions.'
    ],
    content: [
      '## The paradigm shift: from ranking to being cited',
      'B2B buyers no longer search for "web design agencies" and open ten tabs. They ask their AI assistant: "Which agencies implement Next.js and have proven case studies?" The engine synthesizes an answer and the buyer shortlists from there — often before visiting a single website.',
      'To be recommended by generative engines (ChatGPT, Claude, Copilot, Perplexity), your content must be structured, factual and semantically clear. Keyword density is irrelevant. What matters is that the AI can extract a precise, trustworthy answer from your page.',
      '## What makes a page citable',
      'Three elements that consistently correlate with AI citation:',
      '- Direct answer near the top: the page answers one high-intent question in the first 100 words, without requiring the reader to scroll. Assistants extract above-the-fold content first.',
      '- Proof that can be verified: numbers, case outcomes and named results. Vague claims ("we are experts") are ignored. Specific claims ("reduced response time from 4h to 43 min") are extracted and cited.',
      '- Structured markup: JSON-LD for FAQPage, HowTo, Service and Organization helps the AI build a mental model of what your entity does, for whom, and with what results.',
      '## AEO content architecture by page type',
      '### Service pages',
      '- H1: service name + primary benefit.',
      '- First paragraph: problem → solution → for whom.',
      '- Answer block: one direct question + one paragraph answer (FAQ format).',
      '- Evidence: metric or case result with source.',
      '- CTA: single, specific next step.',
      '### Case study pages',
      '- Headline: outcome first (e.g., "+38% conversion rate on B2B landing").',
      '- Context: industry, team size, challenge.',
      '- Method: 3–5 steps taken.',
      '- Result: hard numbers with timeline.',
      '- Learning: transferable insight.',
      '### Blog / article pages',
      '- Answer the title question directly in paragraph 1.',
      '- Use ## headers that mirror the exact query variations (these get extracted).',
      '- Include one "sources verified" section with linked evidence.',
      '## Measuring AEO impact',
      'Standard traffic metrics do not capture AEO impact well. What to track:',
      '- Branded queries and brand mention growth in Search Console.',
      '- Qualified lead rate (not just volume) — AI-referred visitors convert at higher intent.',
      '- Query types reaching your pages: informational vs transactional. AEO should shift the mix toward transactional.',
      '- Direct outreach mentioning "I found you via ChatGPT / Perplexity" — track this manually in CRM notes.',
      '## Where to start this week',
      'Audit your top 5 service pages. For each: does the page answer one specific high-intent question in the first 100 words? Is there a verifiable result on the page? Is there a JSON-LD block for the service? Score each 0–3. Pages scoring 0–1 are your priority — fix those before creating new content.'
    ]
  },
  'automatizaciones-que-si-venden': {
    title: 'Automations that actually drive sales: 5 key flows for B2B growth',
    excerpt: 'How to design commercial automations that cut response time and improve conversion from the first week.',
    summary: 'Sales-focused automation must optimize speed, data quality and owner accountability.',
    takeaways: [
      'Normalize lead data before workflow logic.',
      'Set SLA alerts that the team can actually follow.',
      'Track first-response time as a hard KPI.'
    ],
    content: [
      '## Why most automations do not drive revenue',
      'Most businesses automate isolated tasks, not the complete flow. The result: half-connected tools and teams still manually resolving bottlenecks. A system that sells better starts with clean lead intake, priority-based routing, automatic follow-up and operational visibility. Without those four blocks, automation stays in "nice to have" territory.',
      '## The 3 metrics that tell you where to attack first',
      '- First response time: how long between a lead arriving and first human contact. Above 5 minutes for inbound, and conversion rates drop sharply.',
      '- Effective contact rate: out of total leads, what percentage actually gets reached. Industry average is 30–40% — well-automated teams hit 70%+.',
      '- Leads without follow-up: how many leads are in your CRM with no activity logged after 48 hours. This number alone reveals your biggest revenue leak.',
      '## 5 flows that move pipeline',
      '### Flow 1: lead intake and normalization',
      'Every lead source (form, email, LinkedIn, event) outputs data in a different format. Before any logic runs, normalize the data: name, company, service interest, channel source, timestamp. Dirty data at intake corrupts every downstream decision.',
      '### Flow 2: qualification routing',
      'Once data is clean, route by fit and priority — not by whoever checks their email first. Use ICP scoring (company size, industry, role, intent signal) to assign to the right owner with the right SLA. High-fit leads should trigger an immediate task in your CRM, not land in a shared inbox.',
      '### Flow 3: SLA alerts',
      'Set non-negotiable response windows per lead tier. Tier 1 (high fit + high intent): 15-minute alert, then escalation. Tier 2 (good fit): 2-hour SLA. Tier 3 (low fit or early stage): 24-hour nurture sequence. Alerts go to the rep, then to the manager if SLA is missed — no exceptions.',
      '### Flow 4: follow-up sequences',
      'Most deals die not from objection but from silence. A 5-touch follow-up sequence over 10 days (email + task + LinkedIn + call attempt + close-or-recycle) recovers 25–40% of leads that would otherwise be abandoned. Personalize the first and last touch; automate the middle.',
      '### Flow 5: operations dashboard',
      'Visibility is not optional. Build a single view showing: leads by stage, SLA compliance rate, first response time, and follow-up completion rate. Review it in every Monday standup. What gets measured gets owned.',
      '## Implementation sequence',
      '- Week 1: fix data intake — map all lead sources and normalize output to a single schema.',
      '- Week 2: build routing logic in your CRM based on ICP scoring.',
      '- Week 3: configure SLA alerts and assign ownership rules.',
      '- Week 4: launch follow-up sequences for tiers 1 and 2.',
      '- Week 5+: run operations dashboard weekly and iterate on bottlenecks.',
      '## Where to start this week',
      'Pull your last 30 days of leads. Count: how many got a first response within 5 minutes? How many had 3+ follow-up touches? How many are still sitting untouched? That three-number audit will tell you exactly which flow to build first.'
    ]
  },
  'escalabilidad-sin-caos': {
    title: 'Scale without chaos: when to move from templates to custom development',
    excerpt: 'There is a point where WordPress or Webflow becomes your biggest bottleneck. The signals to recognize it and the investment case for Next.js.',
    summary: 'Scalability comes from constraints, sequencing and measurement — not from adding tools blindly.',
    takeaways: [
      'Define P0/P1 priorities before expansion.',
      'Document ownership at every step.',
      'Use lightweight dashboards for daily decisions.'
    ],
    content: [
      '## Starting with templates is the right call',
      'Using WordPress or a visual builder to validate a business idea is correct. It is fast, low-cost and good enough for the first phase. The mistake is staying there after the business outgrows those constraints.',
      '## The 5 signals that you have hit the wall',
      '- Your marketing team spends hours publishing a simple case study because the CMS fights every change.',
      '- Plugins conflict constantly and security updates break integrations.',
      '- Core Web Vitals are in the red on mobile — LCP above 3s, INP above 300ms.',
      '- Custom integrations (CRM, booking, pricing) require workarounds that break every few months.',
      '- Your team is afraid to touch the site because "something might break".',
      'Any two of these is a signal. All five means you are actively losing leads and credibility.',
      '## What a Next.js migration actually delivers',
      'Custom development with Next.js is not a technical vanity project — it is an investment in operational stability:',
      '- Full control over rendering strategy (static, SSR, ISR) per page type.',
      '- Native integration with any CRM, API or data source without plugin intermediaries.',
      '- Core Web Vitals under control by default with Server Components and Image optimization.',
      '- Content publishing as fast as a code deploy or a headless CMS push.',
      '- A codebase your team understands and can extend without fear.',
      '## Migration by impact phase, not all at once',
      'The worst migration approach is a full redesign launched in one go. The correct approach:',
      '- Phase 1: migrate the two or three highest-traffic commercial pages. Measure conversion before and after.',
      '- Phase 2: migrate blog and content routes. Configure ISR for dynamic content.',
      '- Phase 3: migrate secondary pages, legal, about.',
      '- Phase 4: decommission legacy system once all routes are stable.',
      'Each phase has a rollback path. Never cut over production without a traffic split or a staging validation period.',
      '## The cost argument',
      'Custom development costs more upfront than a template. It costs less over 24 months when you factor in: developer time fighting the CMS, missed conversions from slow performance, integration failures and the eventual full rebuild that was always coming anyway.',
      '## Where to start this week',
      'Run a Lighthouse audit on your five most important pages on mobile. If two or more score below 70 on performance, you have a measurable business case for migration. Start there — a performance baseline audit takes less than two hours and gives you the number you need to make the decision.'
    ]
  },
  'seo-tecnico-b2b': {
    title: 'Technical SEO for B2B: the architecture that actually ranks',
    excerpt: 'The best article in the world does not rank if robots cannot crawl it. A practical guide to rendering, canonicals and speed for B2B teams.',
    summary: 'Without technical hygiene, content strategy loses efficiency and ranking stability.',
    takeaways: [
      'Fix indexation and canonical consistency first.',
      'Improve internal linking by intent cluster.',
      'Track query quality, not only traffic volume.'
    ],
    content: [
      '## The foundation most teams skip',
      'Many companies invest heavily in content writers but ignore the technical foundation of their web platform. The best article in the world does not rank if Google cannot efficiently crawl, render and index the page. Technical SEO is not optional — it is the prerequisite for every other SEO investment.',
      '## Rendering architecture: why it matters for B2B',
      'If your site uses Client-Side Rendering (CSR) without pre-rendering, you are making Googlebot work harder than necessary. The crawler requests the page, receives a near-empty HTML shell and has to wait for JavaScript to execute before it can read your content. That delay increases crawl budget consumption and can cause content to be indexed with a lag — or not at all.',
      'Server-Side Rendering (SSR) or Static Site Generation (SSG), as implemented in frameworks like Next.js, ensures that content is available from the first byte. The crawler gets complete HTML on the first request, indexes it immediately and moves on. For B2B pages where every indexed URL is a commercial asset, this is not a detail.',
      '## The three technical fixes with the highest ROI',
      '### 1. Canonical consistency',
      'Duplicate content — the same content accessible at multiple URLs — dilutes ranking signals. Set canonical tags explicitly on every page, including pagination, filtered views and international variants. Use the alternates API in Next.js metadata to manage this programmatically, not manually.',
      '### 2. Sitemap without 404s',
      'A sitemap that includes removed, redirected or broken URLs wastes crawl budget and confuses indexation. Generate your sitemap dynamically from your content source so that it always reflects the actual live pages. In Next.js, the sitemap.ts file handles this automatically.',
      '### 3. Intent-based internal linking',
      'Internal links pass authority and help Google understand the topical hierarchy of your site. Structure your internal links by intent cluster: each service page should link to its supporting blog posts, case studies and FAQ entries. Each case study should link back to the service page it validates. This creates a web of topical authority, not a flat list of unrelated pages.',
      '## What to audit this week',
      '- Open Google Search Console → Coverage. Count your indexed pages vs submitted pages. If less than 70% are indexed, you have a technical crawlability issue.',
      '- Check for duplicate canonicals: are any pages pointing their canonical to a different URL than expected?',
      '- Run a crawl with Screaming Frog or Ahrefs on your top 20 commercial pages. Check for: missing titles, duplicate meta descriptions, broken internal links and non-200 status codes.',
      '- Verify your sitemap includes all commercial URLs and excludes all 404s and redirects.',
      '## Measuring technical SEO as a business metric',
      'Technical SEO impact shows up in Search Console as: total indexed pages (should grow over time), average position for commercial queries (should improve after fixes), and click-through rate (improves when titles and descriptions are optimized). Track these monthly — not daily — and correlate changes with specific technical fixes to build your internal evidence base.',
      '## Where to start this week',
      'Open Search Console Coverage report. If you have more than 10% of submitted URLs in "Excluded" or "Error" status, that is your first priority. Fix indexation before creating new content — you are building on a leaky foundation.'
    ]
  }
}

export const caseEn: Record<
  string,
  {
    title: string
    metric: string
    summary: string
    highlights: string[]
  }
> = {
  'pipeline-leads-automatizado': {
    title: 'Automated lead pipeline to reduce operational friction',
    metric: '-62% operational time',
    summary: 'We integrated capture, validation, routing and follow-up to speed response and reduce repetitive manual work.',
    highlights: ['First response: 4h → 43 min', 'Contact rate: +31%', 'Cleaner CRM data flow']
  },
  'landing-alta-conversion': {
    title: 'High-conversion B2B landing with performance-first approach',
    metric: '+38% conversion rate',
    summary: 'Complete funnel redesign: message clarity, proof placement, objection handling and conversion architecture.',
    highlights: ['LCP mobile: 3.9s → 2.3s', 'Main CTA CTR: +29%', 'Same traffic, better conversion']
  },
  'visibilidad-organica-aeo': {
    title: 'Organic visibility and AEO for high-intent demand',
    metric: '+123% organic traffic',
    summary: 'We restructured intent architecture and answer-first content to improve qualified demand and AI citation signals.',
    highlights: ['Qualified clicks: +71%', 'Top-10 queries: +44%', 'Higher commercial intent coverage']
  }
}

export const faqEn: Record<string, { question: string; answer: string }> = {
  'que-es-aeo-para-b2b': {
    question: 'What is AEO for B2B companies and how does it increase sales?',
    answer:
      'AEO helps answer engines understand and cite your offer clearly. It works best when each page answers one high-intent question with proof and a clear CTA.'
  },
  'cuanto-cuesta-diseno-web-b2b': {
    question: 'How much does a conversion-focused B2B website cost?',
    answer:
      'Cost depends on scope and impact goals. A serious MVP is usually defined by business architecture, implementation and measurable conversion setup — not by page count.'
  },
  'como-automatizar-captura-leads-b2b': {
    question: 'How do you automate B2B lead capture and follow-up without losing quality?',
    answer:
      'Standardize data first, route by intent and enforce SLA-driven follow-up. Without those three, automation only moves the chaos.'
  },
  'cuanto-tarda-seo-aeo-b2b': {
    question: 'How long until SEO/AEO shows results in B2B?',
    answer:
      'Initial signals appear in weeks, while sustained commercial impact usually requires 8–12 week cycles with iterative optimization.'
  },
  'migrar-wordpress-webflow-a-nextjs-b2b': {
    question: 'When should a B2B team migrate from WordPress/Webflow to Next.js?',
    answer:
      'When performance, integrations or publishing velocity limit growth. Migration is most effective when done by impact phase, not all at once.'
  }
}
