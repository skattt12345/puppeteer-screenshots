// const puppeteer = require("puppeteer");

// // import puppeteer from "puppeteer";

// (async function () {
//   const browser = await puppeteer.launch({ headless: false });
//   const page = await browser.newPage();
//   await page.goto(
//     "https://bookopt.com.ua/?utm_source=google&utm_medium=cpc&utm_campaign=PM_painting_number&utm_content=&utm_term=&utm_id={campaign_id}&gclid=CjwKCAiA0syqBhBxEiwAeNx9N7ZEU0QUKGXAkRDv3BcORppWgBb6w4KryKuvINxMSiwuteETynEOjRoC0z4QAvD_BwE"
//   );
//   await page.waitForSelector(".UI-NAV-INPUT");
//   // await page.click("button.icon-user");
//   // await page.click(".icon-menu");
//   // await page.type(".UI-SEARCH", "Текст, який ви хочете ввести");
//   await page.setViewport({
//     width: 1200,
//     height: 1200,
//   });
//   await page.screenshot({ path: "screenshot.png" });
//   // Convert the buffer to a readable stream
//   await browser.close();
// })();

const puppeteer = require("puppeteer");
const axios = require("axios").default;
const fs = require("fs");
const FormData = require("form-data");

const botToken = "6912069062:AAHkP5a09uJswyWDRJ5MxbHGDXf7PywoLAI";
const chatId = "817093281";

(async function () {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    "https://bookopt.com.ua/?utm_source=google&utm_medium=cpc&utm_campaign=PM_painting_number&utm_content=&utm_term=&utm_id={campaign_id}&gclid=CjwKCAiA0syqBhBxEiwAeNx9N7ZEU0QUKGXAkRDv3BcORppWgBb6w4KryKuvINxMSiwuteETynEOjRoC0z4QAvD_BwE"
  );
  await page.setViewport({
    width: 1200,
    height: 1200,
  });
  const screenshotBuffer = await page.screenshot();

  await browser.close();

  fs.writeFileSync("screenshot.png", screenshotBuffer);

  const apiUrl = `https://api.telegram.org/bot${botToken}/sendPhoto`;

  const formData = new FormData();
  formData.append("chat_id", chatId);
  formData.append("photo", fs.createReadStream("screenshot.png"));

  try {
    const response = await axios.post(apiUrl, formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });
  } catch (error) {
    console.error("Ошибка при отправке скриншота в Telegram:", error.message);
    console.error("Данные ответа:", error.response ? error.response.data : "Ответ не получен");
  }
})();
