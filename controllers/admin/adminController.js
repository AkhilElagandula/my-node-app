const User = require('../../models/User');

// Create an admin user
exports.createAdmin = async (req, res, next) => {
  try {
    const { name, mobile } = req.body;

    // Validate input
    if (!name || !mobile) {
      return res.status(400).json({ message: 'Name and mobile are required' });
    }

    // Check if the mobile number already exists
    const isUserExists = await User.exists({ mobile });
    if (isUserExists) {
      return res.status(400).json({ message: 'Mobile number already exists' });
    }

    // Create a new admin user
    const admin = new User({ name, mobile, role: 'admin' });
    await admin.save();

    return res.status(201).json({
      message: 'Admin user created successfully',
      admin: {
        id: admin._id,
        name: admin.name,
        mobile: admin.mobile,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error('Error creating admin:', error.message);
    return next(error);
  }
};