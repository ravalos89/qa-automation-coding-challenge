const { expect } = require('@wdio/globals')
const MainPage = require('../pageobjects/main.page')
let parentWindow = null;

describe('My Scenarios qa-automation-coding-challenge', () => {

    before(async () => {
        await MainPage.open()
        parentWindow = await browser.getWindowHandle();
    })

    it('S001 - Validate objects displayed in the app', async () => {
        await expect(MainPage.lblHeader).toHaveTextContaining('Get Github Repos')
        await expect(MainPage.lblGithubUsername).toHaveTextContaining('Github Username')
        await expect(MainPage.lbldefaultNoRepos).toHaveTextContaining('No repos')
        await expect(MainPage.inputUsername).toBeDisplayed();
        await expect(MainPage.btnSubmit).toBeDisplayed();
    });

    it('S002 - Search valid user and verify the results after click on "Go" button', async () => {
        await MainPage.searchRepo("test");
        await MainPage.spinner.waitForDisplayed({ reverse: true });
        await expect(MainPage.lblMsgArea).toHaveTextContaining('Success!')
        await expect(MainPage.lnkReposResults).toBeElementsArrayOfSize(5);
        await expect(MainPage.setAmountRepos(5)).toBeDisplayed();
        await expect(MainPage.lblRepoDescription).toBeElementsArrayOfSize(5);
        await MainPage.clickSpecificRepoByIndex(1);
        await expect((await browser.getWindowHandles()).length).toBeGreaterThan(1);
        await browser.switchToWindow(parentWindow);
    });

    it('S003 - Search valid user and verify the results after click on Enter key', async () => {
        await MainPage.searchRepoByEnterKey("test");
        await MainPage.spinner.waitForDisplayed({ reverse: true });
        await expect(MainPage.lblMsgArea).toHaveTextContaining('Success!')
        await expect(MainPage.lnkReposResults).toBeElementsArrayOfSize(5);
        await expect(MainPage.setAmountRepos(5)).toBeDisplayed();
        await expect(MainPage.lblRepoDescription).toBeElementsArrayOfSize(5);
        await MainPage.clickSpecificRepoByIndex(1);
        await expect((await browser.getWindowHandles()).length).toBeGreaterThan(2);
        await browser.switchToWindow(parentWindow);
    });

    it('S004 - Search empty value and verify results', async () => {
        await browser.refresh()
        await MainPage.searchRepo("");
        await MainPage.spinner.waitForDisplayed({ reverse: true });
        await expect(MainPage.lblMsgArea).toHaveTextContaining('Github user not found')
    });

    it('S005 - Search invalid characters and verify results', async () => {
        await browser.refresh()
        await MainPage.searchRepo("$&%");
        await MainPage.spinner.waitForDisplayed({ reverse: true });
        await expect(MainPage.lblMsgArea).toHaveTextContaining('Something went wrong')
    });
})