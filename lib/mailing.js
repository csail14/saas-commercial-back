const nodeMailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

module.exports = (mailTo, subject, title, text) =>{
    const oauth2Client = new OAuth2(
        '378230846009-keqbe24a6ga37v8hnqs8v841ue65gi6a.apps.googleusercontent.com', // client Id
        '5nPX3KwSVKbl35auSdhx3WGK', // client secret
        "https://developers.google.com/oauthplayground" // Redirect URL
    )
    
    oauth2Client.setCredentials({
        refresh_token: '1//04dZh0OFTfljKCgYIARAAGAQSNwF-L9Irzeom1tEYcQb2_tAaZ7yotxHyQSQ9PxOlzCUFR8qb0ZWdMUwsl6-vvV9VQKzBEq8nJIY'
    })
    
    
    let transporter = nodeMailer.createTransport({
          service: 'gmail',
          auth: {
            type: 'OAuth2',
            user: 'cssaillard@gmail.com',
            clientId: "378230846009-keqbe24a6ga37v8hnqs8v841ue65gi6a.apps.googleusercontent.com",
            clientSecret: "5nPX3KwSVKbl35auSdhx3WGK",
            refreshToken: '1//04dZh0OFTfljKCgYIARAAGAQSNwF-L9Irzeom1tEYcQb2_tAaZ7yotxHyQSQ9PxOlzCUFR8qb0ZWdMUwsl6-vvV9VQKzBEq8nJIY',
            accessToken: "ya29.a0AfH6SMCsoUsmmp3nOCldua-PRJiGyg1JxpVt6L3gnClYDnkDNfCnzqoqsB3PozxPWj9WsXaGeNTWyi35Dw4Rg-f9fkCR_OiinG-bgXXjjI_LxENAWAZo310INQmGWJKZPoZlx4qbpzVynFm8cTmwaT8BxdOJ5oBwYS4sIdyyjOo"
        }

      });
      
      let mailOptions = {
          from: '"commerce-saas" <cssaillard@gmail.com>', // sender address
          to: mailTo, // list of receivers
          subject: subject, // Subject line
          text: '', // plain text body
          html: '<b>'+title+'</b><p>'+text+'<p>' // html body
      };
      
    transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              console.log('ça rate');
              return console.log(error);
          }
          console.log('Message %s sent: %s', info.messageId, info.response);
              //res.render('index');
    });
}