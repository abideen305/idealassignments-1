const resetPassword = (user, resetLink, url) => {
  const html = `
    <table id="content_root" width="100%" cellpadding="0" cellspacing="0">
    <tbody><tr>
      <td align="center">
        <table cellpadding="0" cellspacing="0" align="center">
          <tbody><tr>
            <td align="left" valign="top">
                <div>
   <table class="structure-container" width="100%" cellpadding="0" cellspacing="0" style="
           ">
    <tbody><tr>
      <td>
        <table cellpadding="0" cellspacing="0">
          <tbody><tr>
            <td align="center" width="548">
              <table align="center" cellpadding="0" cellspacing="0" class="structure mobile-full-width" width="100%" style="
                           background-color: #ffffff;
                         border-color: #62c0bc;
                       ">
                <tbody><tr>
                  <td align="center">
                    <table align="center" class="mobile-full-width responsive" cellpadding="0" cellspacing="0" width="100%">
                        <tbody><tr><td class="full mobile-full-width" width="100%" valign="top" style="">
    <table class="column" width="100%" cellpadding="0" cellspacing="0" style="margin: 0 auto; text-align: left;">
      <tbody><tr>
        <td align="center" style="
              padding: 29px 29px 29px 29px;">
            <table width="100%" cellpadding="0" cellspacing="0">
    <tbody><tr>
      <td align="center">
        <table align="center" cellpadding="0" cellspacing="0">
          <tbody><tr>
            <td align="center" class="fix-space-td-img">
              <div>
                          <img style="display: block;" width="310" height="150" src="${url}/images/logo%20bar.jpeg">
              </div>
            </td>
          </tr>
        </tbody></table>
      </td>
    </tr>
  </tbody></table>
  
            <table cellpadding="0" cellspacing="0">
    <tbody><tr>
      <td height="20" style="font-size:20px; line-height: 20px; mso-line-height-rule:exactly;">
        &nbsp;
      </td>
    </tr>
  </tbody></table>
  
            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" align="left"><![endif]-->
  <!--[if !mso]><!--><table width="100%" cellpadding="0" cellspacing="0"><!--<![endif]-->
    <tbody><tr>
      <td align="left">
        <h1 style="font-family: Arial;
          font-size: 30px;
          font-weight: normal;line-height: 44px;
          color: #161f36;
          margin: 0;text-align: center;mso-line-height-rule: exactly;"><span style="color: #f0b10a;"><span style="font-size: 44px; line-height: 44px; mso-line-height-rule: exactly;"><strong><span style="color: #039be5;">Welcome ${user}</span></strong></span></span></h1>
      </td>
    </tr>
  </tbody></table>
  
            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" align="left"><![endif]-->
  <!--[if !mso]><!--><table width="100%" cellpadding="0" cellspacing="0"><!--<![endif]-->
    <tbody><tr>
      <td align="left">
        <p style="color: #161f36;
          font-size: 17px;
          font-family: Arial;line-height: 26px;text-align: center;
          margin: 0;mso-line-height-rule: exactly;"><span style="color: #039be5;"><strong><span style="color: #039be5;">_____</span></strong></span></p>
      </td>
    </tr>
  </tbody></table>
  
            <table cellpadding="0" cellspacing="0">
    <tbody><tr>
      <td height="20" style="font-size:20px; line-height: 20px; mso-line-height-rule:exactly;">
        &nbsp;
      </td>
    </tr>
  </tbody></table>
  
            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" align="left"><![endif]-->
  <!--[if !mso]><!--><table width="100%" cellpadding="0" cellspacing="0"><!--<![endif]-->
    <tbody><tr>
      <td align="left">
        <p style="color: #161f36;
          font-size: 17px;
          font-family: Arial;line-height: 26px;text-align: center;
          margin: 0;mso-line-height-rule: exactly;"><span style="color: #161f36;"><span style="color: #161f36;">Hello, you have received this email because you have asked to reset your password.

          </span></span></p>
  <p style="color: #161f36;
          font-size: 17px;
          font-family: Arial;line-height: 26px;text-align: center;
          margin: 0;mso-line-height-rule: exactly;">&nbsp;</p>
  <p style="color: #161f36;
          font-size: 17px;
          font-family: Arial;line-height: 26px;text-align: center;
          margin: 0;mso-line-height-rule: exactly;"><span style="color: #161f36;"><span style="color: #161f36;">If it wasn't you, you can just ignore it.

          </span></span></p>
      </td>
    </tr>
  </tbody></table>
  
            <table cellpadding="0" cellspacing="0">
    <tbody><tr>
      <td height="20" style="font-size:20px; line-height: 20px; mso-line-height-rule:exactly;">
        &nbsp;
      </td>
    </tr>
  </tbody></table>
  
            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" align="left"><![endif]-->
  <!--[if !mso]><!--><table width="100%" cellpadding="0" cellspacing="0"><!--<![endif]-->
    <tbody><tr>
      <td align="left">
        <p style="color: #161f36;
          font-size: 17px;
          font-family: Arial;line-height: 26px;text-align: center;
          margin: 0;mso-line-height-rule: exactly;"><span style="color: #039be5;"><strong><span style="color: #039be5;">Access the following link:

          </span></strong></span></p>
      </td>
    </tr>
  </tbody></table>
  <table cellpadding="0" cellspacing="0">
    <tbody><tr>
      <td height="20" style="font-size:20px; line-height: 20px; mso-line-height-rule:exactly;">
        &nbsp;
      </td>
    </tr>
  </tbody></table>
            <table width="100%" cellpadding="0" cellspacing="0">
    <tbody><tr>
      <td align="center">
          <table border="0" align="center" class="mobile-full-width" cellpadding="0" cellspacing="0" style="
                   background-color:#039be5;
                   border-collapse: separate;
                   border: 1px solid #039be5;
                   border-radius: 27px;">
            <tbody><tr>
              <td align="center" style="
                    padding: 10px 36px;
                    color: #ffffff;
                    font-family: Arial;
                    font-size: 15px;">
                <a href="${resetLink}" target="_blank" style="
                     text-align: center;
                     text-decoration: none;
                     display: block;
                     color: #ffffff;
                     font-family: Arial;
                     font-size: 15px;">
                  <span style="margin: 0px;">Click here</span>
                </a>
              </td>
            </tr>
          </tbody></table>
      </td>
    </tr>
  </tbody></table>
  
            
  
        </td>
      </tr>
    </tbody></table>
  </td>
  
                    </tr></tbody></table>
                  </td>
                </tr>
              </tbody></table>
            </td>
          </tr>
        </tbody></table>
      </td>
    </tr>
  </tbody></table>
  </div>
  
                
            </td>
          </tr>
        </tbody></table>
    `;

  return { html };
};

module.exports = resetPassword;
