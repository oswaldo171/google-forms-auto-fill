import puppeteer from "puppeteer";

const app = async () => {
  const formURL: string =
    "https://docs.google.com/forms/d/e/1FAIpQLSe19oQwJlazDrHxGq4jrHa1ek6htjDY5pyi-wz1sXHLeJrw0A/viewform";

  const student = {
    name: "Dubón Lémus Carlos Daniel",
    id: "201943354",
  };

  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 10,
    devtools: false,
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

  await page.type(".puppeteer-input-0", `${student.id}`);
  await page.type(".puppeteer-input-1", `${student.name}`);

  await page.evaluate(() => {
    const button = document.querySelector(
      ".appsMaterialWizButtonPaperbuttonLabel"
    );

    (button as HTMLElement).click();
  });

  debugger;

  await browser.close();
  console.log("Done! Data was sent.");
};

app();
