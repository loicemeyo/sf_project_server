const nodemailer = require('nodemailer');
import {getConfig} from '../config';

const { 
  mail: {
    mailUser,
    mailPass,
    oAuthClientId,
    oAuthClientSecret,
    refreshToken
  }} = getConfig();

export const sendMail = (email: string, subject: string, mailBody: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: "OAuth2",
      user: mailUser,
      pass: mailPass,
      clientId: oAuthClientId,
      clientSecret: oAuthClientSecret,
      refreshToken: refreshToken
     }
  });

  const mailOptions = {
    from: email,
    to: mailUser,
    subject: subject,
    html: mailBody
  };
  
  transporter.sendMail(mailOptions, function(error: string, info: any){
    console.log(info)
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  })
}
