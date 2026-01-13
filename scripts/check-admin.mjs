import puppeteer from 'puppeteer-core';
import fs from 'fs';

const EDGE_PATH = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const ADMIN_URL = process.env.TARGET_URL || 'https://deivisan.github.io/SELECOES-MIDU/admin.html';

(async () => {
  try {
    console.log('Launching browser at', EDGE_PATH);
    const browser = await puppeteer.launch({
      executablePath: EDGE_PATH,
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    const logs = [];
    page.on('console', msg => logs.push({ type: msg.type(), text: msg.text() }));
    page.on('pageerror', err => logs.push({ type: 'pageerror', text: err.message }));
    page.on('response', async res => {
      if (res.status() >= 400) {
        logs.push({ type: 'response', url: res.url(), status: res.status() });
      }
    });

    console.log('Navigating to', ADMIN_URL);
    await page.goto(ADMIN_URL, { waitUntil: 'networkidle2', timeout: 30000 });
    // Puppeteer-core used with Edge has slightly different API: use page.waitForTimeout if available else fallback to simple sleep
    if (typeof page.waitForTimeout === 'function') {
      await page.waitForTimeout(1500);
    } else {
      await new Promise(res => setTimeout(res, 1500));
    }

    const content = await page.content();
    const screenshotPath = 'artifacts/admin_page.png';
    await page.screenshot({ path: screenshotPath, fullPage: true });

    // capture some DOM info
    const rootExists = await page.evaluate(() => !!document.getElementById('root'));
    const imgCount = await page.evaluate(() => document.querySelectorAll('img').length);

    const result = { logs, rootExists, imgCount, screenshotPath, htmlSnippet: content.slice(0, 2000) };
    fs.writeFileSync('artifacts/check-admin-result.json', JSON.stringify(result, null, 2));

    console.log('Result written to artifacts/check-admin-result.json');
    await browser.close();
    process.exit(0);
  } catch (err) {
    console.error('ERROR running puppeteer script:', err);
    try { fs.writeFileSync('artifacts/check-admin-error.txt', String(err)); } catch(e){}
    process.exit(1);
  }
})();
