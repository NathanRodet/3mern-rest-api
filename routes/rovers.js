const express = require('express');
const router = express.Router();
const Rover = require('../models/Rovers');
const Joi = require('Joi');
const jwtMethod = require('../utils/jwt');

/* GET, POST, DELETE, UPDATE rovers. */

// GET ALL
router.get('', async (req, res) => {
  try {
    const offset = parseInt(req.query.offset) || 0;
    const limit = parseInt(req.query.limit) || 0;

    // // Sort : -1 (descending) 1 (ascending)
    var sortQuery = 1;
    // Sort by element (launch_date or name)
    var sortBy = "launch_date";

    if (req.query.sort === 'desc') {
      sortQuery = -1;
    } else if (req.query.sort === 'asc') {
      sortQuery = 1;
    }
    if (req.query.sortBy === 'launch_date') {
      sortBy = "launch_date";
    } else if (req.query.sortBy === "rover_name") {
      sortBy = "rover_name";
    }

    const rovers = await Rover.find()
      .select(['-__v'])
      .skip(offset)
      .limit(limit)
      .sort([[sortBy, sortQuery]])
    if (rovers[0] === undefined) {
      res.sendStatus(204)
    } else {
      res.json(rovers);
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// COUNT
router.get('/count', async (req, res) => {
  try {
    const roversCount = await Rover.count();
    res.json(roversCount);
  } catch (error) {
    res.status(500).json({ message: error });
  }
})

// GET BY roverId
router.get('/specific/rover/:roverId', async (req, res) => {
  try {
    const rover = await Rover.findById(req.params.roverId);
    res.json(rover);
  } catch (error) {
    res.status(500).json({ message: error });
  }
})

// GET BY userId
router.get('/specific/user/:userId', async (req, res) => {
  try {
    const roversByUserId = await Rover.find({ userId: req.params.userId });
    res.json(roversByUserId);
  } catch (error) {
    res.status(500).json({ message: error });
  }
})

// POST
router.post('/post', jwtMethod.authenticateToken, async (req, res) => {
  const dateUnix = Math.floor(new Date(req.body.launch_date).getTime() / 1000)
  const userJWT = req.user
  const newRover = new Rover({
    rover_name: req.body.rover_name.toLowerCase(),
    description: req.body.description,
    launch_date: dateUnix,
    is_success: req.body.is_success,
    construction: {
      date: req.body.construction.date,
      company: req.body.construction.company
    },
    image_link: req.body.image_link,
    userId: userJWT._id,
  });

  const joiSchema = Joi.object().keys({
    rover_name: Joi.string().required(),
    description: Joi.string().required(),
    launch_date: Joi.date().required(),
    is_success: Joi.boolean().required(),
    construction: Joi.object().keys({
      date: Joi.date().required(),
      company: Joi.string().required(),
    }).required(),
    image_link: Joi.string().required(),
  })

  if (joiSchema.validate(req.body).error) {
    res.status(400).send(joiSchema.validate(req.body).error.details);
  } else {
    try {
      const savedRover = await newRover.save();
      res.json(savedRover);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
});

// DELETE
router.delete('/delete/:roverId', jwtMethod.authenticateToken, async (req, res) => {
  const userJWT = req.user
  if (userJWT.isAdmin) {
    try {
      const removedRover = await Rover.deleteOne({ _id: req.params.roverId });
      res.json(removedRover);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  } else {
    res.status(401).json("You must be an admin")
  }
});

// PATCH
// rover_name
router.patch('/update/rover_name/:roverId', jwtMethod.authenticateToken, async (req, res) => {
  const joiSchema = Joi.object().keys({
    rover_name: Joi.string().required()
  })

  if (joiSchema.validate(req.body).error) {
    res.status(400).send(joiSchema.validate(req.body).error.details);
  } else {
    const userJWT = req.user
    if (userJWT.isAdmin) {
      try {
        const patchedRoverName = await Rover.updateOne(
          { _id: req.params.roverId },
          { $set: { rover_name: req.body.rover_name.toLowerCase() } }
        );
        res.json(patchedRoverName);
      } catch (error) {
        res.status(500).json({ message: error });
      }
    } else {
      res.status(401).json("You must be an admin")
    }

  }
})


// const userJWT = req.user
// if (userJWT.isAdmin) {

// } else {
//   res.status(401).json("You must be an admin")
// }


// description
router.patch('/update/description/:roverId', jwtMethod.authenticateToken, async (req, res) => {
  const joiSchema = Joi.object().keys({
    description: Joi.string().required()
  })

  if (joiSchema.validate(req.body).error) {
    res.status(400).send(joiSchema.validate(req.body).error.details);
  } else {
    const userJWT = req.user
    if (userJWT.isAdmin) {
      try {
        const patchedRoverDescription = await Rover.updateOne(
          { _id: req.params.roverId },
          { $set: { description: req.body.description } }
        );
        res.json(patchedRoverDescription);
      } catch (error) {
        res.status(500).json({ message: error });
      }
    } else {
      res.status(401).json("You must be an admin")
    }
  }
})
// launch_date
router.patch('/update/launch_date/:roverId', jwtMethod.authenticateToken, async (req, res) => {
  const joiSchema = Joi.object().keys({
    launch_date: Joi.string().required()
  })
  const dateUnix = Math.floor(new Date(req.body.launch_date).getTime() / 1000)

  if (joiSchema.validate(req.body).error) {
    res.status(400).send(joiSchema.validate(req.body).error.details);
  } else {
    const userJWT = req.user
    if (userJWT.isAdmin) {
      try {
        const patchedRoverLaunchDate = await Rover.updateOne(
          { _id: req.params.roverId },
          { $set: { launch_date: dateUnix } }
        );
        res.json(patchedRoverLaunchDate);
      } catch (error) {
        res.status(500).json({ message: error });
      }
    } else {
      res.status(401).json("You must be an admin")
    }
  }
})
// isSuccess
router.patch('/update/is_success/:roverId', jwtMethod.authenticateToken, async (req, res) => {
  const joiSchema = Joi.object().keys({
    is_success: Joi.boolean().required()
  })

  if (joiSchema.validate(req.body).error) {
    res.status(400).send(joiSchema.validate(req.body).error.details);
  } else {
    const userJWT = req.user
    if (userJWT.isAdmin) {
      try {
        const patchedRoverIsSuccess = await Rover.updateOne(
          { _id: req.params.roverId },
          { $set: { is_success: req.body.is_success } }
        );
        res.json(patchedRoverIsSuccess);
      } catch (error) {
        res.status(500).json({ message: error });
      }
    } else {
      res.status(401).json("You must be an admin")
    }
  }
})
// Construction
router.patch('/update/construction/:roverId', jwtMethod.authenticateToken, async (req, res) => {
  const joiSchema = Joi.object().keys({
    construction: Joi.object().required()
  })
  if (joiSchema.validate(req.body).error) {
    res.status(400).send(joiSchema.validate(req.body).error.details);
  } else {
    const userJWT = req.user
    if (userJWT.isAdmin) {
      try {
        const patchedRoverConstruction = await Rover.updateOne(
          { _id: req.params.roverId },
          {
            $set: {
              construction: {
                date: req.body.construction.date,
                company: req.body.construction.company,
              }
            }
          }
        );
        res.json(patchedRoverConstruction);
      } catch (error) {
        res.status(500).json({ message: error });
      }
    } else {
      res.status(401).json("You must be an admin")
    }
  }
})
// image_link
router.patch('/update/image_link/:roverId', jwtMethod.authenticateToken, async (req, res) => {
  const joiSchema = Joi.object().keys({
    image_link: Joi.string().required()
  })

  if (joiSchema.validate(req.body).error) {
    res.status(400).send(joiSchema.validate(req.body).error.details);
  } else {
    const userJWT = req.user
    if (userJWT.isAdmin) {
      try {
        const patchedRoverImageLink = await Rover.updateOne(
          { _id: req.params.roverId },
          { $set: { image_link: req.body.image_link } }
        );
        res.json(patchedRoverImageLink);
      } catch (error) {
        res.status(500).json({ message: error });
      }
    } else {
      res.status(401).json("You must be an admin")
    }
  }
})


module.exports = router;
