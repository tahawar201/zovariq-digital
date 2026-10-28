import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const BASE = 'https://tahawar201.github.io/zovariq-digital/';
const siteFiles = ['index.html','ai-automation.html','content-production.html','digital-marketing.html','social-media-management.html',
'ai-receptionist-guide.html','ai-receptionist-veterinary-practices-uk.html','ai-receptionist-letting-agents-uk.html','webinar-repurposing-guide.html'];
const services = new Set(['ai-automation.html','content-production.html','digital-marketing.html','social-media-management.html']);
const articles = new Set(siteFiles.filter(p => p.includes('-guide.html') || p.includes('-uk.html')));
const errors = [];
const warnings = [];
const detail = [];
const record = (ok, message) => { if (!ok) errors.push(message); };
const match = (html, pattern) => html.match(pattern)?.[1] || null;
const schemas = html => [...html.matchAll(/<script[^>]+type=["']application\\/ld\\+json["'][^>]*>([\\s\\S]*?)<\\/script>/gi)].map(m => JSON.parse(m[1]));
const allNodes = js => js.flatMap(o => o['@graph'] || [o]);

const fileSet = new Set(siteFiles.concat(['styles.css','service-pages.css','insights.css','script.js','favicon.svg','zovariq-logo.png','robots.txt','sitemap.xml']));
const getLocal = (raw, current) => {
  if (/^(mailto:|tel:|javascript:|data:|https?:|\\/\\/)/i.test(raw) || raw.startsWith('#')) return null;
  const url = new URL(raw, BASE+current.replace('index.html',''));
  if (url.origin !== new URL(BASE).origin || !url.pathname.startsWith(new URL(BASE).pathname)) return null;
  const relative = decodeURI(url.pathname.slice(new URL(BASE).pathname.length));
  return relative.endsWith('/') || relative === '' ? 'index.html' : relative;
};
for (const filename of siteFiles) {
  const html = fs.readFileSync(filename, 'utf8');
  const title = match(html, /<title>([^<]+)<\\/title>/i);
  const desc = match(html, /<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
  const canonical = match(html, /<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i);
  const h1s = [...html.matchAll(/<h1(?:\\s[^>]*)?>([\\s\\S]*?)<\\/h1>/gi)];
  record(Boolean(title && title.trim().length>=15),filename+': title missing/very short');
  record(Boolean(desc && desc.trim().length>=70),filename+': description missing/very short');
  record(canonical === BASE+(filename==='index.html'?'':filename),filename+': canonical mismatch '+canonical);
  record(h1s.length===1,filename+': expected one h1, found '+h1s.length);
  record(!/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html),filename+': marked noindex');
  const urls=[...html.matchAll(/(?:href|src)=["']([^"']+)["']/gi)].map(x=>x[1]);
  for(const raw of urls) {const p=getLocal(raw,filename);if(p && !fileSet.has(p) && !fs.existsSync(p)) errors.push(filename+': missing internal asset/page: '+p);}
  let nodes=[];
  try{nodes=allNodes(schemas(html));}catch(e){errors.push(filename+': invalid JSON-LD: '+e.message);}
  const breadcrumb=nodes.find(x=>x['@type']==='BreadcrumbList');
  if(filename==='index.html') {
    record(nodes.some(x=>x['@type']==='Organization'),filename+': Organization schema missing');
    record(nodes.some(x=>x['@type']==='WebSite'),filename+': WebSite schema missing');
  } else {
    record(Boolean(breadcrumb && breadcrumb.itemListElement?.length>=2),filename+': missing breadcrumb list');
    if (breadcrumb) record(breadcrumb.itemListElement?.[1]?.item===BASE+filename,filename+': breadcrumb URL mismatch');
  }
  if(services.has(filename)) {
    const service=nodes.find(x=>x['@type']==='Service');
    const page=nodes.find(x=>x['@type']==='WebPage');
    record(Boolean(service && page),filename+': Service/WebPage schema missing');
    record(service?.url===BASE+filename,filename+': Service URL mismatch');
    record(service?.provider?.['@id']===BASE+'#organization',filename+': provider reference inconsistent with homepage');
    record(page?.mainEntity?.['@id']===service?.['@id'],filename+': WebPage mainEntity mismatch');
  }
  if(articles.has(filename)) {
    const article=nodes.find(x=>x['@type']==='Article');
    record(Boolean(article),filename+': Article schema missing');
    record(article?.mainEntityOfPage===BASE+filename,filename+': Article URL mismatch');
  }
  if(filename!=='index.html') {
    record(/property=["']og:image["']/.test(html),filename+': og:image missing');
    record(/name=["']twitter:image["']/.test(html),filename+': twitter:image missing');
  }
  detail.push({page:filename,title,canonical,structuredData:nodes.map(x=>x['@type'])});
}

const xml=fs.readFileSync('sitemap.xml','utf8');
const locs=[...xml.matchAll(/<loc>([^<]+)<\\/loc>/g)].map(x=>x[1]);
const expected=siteFiles.map(p=>BASE+(p==='index.html'?'':p));
record(locs.length===expected.length,'sitemap: expected '+expected.length+' URLs, found '+locs.length);
record(new Set(locs).size===locs.length,'sitemap: duplicate URL');
for(const url of expected) record(locs.includes(url),'sitemap: missing '+url);
for(const url of locs) record(expected.includes(url),'sitemap: unknown URL '+url);
const robots=fs.readFileSync('robots.txt','utf8');
record(robots.includes('Sitemap: '+BASE+'sitemap.xml'),'robots.txt: sitemap pointer missing');
record(!robots.includes('Disallow: /'),'robots.txt: blanket disallow found');
console.log('SEO_STATIC_AUDIT '+JSON.stringify({pagesChecked:siteFiles.length,sitemapURLs:locs.length,errors,warnings,detail}));
if(errors.length) process.exitCode=1;
