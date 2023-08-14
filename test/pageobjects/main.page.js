const { $ } = require('@wdio/globals')
const Base = require('./base');
const amount = {
    amountRepos: 5
};

class MainPage extends Base {

    /*
    OBJECTS
    */

    get lblHeader () {
        return $('//*[@id="root"]//h1');
    }

    get lblGithubUsername () {
        return $('//*[@for="username"]');
    }

    get inputUsername () {
        return $('#username');
    }

    get btnSubmit () {
        return $('//button[@class="submit"]');
    }

    get lbldefaultNoRepos () {
        return $('//p[@class="output-status-text"]');
    }

    get spinner () {
        return $('//*[@class="circle"]');
    }

    get lnkReposResults () {
        return $$('//li[@class="repo-row"]//a');
    }

    get lblRepoDescription () {
        return $$('//p[@class="repo-description"]');
    }

    get lblAmountRepos () {
        return $$('//p[@class="repo-amount" and text()="'+amount.amountRepos+'"]');
    }

    get lblMsgArea () {
        return $$('//*[@class="message-area"]//strong');
    }

    async setAmountRepos (qty) {
        const obj = await $$('//p[@class="repo-amount" and text()="'+qty+'"]');
        return obj;
    }

    async searchRepo (repoName) {
        await this.inputUsername.setValue(repoName)
        await this.btnSubmit.click();
    }

    async searchRepoByEnterKey (repoName) {
        await this.inputUsername.setValue(repoName)
        await browser.keys('Enter')
    }

    async clickSpecificRepoByIndex (index) {
        await this.lnkReposResults[index].click();
    }

    open () {
        return super.open();
    }

    close () {
        return super.close();
    }
}

module.exports = new MainPage();
