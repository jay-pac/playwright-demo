export class RequestNewAccount {
  constructor(page) {
    this.page = page;
    this.name;
    // this.registEmstrFacilityRadio = page.locator('[name="Field1"]');
    this.registEmstrFacilityRadio = page.locator('.radio input[name="Field1"]').nth(0);
    this.continueBtn = page.locator("#ContinueBtn0");
  }

  async open() {
    await this.page.goto(
      `https://pprdgovernance.hhs.state.tx.us/identityiq/external/registration.jsf#/register`
    );
  }
  async clickRegistEmstrFacility() {
    // await this.registEmstrFacilityRadio.waitFor({ state: 'visible' });
    await this.registEmstrFacilityRadio.click();
  }

  async clickContinueBtn() {
    // await this.continueBtn.waitFor({ state: 'visible' });
    await this.continueBtn.click();
  }
}
