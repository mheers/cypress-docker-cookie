const { defineConfig } = require('cypress')

module.exports = defineConfig({
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 120000,
  // fixturesFolder: 'cypress/fixtures',
  // screenshotsFolder: 'cypress/screenshots',
  // videosFolder: 'cypress/videos',
  chromeWebSecurity: true,
  e2e: {
    specPattern: 'cypress/specs/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/index.js',
    experimentalSessionAndOrigin: true,
  },
})
