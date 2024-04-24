import { test, expect } from '@playwright/test';
 
test('test', async ({ page }) => {
// Login
  await page.goto('https://dev.iamonline.hhs.state.tx.us/');
  await page.getByLabel('Username').fill('jptestEMS69502@mailinator.com');
  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page.getByLabel('Select Password.')).toBeVisible();
  await page.getByLabel('Select Password.').click();
  await expect(page.getByLabel('Password')).toBeVisible();
  await page.locator('.password-with-toggle').fill('T3st1234@1234567890');
  await page.getByRole('button', { name: 'Verify' }).click();
  await page.getByLabel('Select Security Question.').click();
  await page.getByLabel('What is the food you least').fill('carrots');
  await page.getByRole('button', { name: 'Verify' }).click();
 
// clicking on the tile
  const emstrAppTile = page.getByLabel('launch app EMSTR Online')
  const [newPage] = await Promise.all([
    page.context().waitForEvent('page'),
    emstrAppTile.click()
  ]);
  await newPage.waitForLoadState('load');
  
  console.log(await newPage.title());
  await newPage.waitForTimeout(50000);

  await newPage.locator('[id="main_menu:rosterImportLink"]').click();
  await newPage.getByRole('row', { name: 'Data File Format File' }).locator('span').click();
  await newPage.getByRole('option', { name: 'EMS_XML_File' }).click();
  await newPage.getByAltText('Upload file').click();
  await newPage.getByAltText('Upload file').setInputFiles('EMSTRENH-5443.doc');
  await newPage.getByRole('button', { name: 'Upload' }).click();
  await expect(newPage.getByText('Invalid file format. Please')).toBeVisible();
  await newPage.getByRole('link', { name: 'File Upload' }).click();

  await newPage.getByRole('link', { name: 'EMS Facility' }).click();
  await newPage.getByRole('row', { name: 'EMS-JP 43322 1000087145' }).getByRole('link').click();
  await expect(newPage.getByRole('heading')).toContainText('Record Summary(EMS)');
});