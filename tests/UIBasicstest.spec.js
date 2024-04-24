const { test, expect } = require("@playwright/test");

test.skip("Browser Fixture Playwright test", async ({ browser }) => {
  //playwright code

  // creates a new instance of the browser
  const context = await browser.newContext(); // if no injection of cookies is needed, playwright page fixtures creates a new instance
  const page = await context.newPage();

  const userName = page.locator("#username");
  const passWord = page.locator("#password");
  const signIn = page.locator("#signInBtn");
  const cardTitles = page.locator(".card-body a");

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await userName.fill("rahulshetty");
  await passWord.fill("learning");
  await signIn.click();
  const errorMessage = await page.locator("[style*='block']").textContent();
  console.log(errorMessage);
  await expect(page.locator("[style*='block']")).toContainText(
    "Incorrect username/password."
  );

  await userName.fill("");
  await userName.fill("rahulshettyacademy");
  await signIn.click();
  //    await passWord.fill('learning');
  console.log(await cardTitles.first().textContent());
  console.log(await cardTitles.nth(1).textContent());

  // extract all the phone titles and store into a single variable.  Returns an array
  const allTitles = await cardTitles.allTextContents();
  console.log(allTitles);
});

test.skip("UI Controls", async ({ browser, page }) => {
  const userName = page.locator("#username");
  const passWord = page.locator("#password");
  const signIn = page.locator("#signInBtn");
  const documentLink = page.locator('[href*="documents-request"]');

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const dropDown = page.locator("select.form-control");
  await dropDown.selectOption("consult");

  //select a radio button
  await page.locator(".radiotextsty").last().click();
  await page.locator("#okayBtn").click();
  // await page.pause()

  //asseration
  await expect(page.locator(".radiotextsty").last()).toBeChecked();

  // useful isChecked() method if you are trying to get a boolean value
  console.log(await page.locator(".radiotextsty").last().isChecked());

  await page.locator("#terms").click();
  await expect(page.locator("#terms")).toBeChecked();

  //uncheck the check box
  await page.locator("#terms").uncheck();
  expect(await page.locator("#terms").isChecked()).toBeFalsy();

  await expect(documentLink).toHaveAttribute("class", "blinkingText");
});

test.skip("Handling Child Windows and Tabs", async ({ browser }) => {
  
  const context = await browser.newContext();
  const page = await context.newPage();
  const userName = page.locator("#username");

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const documentLink = page.locator('[href*="documents-request"]');

  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    documentLink.click(),
  ]);
  const text = await newPage.locator(".red").textContent();
  const textArray = text.split("@");
  const domain = textArray[1].split(" ")[0];
  console.log(domain);

  await userName.fill(domain);
});

// record and play back script
test.skip('test', async ({ page }) => {
  await page.goto('https://www.google.com/');
  await page.goto('https://www.google.com/search?q=rahul+shetty+acaedemy&oq=rahul+shetty+acaedemy&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCTIwNjUzajBqNKgCALACAA&sourceid=chrome&ie=UTF-8');
  await page.getByRole('link', { name: 'Rahul Shetty Academy:' }).click();
  await page.locator('div:nth-child(2) > .inner > .icon-box > .icon').click();
  await expect(page.getByRole('link', { name: 'NEW Learning paths' })).toBeVisible();
});
