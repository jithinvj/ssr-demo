const express = require ('express');
const fs = require ('fs');
const path = require ('path');
const React = require ('react');
const ReactDOMServer = require ('react-dom/server');

// create express application
const appServer = express ();
const { App }  = require ('../src/App');

// serve static assets
appServer.get( /\.(js|css|map|ico)$/, express.static( path.resolve( __dirname, '../dist' ) ) );

// for any other requests, send `index.html` as a response
appServer.use ('*', (req, res) => {
  // read `index.html` file
  let indexHTML = fs.readFileSync (
    path.resolve (__dirname, '../dist/index.html'),
    {
      encoding: 'utf8',
    }
  );

  // set header and status
  res.contentType ('text/html');
  res.status (200);

  let appHTML = ReactDOMServer.renderToString(<App />);
  indexHTML = indexHTML.replace (
    '<div id="app"></div>',
    `<div id="app">${appHTML}</div>`
  );
  return res.send (indexHTML);
});

// run express server on port 9000
appServer.listen ('9000', () => {
  console.log ('Express server started at http://localhost:9000');
});
