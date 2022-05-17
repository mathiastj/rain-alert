import puppeteer from 'puppeteer'

const browserConfig = {
  headless: true,
  devtools: false,
  args: ['--no-sandbox', '--disable-setuid-sandbox'] // For running on debian in docker
}
describe('Check for rain', () => {
  let browser: any
  beforeEach(async () => {
    browser = await puppeteer.launch(browserConfig)
  })
  afterEach(async () => {
    await browser.close()
  })
  it('check for rain', async () => {
    const page = await browser.newPage()
    await page.setViewport({ width: 1920, height: 1080 })
    await page.goto('https://www.dmi.dk/radar/')
    // Reject cookies
    await page.click('#declineButton')

    // Drag the radar indicator to the most possible in the future
    // Drags the mouse from a point
    await page.mouse.move(979, 836)
    await page.mouse.down()
    // Drops the mouse to another point
    await page.mouse.move(1530, 835)
    await page.mouse.up()

    // Get the canvas and find a single pixel around Copenhagen
    const pixel = await page.evaluate(() => {
      const canvas = <HTMLCanvasElement>(
        document.evaluate(
          '/html/body/main/section[2]/div[1]/div/div[2]/div/div/div/div/div/div[1]/div[1]/div/canvas',
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        ).singleNodeValue
      )

      if (!canvas) {
        return []
      }
      const context = canvas.getContext('2d')
      if (!context) {
        return []
      }
      const pixel = context.getImageData(705, 407, 1, 1).data

      return pixel
    })
    console.log(pixel)

    if (!pixel) {
      fail()
    }

    // It's usually rgb (255,255,255), white, that is no rain.
    // Make the test pass if there is some form of rain and fail if there is no rain
    expect(pixel).not.toMatchObject({ 0: 255, 1: 255, 2: 255 })
  })
})

// Progress bar locations
// from '(979, 836)'
// to '(1530, 835)'

// Try to find the pixel code
// var canvas = document.evaluate("/html/body/main/section[2]/div[1]/div/div[2]/div/div/div/div/div/div[1]/div[1]/div/canvas", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
// var context = canvas.getContext('2d');
// context.fillRect(705,410,5,5);
