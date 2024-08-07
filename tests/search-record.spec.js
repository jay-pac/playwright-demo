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
 
  const isVisible = await newPage.isVisible('[id="main_menu:searchRecord"]');
  expect(isVisible).toBeTruthy();
  console.log(await newPage.title());
  await newPage.locator('[id="main_menu:searchRecord"]').click();
  await expect(
    newPage.getByRole("heading", { name: "Search Records" })
  ).toBeVisible();
  await newPage.getByRole("combobox").locator("span").click();
  await newPage.getByRole("option", { name: "EMS Facility" }).click();
  await newPage.locator('[id="j_idt109:dshsNum"]').fill("101179");
  await newPage.getByRole("button", { name: "Search" }).click();
 
  const page2Promise = newPage.waitForEvent("popup");
  await newPage
    .getByRole("row", {
      name: "EMS Facility 1000087373 101179 Banner - University Medical Center Phoenix 01/02/2024 1111 E McDowell Rd AZ",
    })
    .getByRole("link")
    .click();
  const page2 = await page2Promise;
  await expect(page2.getByRole("heading")).toContainText("Record Summary(EMS)");
});
 
// test.describe("Search Results Page", () => {
//   test.beforeEach(async ({ page }) => {
//     await page.goto("https://dev.iamonline.hhs.state.tx.us/");
//     await page.getByLabel("Username").fill("jptestEMS69502@mailinator.com");
//     await page.getByRole("button", { name: "Next" }).click();
//     await expect(page.getByLabel("Select Password.")).toBeVisible();
//     await page.getByLabel("Select Password.").click();
//     await expect(page.getByLabel("Password")).toBeVisible();
//     await page.locator(".password-with-toggle").fill("T3st1234@1234567890");
//     await page.getByRole("button", { name: "Verify" }).click();
//     await page.getByLabel("Select Security Question.").click();
//     await page.getByLabel("What is the food you least").fill("carrots");
//     await page.getByRole("button", { name: "Verify" }).click();
//     const emstrAppTile = page.getByLabel("launch app EMSTR Online");
//     const [newPage] = await Promise.all([
//       page.context().waitForEvent("page"),
//       emstrAppTile.click(),
//     ]);
 
//     await newPage.waitForURL("https://emstr-dev.dshs.texas.gov/nedss/admin/");
//     const isVisible = await newPage.isVisible('[id="main_menu:searchRecord"]');
//     expect(isVisible).toBeTruthy();
//     console.log(await newPage.title());
//     await newPage.locator('[id="main_menu:searchRecord"]').click();
//     await expect(
//       newPage.getByRole("heading", { name: "Search Records" })
//     ).toBeVisible();
//   });
 
//   test("Should be able to search by facility DSHS ID", async ({ page }) => {
//     await newPage.getByRole("combobox").locator("span").click();
//     await newPage.getByRole("option", { name: "EMS Facility" }).click();
//     await newPage.locator('[id="j_idt109:dshsNum"]').fill("101179");
//     await newPage.getByRole("button", { name: "Search" }).click();
 
//     const page2Promise = newPage.waitForEvent("popup");
//     await newPage
//       .getByRole("row", {
//         name: "EMS Facility 1000087373 101179 Banner - University Medical Center Phoenix 01/02/2024 1111 E McDowell Rd AZ",
//       })
//       .getByRole("link")
//       .click();
//     const page2 = await page2Promise;
//     await expect(page2.getByRole("heading")).toContainText(
//       "Record Summary(EMS)"
//     );
//   });
 
//   test("Should be able to search by Create Dates", async ({ page }) => {});
// });
 