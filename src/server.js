import path from 'path';
import fs from 'fs';

import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';
const { Provider } = require('react-redux');
import App from '../src/views/app';
import store from "../src/store/store";


const PORT = process.env.PORT || 3000;
const app = express();


app.use(express.static('./build'));


app.get('/*', (req, res) => {
  const app = ReactDOMServer.renderToString(<Provider store={store}><App /></Provider>);
  

  const indexFile = path.resolve(path.join(__dirname,"views/index.ejs"));
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    );
  });
});

app.listen(PORT, () => {
  console.log(`😎 Server is listening on port ${PORT}`);
});
