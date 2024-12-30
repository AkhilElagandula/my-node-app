exports.generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
};

exports.sendOtp = async (mobile, otp) => {
  console.log(`Sending OTP ${otp} to ${mobile}`);
  // Integrate with an SMS gateway (e.g., Twilio, AWS SNS) to send OTP
};
