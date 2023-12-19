const http = require('http')
const fs = require('fs')
const { log } = require('console')
const logger = require('tracer').colorConsole()

const server = http.createServer((req, res) => {
  if (req.method == 'GET') {
    let mainpage
    if (req.url == '/') {
      mainpage = fs.readFileSync('./app/index.html')
      logger.info('GET /')
      res.writeHead(200, { 'Content-Type': 'text/html' })
    } else if (req.url == '/script.js') {
      mainpage = fs.readFileSync('./app/script.js')
      logger.info('GET /script.js')
      res.writeHead(200, { 'Content-Type': 'text/javascript' })
    } else if (req.url == '/calendar.js') {
      mainpage = fs.readFileSync('./app/calendar.js')
      logger.info('GET /calendar.js')
      res.writeHead(200, { 'Content-Type': 'text/javascript' })
    } else if (req.url == '/style.css') {
      mainpage = fs.readFileSync('./app/style.css')
      logger.info('GET /style.css')
      res.writeHead(200, { 'Content-Type': 'text/css' })
    } else if (req.url == '/tracker.json') {
      mainpage = fs.readFileSync('./tracker.json')
      logger.info('GET /tracker.json')
      res.writeHead(200, { 'Content-Type': 'text/css' })
    } else if (req.url == '/calendar.html') {
      mainpage = fs.readFileSync('./app/calendar.html')
      logger.info('GET /calendar.html')
      res.writeHead(200, { 'Content-Type': 'text/html' })
    } else if (req.url == '/calendar.ics') {
      mainpage = fs.readFileSync('./app/calendar.ics')
      logger.info('GET /calendar.ics')
      res.writeHead(200, { 'Content-Type': 'text/plain' })
    }
    res.end(mainpage)
  } else if (req.method == 'POST') {
    if (req.url == '/handleUpload') {
      let body = ''
      req.on('data', data => {
        body += data
      })

      req.on('end', () => {
        try {
          let post = JSON.parse(body)
          console.log('RECIVED: ', body)

          res.writeHead(200, { 'Content-Type': 'text/plain' })
          res.end('ADDED EXERCISE SUCCESSFULLY!')

          let tracker = JSON.parse(fs.readFileSync('./tracker.json'))
          tracker.history.push(post)

          fs.writeFileSync(
            './tracker.json',
            JSON.stringify(tracker, null, 4),
            'utf-8'
          )

          return
        } catch (err) {
          console.log('tu: ', err)
          res.writeHead(500, { 'Content-Type': 'text/plain' })
          res.write('Bad Post Data.  Is your data a proper JSON?\n')
          res.end()
          return
        }
      })
    }
  }
})

server.listen(3000, () => {
  console.log('running on port 3000')
})

const genIcs = body => {}
