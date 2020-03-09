const nodemailer = require("nodemailer");
// async..await is not allowed in global scope, must use a wrapper
async function sendMail(address, path) {
  console.log('here1');  
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  //let testAccount = await nodemailer.createTestAccount({});
  console.log('here2'); 
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    //host: 'smtp.gmail.com',
    service: 'gmail',
    //port: 587,
    //secure: false, // true for 465, false for other ports
    //port: 465,
    //secure: true,
    auth: {
        user: 'goferliran@gmail.com', // generated ethereal user
        pass: '11223344qqwweerr' // generated ethereal password
    }
    
  });
  console.log('here3');
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo" <foo@example.com>', // sender address
    to: address, // list of receivers
    subject: "Hello", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
    attachments: [{   // file on disk as an attachment
        filename: 'coupons.csv',
        path: path // stream this file
    }]

  });
  console.log('here4');
  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
module.exports = sendMail;
//nodemailer().catch(console.error);
