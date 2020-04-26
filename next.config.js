const withImages = require('next-images')
module.exports = withImages({
  env: {
    LOCIZE_PROJECT_ID: process.env.LOCIZE_PROJECT_ID || 'aafbc3cb-b71e-4222-a0a3-8dd99ec87ee6',
    LOCIZE_API_KEY: process.env.LOCIZE_API_KEY || '65be70ea-0079-413f-919e-4a867c28db12',
    I18N_DEV: process.env.I18N_DEV || false,
  }
})
