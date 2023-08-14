const { browser } = require('@wdio/globals')

module.exports = class Base {

    open () {
        return browser.url(`http://localhost:3000/`)
    }
}
