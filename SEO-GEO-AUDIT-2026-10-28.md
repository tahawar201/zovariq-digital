# ZOVARIQ DIGITAL — SEO, technical SEO, schema and GEO audit
**Audit date:** 28 October 2026 (PKT)  
**Live property:** https://tahawar201.github.io/zovariq-digital/  
**Repository:** tahawar201/zovariq-digital  
**Change status:** Draft proposal branch; not published to live site.

## Scope and verified baseline
- Main branch: 9 HTML landing/service/guide URLs in sitemap.xml, all carrying self-canonical URLs and indexable robots meta.
- robots.txt is permissive and references the sitemap.
- Existing homepage JSON-LD: Organization and WebSite; four educational guide URLs: Article.
- Gap identified: all four service pages lacked structured data and most share-preview metadata; four guides lacked breadcrumb structured data.
- Connected Search Console via Windsor.ai (country-level, 13–27 October 2026): Pakistan 17 impressions/9 clicks, UAE 2/0, Germany 1/0, US 1/0, UK 0/0. Very small sample and branded US query: "zovariq". Some privacy-thresholded dimensions may be omitted.
- No reliable evidence yet that every sitemap URL is indexed; Search Analytics appearing for a URL does not validate all the others. Sitemap submission status cannot be determined from Windsor's empty/null sitemap row.
- The website previously passed an instrumented mobile Lighthouse on 28 October with live performance 100, accessibility 96, best practices 100, SEO 100. A separate earlier unmerged draft achieved accessibility 100. Scores vary by run and are not search-ranking guarantees.

## Proposed technical changes in this branch
1. Add one accurately scoped `Service` entity, `WebPage` reference and valid two-item `BreadcrumbList` to each of four live service pages.
2. Link all four Service entities to the homepage's existing Organization `@id`; avoid contradictory business identities.
3. Give service pages coherent Open Graph/Twitter sharing metadata based on real page titles, descriptions and current brand logo.
4. Give the four articles breadcrumb JSON-LD and matching logo sharing metadata; preserve existing Article publication dates.
5. Add automated static checks for one H1, title/description, canonical, noindex, local links, sitemap coverage, JSON-LD validity and entity consistency, plus an HTTP live-page check.
6. Preserve approved page copy, layouts and contact links. No changes to robots.txt or sitemap.xml are needed for this schema-only update.

## Search Engine Optimisation: prioritised issues
| Priority | Finding | Action |
|---|---|---|
| High | Low measured UK/US non-brand visibility | Focus clear transactional service intent + original UK/US examples and relevant industry workflows; compare segmented countries, pages, queries weekly |
| High | Operator identity/trust details incomplete | Verify legal trading name, real location/service geography, privacy notice, available contact method; add truthful About/Contact trust details when confirmed |
| High | Schema absent from service URLs | Implement scoped structured data, then test Google's Rich Results Test / Schema.org validator once deployed |
| Medium | Share previews missing from service pages | Add supported OG/Twitter metadata with existing logo |
| Medium | Four guide URLs lacked breadcrumb markup | Add proper BreadcrumbList based on natural home-to-guide path |
| Medium | Need continuous link and canonical checks | Run GitHub Action on every pull request; investigate failures before merging |
| Medium | Independent evidence of delivery not shown | Add case studies, workflows, client-approved proof and explicit citations only after real evidence/permission |
| Medium | Existing GitHub Pages project URL is awkward for branding | Consider a custom domain when acquired, including canonical redirects and Search Console property changes carefully |
| Low | Special GEO/AI-only files unproven | Do not add unsupported "ranking hacks", fake reviews or speculative llms.txt claims |

## Schema policy
- `Organization` and `WebSite` are already defined on the homepage.
- `Service` is semantically useful to describe the four service pages, but **does not itself guarantee Google rich results**.
- `BreadcrumbList` is eligible for Google breadcrumb treatment when validated and indexed; appearance is not guaranteed.
- No `LocalBusiness` or UK/US address because no verified public business address has been supplied.
- No `AggregateRating`, `Review`, `FAQPage`, `Product`, `Offer`, price, customer count, or fake trust claims. Ordinary businesses generally should not expect FAQ rich results in Google.
- Check that markup text reflects visible services, before and after deployment.

## GEO / Answer Engine readiness audit
**Working definition:** Generative Engine Optimisation helps real users and retrieval systems discover, evaluate and cite credible information. GEO measurement must be distinguished from Google Search Console search impressions.

### Good foundations already in place
- Crawlable HTML service descriptions and detailed workflow/checklist guides.
- Services named with clear subject matter, practical step-by-step content, human review and channel/integration boundaries.
- Links between the homepage, service pages, guides, booking and enquiry methods.

### Trust gaps still unresolved
- No verified real-world operator/address/registered entity details on public site; do not invent them.
- No independently verifiable case study, real demo, independently sourced results or authorised testimonial is provided.
- Only one US branded search impression is visible in the current recorded baseline; no demonstrated AI-assistant citation/referral metric.

### Honest GEO improvements
- Maintain clear who/what/how/limits sections with client-oriented questions; write for people rather than keyword stuffing.
- Add verified organisation, team and contact details after confirmation.
- Add original demonstrations, case studies and methodology with sources, precise dates and limitations.
- Seek relevant genuine industry mentions rather than purchased link networks or fabricated citations.
- Keep services accessible in HTML with crawlable internal links and correct titles/canonicals.
- Do not create llms.txt as a purported Google Search requirement: Google's 2026 guidance says it doesn't use that file for ranking in Google Search or its generative features.
- Do not block crawlers in robots.txt unnecessarily; account for privacy and content licensing separately.

### Repeatable measurement protocol
For each query, record the date, country/locale, engine/version, logged-in state, wording, whether Zovariq is cited, exact cited URL, screenshot/evidence, and resulting referral (if analytics is legitimately configured). Use a stable weekly set:
1. UK: "AI receptionist for letting agents"
2. UK: "AI receptionist for veterinary practices"
3. US: "AI receptionist for small home service businesses"
4. UK/US: "B2B podcast repurposing service"
5. UK/US: "webinar to LinkedIn clips service"
6. Brand: "Zovariq Digital AI automation"
Do not call an AI answer a verified ranking from a single test. Mark citation count as **not measured** until observed.

## Open dependencies
- Approval of current draft PRs for privacy, accessible footer and UK/US service content (do not merge as part of this audit).
- Confirm actual controller/business identity and privacy terms before public Privacy Policy publication.
- Manual Search Console URL inspection or direct API capability required for per-URL index verdicts.
- Link business to a first-party custom domain when purchased; do not migrate canonical values prematurely.
- After any merge: validate structured data against the deployed URL, check GSC index status after recrawl, and compare the UK/US non-brand queries over 28 days.

## Authoritative guidance
- Google Search Central, AI features and website: https://developers.google.com/search/docs/appearance/ai-features
- Google Search Central, generative AI optimisation: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- Google Search Central, Organization schema: https://developers.google.com/search/docs/appearance/structured-data/organization
- Google Search Central, Breadcrumb schema: https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
- Google Search Central, sitemaps: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap

**Scope caveat:** This is a repository, public-page and connected Search Console audit, not a third-party platform's private crawl index or AI answer referral report. Changes are staged for approval and must not be presented as live until merged and deployed.
