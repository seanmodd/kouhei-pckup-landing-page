const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');
  
  // wait for preloader to show
  await page.waitForTimeout(2000);
  await page.screenshot({path: 'puppet_preloader.png', clip: {x: 0, y: 0, width: 800, height: 800}});
  await browser.close();
})();
