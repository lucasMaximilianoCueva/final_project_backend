const nodemailer = require("nodemailer");

function createSendMail(mailConfig) {
    const transporter = nodemailer.createTransport(mailConfig);
  
    return async function sendMail({ to, subject, text, html, attachments }) {
      const mailOptions = {
        from: mailConfig.auth.user,
        to,
        subject,
        text,
        html,
        attachments,
      };
      return await transporter.sendMail(mailOptions);
    };
  }
  
  function createSendMailEthereal() {
    return createSendMail({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "antoinette.stokes99@ethereal.email",
        pass: process.env.ETHEREAL_PASS,
      },
    });
  }
  
  function createSendMailGoogle() {
    return createSendMail({
      service: "gmail",
      auth: {
        user: "lc64660@gmail.com",
        pass: "Zu749",
      },
    });
  }
  
  const sendMailEthereal = createSendMailEthereal();
  const sendMailGoogle = createSendMailGoogle();

module.exports = {
    sendMailEthereal,
    sendMailGoogle
}  