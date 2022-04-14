const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const Joi = require('Joi');
const bcrypt = require("bcryptjs");
const jwtMethod = require('../utils/jwt');

/* GET, POST, DELETE, UPDATE users. */



// GET ALL
router.get('', jwtMethod.authenticateToken, async (req, res) => {
  try {
    const users = await User.find().select(['-password', '-__v']);
    if (users[0] === undefined) {
      res.sendStatus(204)
    } else {
      res.json(users);
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// COUNT
router.get('/count', jwtMethod.authenticateToken, async (req, res) => {
  try {
    const usersCount = await User.count();
    res.json(usersCount);
  } catch (error) {
    res.status(500).json({ message: error });
  }
})

// GET BY ID
router.get('/specific/:userId', jwtMethod.authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (user) {
      res.json(user);
    } else {
      res.status(400).json("No user found")
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
})

// POST
router.post('/post', jwtMethod.authenticateToken, async (req, res) => {
  const newUser = new User({
    ...req.body,
    isAdmin: false
  });

  const joiSchema = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
    mail: Joi.string().required()
  })

  if (joiSchema.validate(req.body).error) {
    res.status(400).send(joiSchema.validate(req.body).error.details);
  } else {
    try {
      const savedUser = await newUser.save();
      res.json(savedUser);
    } catch (error) {
      res.status(500).json(500, { message: error });
    }
  }
});

// DELETE SELF
router.delete('/delete/self', jwtMethod.authenticateToken, async (req, res) => {
  const userJWT = req.user
  try {
    const removedUser = await User.deleteOne({ _id: userJWT._id });
    res.json(removedUser);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// DELETE BY ID
router.delete('/delete/:userId', jwtMethod.authenticateToken, async (req, res) => {
  const userJWT = req.user
  if (userJWT.isAdmin) {
    try {
      const removedUser = await User.deleteOne({ _id: req.params.userId });
      res.json(removedUser);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  } else {
    res.status(401).json("Must be an admin to delete someone")
  }
});

// PATCH
// Username
router.patch('/update/username', jwtMethod.authenticateToken, async (req, res) => {
  const joiSchema = Joi.object().keys({
    username: Joi.string().required()
  })
  const userJWT = req.user
  if (joiSchema.validate(req.body).error) {
    res.status(400).send(joiSchema.validate(req.body).error.details);
  } else {
    try {
      const patchedUserUsername = await User.updateOne(
        { _id: userJWT._id },
        { $set: { username: req.body.username } }
      );
      res.json(patchedUserUsername);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
})
// Mail
router.patch('/update/mail', jwtMethod.authenticateToken, async (req, res) => {
  const joiSchema = Joi.object().keys({
    mail: Joi.string().required()
  })
  const userJWT = req.user
  if (joiSchema.validate(req.body).error) {
    res.status(400).send(joiSchema.validate(req.body).error.details);
  } else {
    try {
      const patchedUserMail = await User.updateOne(
        { _id: userJWT._id },
        { $set: { mail: req.body.mail } }
      );
      res.json(patchedUserMail);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
})

// Password
router.patch('/update/password', jwtMethod.authenticateToken, async (req, res) => {
  const joiSchema = Joi.object().keys({
    password: Joi.string().required()
  })
  const userJWT = req.user
  if (joiSchema.validate(req.body).error) {
    res.status(400).send(joiSchema.validate(req.body).error.details);
  } else {
    try {
      const newPassword = await bcrypt.hash(req.body.password, 8);
      const patchedUserPassword = await User.updateOne(
        { _id: userJWT._id },
        { $set: { password: newPassword } }
      );
      res.json(patchedUserPassword);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
})

module.exports = router;
