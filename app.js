const express = require('express');
const app = express();
const puppeteer = require('puppeteer');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.post('/', async (req, res) => {
  const browser = await puppeteer.launch({headless: true, args:['--no-sandbox']});
  const page = await configurePage(browser);
  await page.goto('http://www.example.org/');  
  const imageBuffer = await page.screenshot();
  browser.close(); 
  res.set('Content-Type', 'application/json');
  res.send(req.body);
});

const server = app.listen(process.env.PORT || 8080, err => {
  if (err) return console.error(err);
  const port = server.address().port;
  console.info(`App listening on port ${port}`);
});

async function configurePage(browser) {
  let defaultUserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36';
  const page = await browser.newPage();
  page.setUserAgent(defaultUserAgent)
  return page;
}