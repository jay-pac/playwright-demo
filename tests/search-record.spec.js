import { test, expect } from "@playwright/test";

test("Search Page", async ({ page }) => {
  await page.goto("https://dev.iamonline.hhs.state.tx.us/");
  await page.getByLabel("Username").fill("jptestEMS69502@mailinator.com");
  await page.getByRole("button", { name: "Next" }).click();
  await expect(page.getByLabel("Select Password.")).toBeVisible();
  await page.getByLabel("Select Password.").click();
  await expect(page.getByLabel("Password")).toBeVisible();
  await page.locator(".password-with-toggle").fill("T3st1234@1234567890");
  await page.getByRole("button", { name: "Verify" }).click();
  await page.getByLabel("Select Security Question.").click();
  await page.getByLabel("What is the food you least").fill("carrots");
  await page.getByRole("button", { name: "Verify" }).click();

  const emstrAppTile = page.getByLabel("launch app EMSTR Online");
  const [newPage] = await Promise.all([
    page.context().waitForEvent("page"),
    emstrAppTile.click(),
  ]);
  await newPage.waitForURL("https://emstr-dev.dshs.texas.gov/nedss/admin/");

  const isVisible = await newPage.isVisible('[id="main_menu:createRecord"]');
  expect(isVisible).toBeTruthy();

  console.log(await newPage.title());
  await newPage.locator('[id="main_menu:createRecord"]').click();
  await newPage
    .getByRole("combobox", { name: "*Record Type" })
    .locator("span")
    .click();
  await newPage.getByRole("option", { name: "Patient Record - EMS" }).click();
});
