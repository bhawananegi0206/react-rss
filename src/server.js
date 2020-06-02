const fs = require('fs');
const express = require("express")
const request = require("request")
const path = require("path")
const React = require("react")
const cors = require('cors')
const app = express();

app.use(express.static('./build'));
app.use('/assets', express.static('assets'));

  const { renderToNodeStream } = require("react-dom/server")

  const index = require("./../dist-ssr/app").default

  const bodyParser = require('body-parser');
  const pino = require('express-pino-logger')();
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(pino);

app.get("/", (req, res) => {
  console.log("bhawana");
  const html = fs.readFileSync(path.resolve(__dirname, `./../dist/ssr.html`), "utf-8")
  const [head, tail] = html.split("{content}")
  res.write(head)
  const url = "https://jsonplaceholder.typicode.com/photos?_page=1&&_limit=10"
  request({
    method: "GET",
    url
  }, (err, httpsRes, body) => {
    const newTail = tail.split("{script}")
      .join(`
      <script id="ssr__script">
        window.__index__ = ${JSON.stringify(body)}
      </script>
      `)

      const reactElement = React.createElement(index, { index: JSON.parse(body) })
      const stream = renderToNodeStream(reactElement)
      stream.pipe(res, { end: false })
      stream.on("end", () => {
        res.write(newTail)
        res.end()
      })
  })
})


app.get("/client", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./../dist/index.html"))
})


app.use(express.static(path.join(__dirname, "./../dist")))

app.listen(8080, () => {
  console.log("Server is listening on port 8080")
})


