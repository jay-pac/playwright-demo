import { test, expect } from '@playwright/test';
 
test('test', async ({ page }) => {
  await page.goto('https://dev.iamonline.hhs.state.tx.us/');
  // await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('jptestEMS69502@mailinator.com');
  await page.getByRole('button', { name: 'Next' }).click();
  // await page.waitForTimeout(5000)
  await expect(page.getByLabel('Select Password.')).toBeVisible();
  await page.getByLabel('Select Password.').click();
  // await page.getByLabel('Password').click();
  // await page.waitForTimeout(5000);
  await expect(page.getByLabel('Password')).toBeVisible();
  await page.locator('.password-with-toggle').fill('T3st1234@123456789');
  //await page.getByLabel('Password').fill('T3st1234@123456789');
  await page.getByRole('button', { name: 'Verify' }).click();
  await page.getByLabel('Select Security Question.').click();
  await page.getByLabel('What is the food you least').fill('carrots');
  await page.getByRole('button', { name: 'Verify' }).click();
 
  // const pagePromise = context.waitForEvent('page');
  // const newPage = await pagePromise
  // await newPage.waitForLoadState();
  // console.log(await newPage.title());
  // const newPagePromise = page.waitForEvent('page');
  // const newPage = await newPagePromise;
  // // await newPage.goto('https://emstr-dev.dshs.texas.gov/nedss/admin/');
  // await newPage.getByRole('link', { name: 'Entity' }).click();
  // await newPage.getByRole('link', { name: 'EMS Facility' }).click();
  // await newPage.getByRole('row', { name: 'EMS-JP 43322 1000087145' }).getByRole('link').click();
  // await expect(newPage.getByRole('heading')).toContainText('Record Summary(EMS)');
  // await page.waitForTimeout(10000);
  const emstrAppTile = page.getByLabel('launch app EMSTR Online')
  const [newPage] = await Promise.all([
    page.context().waitForEvent('page'),
    emstrAppTile.click()
  ]);
  await newPage.waitForLoadState('load');
  
  console.log(await newPage.title());
  await newPage.waitForTimeout(50000);
  await newPage.locator('[id="main_menu:createRecord"]').click();
 // await newPage.getByRole('link', { name: 'Create Record' }).click();
  await newPage.getByRole('combobox', { name: '*Record Type' }).locator('span').click();
  await newPage.getByRole('option', { name: 'Patient Record - EMS' }).click();

  await newPage.getByLabel('First Name').fill('John');
  await newPage.getByLabel('Last Name').fill('Tester');
  await newPage.getByRole('gridcell', { name: 'Gender', exact: true }).locator('span').click();
  await newPage.getByRole('option', { name: 'Male', exact: true }).click();
  await newPage.getByPlaceholder('mm/dd/yyyy').click();
  await newPage.getByPlaceholder('mm/dd/yyyy').fill('09/09/1999');
  
  await newPage.getByLabel('Street', { exact: true }).fill('617 W 6th Street');

  await newPage.getByLabel('*City').fill('Austin');
  await newPage.getByRole('option', { name: 'Austin', exact: true }).click();
  await newPage.getByRole('combobox', { name: 'County' }).locator('span').click();
  await newPage.getByRole('option', { name: 'Travis' }).click();
  await newPage.getByRole('button', { name: 'Save' }).click();
  await expect(newPage.getByRole('gridcell', { name: 'John Tester' })).toBeVisible();click();

  // await newPage.locator('[id="main_menu:rosterImportLink"]').click();
  // await newPage.getByRole('row', { name: 'Data File Format File' }).locator('span').click();
  // await newPage.getByRole('option', { name: 'EMS_XML_File' }).click();
  // await newPage.getByAltText('Upload file').click();
  // await newPage.getByAltText('Upload file').setInputFiles('EMSTRENH-5443.doc');
  // await newPage.getByRole('button', { name: 'Upload' }).click();
  // await expect(newPage.getByText('Invalid file format. Please')).toBeVisible();
  // await newPage.getByRole('link', { name: 'File Upload' }).click();

  // await newPage.getByRole('link', { name: 'EMS Facility' }).click();
  // await newPage.getByRole('row', { name: 'EMS-JP 43322 1000087145' }).getByRole('link').click();
  // await expect(newPage.getByRole('heading')).toContainText('Record Summary(EMS)');
});