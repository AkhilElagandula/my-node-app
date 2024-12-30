const authService = require('../../services/authService');

exports.sendOtp = async (req, res, next) => {
  const { mobile } = req.body;
  try {
    const otp = await authService.generateAndSendOtp(mobile);
    res.status(200).json({ message: 'OTP sent successfully', user: otp.user }); // Remove OTP in production for security
  } catch (error) {
    next(error);
  }
};

exports.verifyOtp = async (req, res, next) => {
  const { mobile, otp } = req.body;
  try {
    const token = await authService.verifyOtp(mobile, otp);
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
