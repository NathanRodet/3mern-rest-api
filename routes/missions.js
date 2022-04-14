const express = require('express');
const router = express.Router();
const Mission = require('../models/Missions');
const Joi = require('Joi');
const jwtMethod = require('../utils/jwt');

/* GET, POST, DELETE, UPDATE missions. */

// GET ALL
router.get('', async (req, res) => {
  try {
    const missions = await Mission.find().select(['-__v']);
    if (missions[0] === undefined) {
      res.sendStatus(204)
    } else {
      res.json(missions);
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get('/count', async (req, res) => {
  try {
    const missionsCount = await Mission.count();
    res.json(missionsCount);
  } catch (error) {
    res.status(500).json({ message: error });
  }
})

// GET BY userId
router.get('/specific/user/:userId', async (req, res) => {
  try {
    const missionsByUserId = await Mission.find({ userId: req.params.userId });
    if (missionsByUserId.length === 0) {
    }
    res.json(missionsByUserId);
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

// POST
router.post('/post', jwtMethod.authenticateToken, async (req, res) => {
  const userJWT = req.user
  const newMission = new Mission({
    ...req.body,
    userId: userJWT._id,
  });

  const joiSchema = Joi.object().keys({
    mission_name: Joi.string().required(),
    country: Joi.string().required(),
    start_date: Joi.string().required(),
    end_date: Joi.string().required(),
    roverId: Joi.array().required(),
  })

  if (joiSchema.validate(req.body).error) {
    res.status(400).send(joiSchema.validate(req.body).error.details);
  } else {
    try {
      const matchingRover = await Mission.find({ 'roverId': { $in: req.body.roverId } });
      const isDefined = matchingRover[0]
      if (isDefined === undefined) {
        try {
          const savedMission = await newMission.save();
          res.json(savedMission);
        } catch (error) {
          res.status(500).json({ message: error });
        }
      } else {
        res.status(400).json("Your rover is already used")
      }
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }
});

// DELETE
router.delete('/delete/:missionId', jwtMethod.authenticateToken, async (req, res) => {
  try {
    const removedMission = await Mission.findOneAndDelete({ _id: req.params.missionId });
    const userJWT = req.user
    if (removedMission) {
      if (userJWT.isAdmin || userJWT._id == removedMission.userId) {
        res.json(removedMission);
      } else {
        res.status(401).json("You must be an admin or the author of the mission")
      }
    } else {
      res.status(400).json("Mission does not exist")
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// // PATCH
// mission_name
router.patch('/update/mission_name/:missionId', jwtMethod.authenticateToken, async (req, res) => {
  const joiSchema = Joi.object().keys({
    mission_name: Joi.string().required()
  })
  if (joiSchema.validate(req.body).error) {
    res.status(400).send(joiSchema.validate(req.body).error.details);
  } else {
    try {
      const userJWT = req.user
      const patchedMissionName = await Mission.findByIdAndUpdate(
        { _id: req.params.missionId },
        { $set: { mission_name: req.body.mission_name } }
      );
      if (userJWT.isAdmin || userJWT._id == patchedMissionName.userId) {
        try {
          res.json(patchedMissionName.mission_name);
        } catch (error) {
          res.status(500).json({ message: error });
        }
      } else {
        res.status(401).json("You must be an admin or the author of the mission")
      }
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }
})
// country
router.patch('/update/country/:missionId', jwtMethod.authenticateToken, async (req, res) => {
  const joiSchema = Joi.object().keys({
    country: Joi.string().required()
  })

  if (joiSchema.validate(req.body).error) {
    res.status(400).send(joiSchema.validate(req.body).error.details);
  } else {
    try {
      const userJWT = req.user
      const patchedMissionCountry = await Mission.findByIdAndUpdate(
        { _id: req.params.missionId },
        { $set: { country: req.body.country } }
      );
      if (userJWT.isAdmin || userJWT._id == patchedMissionCountry.userId) {
        try {
          res.json(patchedMissionCountry.country);
        } catch (error) {
          res.status(500).json({ message: error });
        }
      } else {
        res.status(401).json("You must be an admin or the author of the mission")
      }
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }
})
// start_date
router.patch('/update/start_date/:missionId', jwtMethod.authenticateToken, async (req, res) => {
  const joiSchema = Joi.object().keys({
    start_date: Joi.string().required()
  })

  if (joiSchema.validate(req.body).error) {
    res.status(400).send(joiSchema.validate(req.body).error.details);
  } else {
    try {
      const userJWT = req.user
      const patchedMissionStartDate = await Mission.findByIdAndUpdate(
        { _id: req.params.missionId },
        { $set: { start_date: req.body.start_date } }
      );
      if (userJWT.isAdmin || userJWT._id == patchedMissionStartDate.userId) {
        try {
          res.json(patchedMissionStartDate.start_date);
        } catch (error) {
          res.status(500).json({ message: error });
        }
      } else {
        res.status(401).json("You must be an admin or the author of the mission")
      }
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }
})
// end_date
router.patch('/update/end_date/:missionId', jwtMethod.authenticateToken, async (req, res) => {
  const joiSchema = Joi.object().keys({
    end_date: Joi.string().required()
  })
  if (joiSchema.validate(req.body).error) {
    res.status(400).send(joiSchema.validate(req.body).error.details);
  } else {
    try {
      const patchedMissionEndDate = await Mission.findByIdAndUpdate(
        { _id: req.params.missionId },
        { $set: { end_date: req.body.end_date } }
      );
      const userJWT = req.user
      if (userJWT.isAdmin || userJWT._id == patchedMissionEndDate.userId) {
        try {
          res.json(patchedMissionEndDate.end_date);
        } catch (error) {
          res.status(500).json({ message: error });
        }
      } else {
        res.status(401).json("You must be an admin or the author of the mission")
      }
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }
})

module.exports = router;