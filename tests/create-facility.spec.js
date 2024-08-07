const { test, expect } = require('@playwright/test');
const { RequestNewAccount } = require('../pages/request-new-account.page');
const fs = require('fs').promises;

const apiUrl = 'https://pprdgovernance.hhs.state.tx.us/identityiq/external/rest/forms';

// Add your generateUniqueValues function here
const generateUniqueValues = () => {
  const generateRandomNumber = (n) => {
    const rangeStart = Math.pow(10, n - 1);
    const rangeEnd = Math.pow(10, n) - 1;
    return Math.floor(Math.random() * (rangeEnd - rangeStart + 1)) + rangeStart;
  };

  const currentDate = new Date();
  const oneYearFromNow = new Date(currentDate.getTime() + 365 * 24 * 60 * 60 * 1000);

  const employerOrOrganizationName = `${generateRandomNumber(5)}`;
  const TIN = generateRandomNumber(9).toString();
  const TXLicense = generateRandomNumber(7).toString();
  const LicenseStartDate = currentDate.getTime(); // Unix timestamp in milliseconds
  const LicenseEndDate = oneYearFromNow.getTime(); // Unix timestamp in milliseconds
  const name_email = `jptestEMS${employerOrOrganizationName}@mailinator.com`;

  return {
    employerOrOrganizationName,
    TIN,
    TXLicense,
    LicenseStartDate,
    LicenseEndDate,
    name_email,
  };
};

test.describe('Create EMSTR Account', () => {
  test('should create accounts for EMSTR facilities', async ({ page }) => {
    const uniqueValues = generateUniqueValues();

    // Open the Request New Account page and perform actions
    const requestNewAccount = new RequestNewAccount(page);
    await requestNewAccount.open();
    await requestNewAccount.clickRegistEmstrFacility();
    await requestNewAccount.clickContinueBtn();

    // Pause to ensure all scripts are loaded properly
    await page.waitForTimeout(6000);

    // Extract the cookies and XSRF token
    const cookies = await page.context().cookies();
    const xsrfToken = await page.evaluate(() => SailPoint.XSRF_TOKEN);

    // Save cookies and XSRF token to a file
    await fs.writeFile('cookies.json', JSON.stringify({ cookies, xsrfToken }, null, 2));

    // Supertest is not directly compatible with Playwright, so use native Fetch API or Node.js https
    const cookieString = cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ');
    const completeCookieString = `${cookieString}; XSRF-TOKEN=${encodeURIComponent(xsrfToken)}`;

    const requestBody = {
      formBeanClass: "sailpoint.service.form.TransientFormStore",
      formBeanState: {},
      data: {
        appName: "EMSTR",
        orgType: "309305-EMS",
        employerOrOrganizationName: `EMS-JP ${uniqueValues.employerOrOrganizationName}`,
        description: null,
        TIN: uniqueValues.TIN,
        TXLicense: uniqueValues.TXLicense, // Assuming this is a static value
        LicenseStartDate: uniqueValues.LicenseStartDate,
        LicenseEndDate: uniqueValues.LicenseEndDate,
        HHSAgencySponsor: "STGAgencySpsr.JasonPacitti@hhs.texas.gov",
        hhsPhysicalAddr: "5106 Dazzle Dr,",
        hhsPhysicalCity: "Dallas",
        TXCounty: "057 - Dallas",
        hhsPhysicalZip: "75232",
        hhsPhysicalState: "TX",
        firstname: "George",
        lastname: "Curious",
        name: uniqueValues.name_email,
        hhsPhone: "512-750-8873",
      },
      formId: "64553d1e8a75180b818a758930cc0267",
      button: {
        disabled: false,
        loading: true,
        action: "next",
        actionParameter: null,
        actionParameterValue: null,
        label: "Submit",
        skipValidation: false,
      },
    };

    console.log("Request Body:", JSON.stringify(requestBody, null, 2));

    // Fetch API to make an API request
    try {
      const response = await fetch(`${apiUrl}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': completeCookieString,
          'X-XSRF-TOKEN': xsrfToken
        },
        body: JSON.stringify(requestBody)
      });
      const data = await response.json();
      console.log('API response:', data);
    } catch (error) {
      console.error('API request error:', error);
    }
  });
});
