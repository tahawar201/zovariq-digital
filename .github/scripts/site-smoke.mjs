import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const url = process.env.SITE_URL || 'https://tahawar201.github.io/zovariq-digital/';
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
const errors = [];
async function auditViewport(label, viewport, isMobile) {
  const context = await browser.newContext({ viewport, isMobile, hasTouch: isMobile });
  const page = await context.newPage();
  page.on('pageerror', e => errors.push(label + ': ' + e.message));
  await page.addInitScript(() => {
    window.__enquiryPopupCalls = [];
    const oldOpen = window.open.bind(window);
    window.open = (...args) => {
      window.__enquiryPopupCalls.push(args);
      // Prevent sending or opening an external service during an automated test.
      return null;
    };
  });
  const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
  assert.equal(response?.status(), 200, label + ': homepage status');
  assert.ok(await page.locator('h1').count(), label + ': missing H1');
  await page.locator('#enquiryForm').scrollIntoViewIfNeeded();
  const emailHref = await page.locator('#emailLink').getAttribute('href');
  const whatsappHref = await page.locator('#whatsappLink').getAttribute('href');
  const bookingHref = await page.locator('.booking-cta-hero').getAttribute('href');
  assert.ok(emailHref?.startsWith('mailto:tahawarabbas76@gmail.com'), label + ': email link');
  assert.ok(whatsappHref?.startsWith('https://wa.me/923187067972'), label + ': whatsapp link');
  assert.ok(bookingHref?.startsWith('https://calendar.app.google/'), label + ': booking link');
  await page.locator('input[name="name"]').fill('Browser Test');
  await page.locator('input[name="email"]').fill('test@example.com');
  await page.locator('input[name="company"]').fill('Example Ltd');
  await page.locator('#serviceSelect').selectOption({ label: 'AI Receptionist & Business Automation' });
  await page.locator('textarea[name="message"]').fill('Checking the enquiry flow without sending it.');
  await page.locator('button[value="whatsapp"]').click();
  const popup = await page.evaluate(() => window.__enquiryPopupCalls[0]?.[0]);
  assert.ok(popup?.startsWith('https://wa.me/923187067972?text='), label + ': enquiry WhatsApp URL');
  const composed = decodeURIComponent(popup.split('?text=')[1] || '');
  for (const phrase of ['Browser Test','test@example.com','Example Ltd','AI Receptionist & Business Automation','Checking the enquiry flow']) {
    assert.ok(composed.includes(phrase), label + ': missing enquiry detail: ' + phrase);
  }
  assert.match(await page.locator('#formStatus').innerText(), /WhatsApp will open/);
  // Verify the second enquiry button's user-facing flow without sending mail.
  await page.locator('button[value="email"]').click();
  assert.match(await page.locator('#formStatus').innerText(), /Your email app will open/, label + ': email compose flow');
  // Verify multi-service CTA preselects the right option.
  await page.locator('.z-services-bottom [data-service="Multiple services"]').click();
  assert.equal(await page.locator('#serviceSelect').inputValue(), 'Multiple services', label + ': service preselection');
  await page.screenshot({ path: 'smoke-' + label + '.png', fullPage: true });
  const sizes = await page.evaluate(() => ({
    viewport: innerWidth,
    document: document.documentElement.scrollWidth
  }));
  console.log(JSON.stringify({ device: label, status: response.status(), links: 'OK', whatsappComposition: 'OK', horizontalOverflowPx: Math.max(0, sizes.document - sizes.viewport) }));
  assert.ok(sizes.document <= sizes.viewport + 2, label + ': horizontal overflow ' + JSON.stringify(sizes));
  await context.close();
}
try {
  await auditViewport('mobile', { width: 390, height: 844 }, true);
  await auditViewport('desktop', { width: 1366, height: 768 }, false);
  assert.deepEqual(errors, [], 'Browser errors found');
  console.log('PASS: Homepage and enquiry smoke checks; no message was sent.');
} finally {
  await browser.close();
}
