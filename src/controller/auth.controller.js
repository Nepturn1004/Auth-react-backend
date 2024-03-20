const { User, Token } = require('../database/models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const defaultController = async (req, res) => {
  res.send('Welcome to my server!');
};

const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Find user by username
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const payload = {
      userId: user.id,
      userName: user.username,
      usrPassword: user.password,
      userEmail: user.email
    };

    //generate access token and refresh token
    const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET_KEY, {
      expiresIn: '15m'
    });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET_KEY, {
      expiresIn: '7d'
    });

    const token = await Token.create({
      userId: user.id,
      accessToken,
      refreshToken
    });

    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    console.error('Error message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
const signupController = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    // Validate user input
    if (!(email && username && phone && password)) {
      return res.status(400).send('All input is required');
    }

    // Check if user already exists
    const oldUser = await User.findOne({ where: { email } });
    if (oldUser) {
      return res.status(409).send('User already exists. Please login');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('hashedPassword');
    console.log(hashedPassword);

    // Create a new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      phone
    });

    // Return success
    res.status(201).json({ message: 'User created successfully', newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Export the controller functions
module.exports = {
  default: defaultController,
  login: loginController,
  signup: signupController
};
