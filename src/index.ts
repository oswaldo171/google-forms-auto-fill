import puppeteer from "puppeteer";

const app = async () => {
  const formURL: string =
    "https://docs.google.com/forms/d/e/1FAIpQLSfYroBk6rCP2CbWbqJXhFrYupo25_VeFVEab-gy5_VtJ5fvgA/viewform";

  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 10,
    devtools: true,
  });

  const page = await browser.newPage();

  await page.goto(formURL, { waitUntil: "networkidle2" });

  await page.$$eval(".quantumWizTextinputPaperinputInputArea", (arr) => {
    arr.forEach((e, i) => {
      e.querySelector("input[type=text]")?.classList.add(
        `puppeteer-input-${i}`
      );
    });
  });

  await page.type(".puppeteer-input-0", "Carlos");
  await page.type(".puppeteer-input-1", "Dubon prueba");

  await page.evaluate(() => {
    const button = document.querySelector(
      ".appsMaterialWizButtonPaperbuttonLabel"
    );

    (button as HTMLElement).click();
  });

  debugger;

  await browser.close();
};

app();
