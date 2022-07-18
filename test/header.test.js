const puppeteer = require("puppeteer");

let browser, page;

beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: false,
  });
  page = await browser.newPage();
  await page.goto("localhost:3000");
});

afterEach(async () => {
  await browser.close();
});

test("The header has the correct text", async () => {
  const text = await page.$eval("a.brand-logo", (el) => el.innerHTML);

  expect(text).toEqual("Blogster");
});

test("Clicking login starts oauth flow", async () => {
  //   await page.click(".right a");
  //   const url = await page.url();
  //   expect(url).toMatch(/accounts\.google\.com/);
});

test("When signed in, shous logout button", async () => {
  const id = "62d0413b7483d80fd25dc00b";
  const Buffer = require("safe-buffer").Buffer;
  const sessionObject = {
    passport: {
      user: id,
    },
  };
  const sessionString = Buffer.from(JSON.stringify(sessionObject)).toString(
    "base64"
  );
  const Keygrip = require("keygrip");
  const Keys = require("../config/keys");
  const keygrip = new Keygrip([Keys.cookieKey]);
  const sig = keygrip.sign("session=" + sessionString);
  await page.setCookie({ name: "session", value: sessionString });
  await page.setCookie({ name: "session.sig", value: sig });
  await page.goto("localhost:3000");
  await page.waitFor('a[href="/auth/logout"]');
  const text = await page.$eval('a[href="/auth/logout"]', (el) => el.innerHTML);
  expect(text).toEqual("Logout");
});
