export default (survey, redirectDomain) => `
  <html>
    <body>
      <div style="text-align: center;">
        <h3>I'd like your input!</h3>
        <p>Please answer the following question:</p>
        <p>${survey.body}</p>
        <div>
          <a href="${redirectDomain}/api/surveys/${survey.id}/thanks/yes">Yes</a>
        </div>
        <div>
          <a href="${redirectDomain}/api/surveys/${survey.id}/thanks/no">No</a>
        </div>
      </div>
    </body>
  </html>
  `;
