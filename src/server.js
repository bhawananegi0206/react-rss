const fs = require('fs');
const express = require("express")
const path = require("path")
const React = require("react")
const app = express();

app.use(express.static('./build'));
app.use('/assets', express.static('assets'));

  const { renderToNodeStream } = require("react-dom/server")

  const index = require("./../dist-ssr/index").default

  const bodyParser = require('body-parser');
  const pino = require('express-pino-logger')();
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(pino);

app.get("/", (req, res) => {
  const html = fs.readFileSync(path.resolve(__dirname, `./../dist/ssr.html`), "utf-8")
  const [head, tail] = html.split("{content}")
  res.write(head)
  res.end()
})


app.get("/client", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./../dist/index.html"))
})


app.use(express.static(path.join(__dirname, "./../dist")))

app.listen(8080, () => {
  console.log("Server is listening on port 8080")
})


