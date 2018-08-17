const Html = ({
  body, title, styles, props,
}) => `
  <!DOCTYPE html>
  <html>
    <head>
      <title>${title}</title>
      <style type="text/css">${styles}</style>
    </head>
    <body>
      <div id="details">${body}</div>
      <script id='props' type='application/json'>${escape(JSON.stringify(props))}</script>
      <script src="https://s3.amazonaws.com/fec-listing-details-static-files/ssr/bundle.js"></script>
    </body>
  </html>
`;

module.exports = Html;
