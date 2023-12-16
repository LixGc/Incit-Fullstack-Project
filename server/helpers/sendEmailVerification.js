//Helper function to send email verification
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");

async function sendEmail(user) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GOOGLE_EMAIL,
        pass: process.env.GOOGLE_PASSWORD,
      },
    });

    const currentUrl = "http://localhost:3000";
    let uniqueString = uuidv4() + user.username;
    let verificationLink = currentUrl + "/auth/verify/" + user.id + "/" + uniqueString;
    const sendMail = await transporter.sendMail({
      from: "Incit",
      to: user.email,
      subject: "Verify Email Address",
      html: `<p>Verify your email address to complete the sign up!</p>
          <p>Click <a href=${verificationLink}>here</a> to proceed.</p>`,
    });

    if (sendMail) {
      user.verificationLink = uniqueString;
      await user.save();
      console.log("Email successfully sent!");
    }
  } catch (error) {
    console.error(error);
  }
}

module.exports = sendEmail;
