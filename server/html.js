/**
 * Html
 * This Html.js file acts as a template that we insert all our generated
 * application code into before sending it to the client as regular HTML.
 * Note we're returning a template string from this function.
 */
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
