const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  mail: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  }
});

UserSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    bcrypt.hash(this.password, 8, (error, hash) => {
      if (error) return next(error);
      this.password = hash;
      next();
    })
  };
});

module.exports = mongoose.model('User', UserSchema);

// https://json-generator.com/

// [
//   '{{repeat(3)}}',
//   {
//     username: '{{surname()}}',
//     password: 'testpass',
//     mail: '{{email()}}',
//   }
// ]