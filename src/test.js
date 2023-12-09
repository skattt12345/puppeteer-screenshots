const axios = require("axios");

const botToken = "6912069062:AAHkP5a09uJswyWDRJ5MxbHGDXf7PywoLAI";
const chatId = "817093281";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Открываем страницу, которую вы хотите снимать
  await page.goto("https://www.example.com");

  // Создаем скриншот
  const screenshotBuffer = await page.screenshot();

  // Закрываем браузер
  await browser.close();

  // Отправляем скриншот в Telegram
  const apiUrl = `https://api.telegram.org/bot${botToken}/sendPhoto`;
  const formData = new FormData();
  formData.append("chat_id", chatId);
  formData.append("photo", screenshotBuffer, { filename: "screenshot.png" });

  try {
    const response = await axios.post(apiUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Скриншот успешно отправлен в Telegram:", response.data);
  } catch (error) {
    console.error("Ошибка при отправке скриншота в Telegram:", error.message);
  }
})();
