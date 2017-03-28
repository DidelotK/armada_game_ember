'use strict';
const User = require('./models/common/user').model;

const db = {
  init() {
    User.findOne({role: 'admin'}, (err, user) => {
      if (err) {
        console.log(err);
      }

      if (!user) {
        const admin = new User({
          surname: 'admin',
          name: 'admin',
          role: 'admin',
          email: 'admin@admin.admin',
          password: 'admin'
        });
        admin.save();
      }
    });
  }
};

module.exports = db;
