const { renderFile } = require("ejs");

const User = require("../../models/auth");
const mailer = require("../../../utils/services/mail");

const { generateOTPToken, generateOTPCode } = require("../../../utils/services/auth");

module.exports = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    console.log(email, process.env.EMAIL);
    if (!user) return res.status(404).json({ error: "User not found/exist." });
    const token = generateOTPCode() || generateOTPToken();
    const now = new Date();
    now.setMinutes(now.getMinutes() + 3);
    await User.findByIdAndUpdate({ _id: user._id }, {
      "$set": {
        passwordResetToken: token,
        passwordResetExpires: now
      }
    });
    const html = await renderFile(`${__dirname}/../../../utils/templates/forgotPassword.ejs`, {
      username: user.name, token
    });
    mailer.sendMail({ to: email, subject: "Token de recuperação", html }, err => {
      if (err) return res.status(500).json({ error: "Cannot send forgot password email." });
    });
    return res.status(200).json({ message: "Email successfully sent." });
  } catch (e) {
    return res.status(400).json({ error: "Error sending email, please try again.", code: e.message });
  }
}