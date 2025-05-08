import { defineConfig } from 'cypress'

export default defineConfig({
  
  e2e: {
    baseUrl: 'http://localhost:4200',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    watchForFileChanges: false,
    defaultCommandTimeout: 6000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // We'll add image snapshot plugin configuration manually instead of importing
      // the module directly, since that was causing issues
      on('task', {
        log(message) {
          console.log(message);
          return null;
        }
      });
      
      return config;
    }
  },
  
  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    specPattern: '**/*.cy.ts'
  }
  
})