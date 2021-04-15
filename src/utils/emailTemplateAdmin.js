const emailTemplateForUser = (assignmentURL, data) => {
  const html = `
	<body style="margin: 0; padding: 0">
  <table
    border="0"
    cellpadding="0"
    cellspacing="0"
    width="900px"
    style="padding: 0 40px 0 40px; background-color: #f1f2f3"
  >
    <tr>
      <td align=" center" style="padding: 0 50px 0 50px">
        <table
          border="0"
          cellpadding="0"
          cellspacing="0"
          width="100%"
          style="background-color: #ffffff; padding: 0 0 0 20px"
        >
          <tr>
            <td
              align="center"
              style="
                font-family: Arial, sans-serif;
                font-size: 24px;
                color: #050505;
              "
            >
              <p>Hi Admin</p>
            </td>
          </tr>
          <tr>
            <td
              align="center"
              style="
                color: #153643;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 20px;
              "
            >
              <p>
                A user just submitted an assignment with the email ${data.email}
              </p>
            </td>
          </tr>
          <tr>
            <td align="center">
              <p>
                <a
                  href="${assignmentURL}"
                  style="
                    width: 250px;
                    display: inline-block;
                    text-decoration: none;
                    font-size: 15px;
                    text-align: center;
                    background-color: #55acee;
                    border-radius: 2px;
                    color: white;
                    height: 32px;
                    cursor: pointer;
                    padding-top: 5px;
                  "
                >
                View Asssignment</a
                >
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p>Assignments Data</p>
              <table style="width: 100%">
                <tr>
                  <td>Email</td>
                  <td>${data.email}</td>
                </tr>
                <tr>
                  <td>Subject</td>
                  <td>${data.subject}</td>
                </tr>
                <tr>
                  <td>Deadline</td>
                  <td>${data.deadline}</td>
                </tr>
                <tr>
                  <td>File</td>
                  <td><a href="${data.fileUrl}">${
    data.fileUrl ? "View File" : "No file"
  }</a></td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td
              align="center"
              style="
                color: #153643;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 20px;
              "
            >
             
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <tr>
      <td align="center" style="padding: 30px 30px 30px 30px">
        Ideal Assignments Help,&copy; 2021<br />
      </td>
    </tr>
  </table>
</body>


`;
  return { html };
};
module.exports = emailTemplateForUser;
