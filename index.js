const puppeteer = require('puppeteer');

(async function(){
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://www.gismeteo.ru/weather-moscow-4368/10-days/');

  await page.setViewport({
    width: 1920,
    height: 1080
  })

  await page.waitForSelector('.page-title');

  //создать папку images
  let fs = require('fs');
  fs.mkdir('images', err => {
    return;
  });

  //получить текущую дату
  let date = new Date();
  let outputDate = String(date.getDate()).padStart(2, '0') + '.' + String(date.getMonth() + 1).padStart(2, '0') + '.' + date.getFullYear();

  //сделать скриншот
  await page.screenshot({path: `images/screenshot_${outputDate}.png`})

  await browser.close();
})();