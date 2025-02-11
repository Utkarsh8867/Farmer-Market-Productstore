



const sendToken = (user, statusCode, res) => {
  const token = user.getJwtToken(); // Get JWT token

  // Ensure the expires field is a valid Date object
  const expiresIn = process.env.JWT_EXPIRES_IN || 30;  // Default to 30 days if not set
  const expiresDate = new Date(Date.now() + expiresIn * 24 * 60 * 60 * 1000); // Expiry in days

  const options = {
    expires: expiresDate, // Corrected expires field
    httpOnly: true, // Ensure the token is sent in an HTTP-only cookie
  };

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
    userId: user._id,
  });
};


module.exports = sendToken;