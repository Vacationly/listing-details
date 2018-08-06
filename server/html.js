const Html = ({ body, title, styles }) => `
  <!DOCTYPE html>
  <html>
    <head>
      <title>${title}</title>
      <style type="text/css">${styles}</style>
    </head>
    <body>
      <div id="details">${body}</div>
      <script src="./bundle.js"></script>
    </body>
  </html>
`;

module.exports = Html;
