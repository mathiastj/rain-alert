module.exports = {
  launch: {
    executablePath: '/usr/bin/google-chrome-stable',
    headless: true,
    args: [
      '--ignore-certificate-errors',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu'
    ]
  }
}

// module.exports = {
//   launch: {
//     dumpio: true,
//     headless: process.env.HEADLESS !== 'false',
//     product: 'chrome'
//   },
//   browserContext: 'default'
// }
