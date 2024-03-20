const { User } = require('../database/models');

module.exports = {
  login: async (username, password) => {
    // Query the database to find the user with the provided username and password
    const user = await User.findOne({ where: { username, password } });
    return Boolean(user);
  }
};
