# supinfo-3mern

# Features
You need to develop multiples functionalities

- User management solution
- Create, Read, Update, Delete user
- User is at least {id, email, pseudo, password, isAdmin}
- You can read information about all users (except the password) if logged
- You can create a new user even without being logged
- You can only update yourself (other users cannot update you EXCEPT if admin)
- You can only delete yourself (other users cannot delete you)
- Authentication need to be setup (Different solutions can be used, jwt token is recommended (see tips for more information))
- All Read endpoints are be non-logged/anonymous
- All Write endpoints need the request to be authenticated (stateless)
- A rover endpoint
- List all rovers and allow you to sort rover by date, name with a limit (default limit is 10 but can be changed with a parameter)
- Create, Read, Update, Delete rover
- Rover is at least {id, name, launch_date, construction_date, constructor, image}. When a rover is created you need to check the size of the image and resize it if needed (200*200px)
- Only an admin can delete a rover
- A mission endpoint
- List all missions and allow you to sort mission by dates, name, country
- Create, Read, Update, Delete mission
- Mission is at least {id, country, start_date, end_date, rovers}. A mission can use multiples rovers BUT a rover cannot be in two missions at a time
- Only an admin OR the mission author can delete a mission
- It is important to provide good feedback to the users using the API so you will need to implement a simple type solution/validation like Joi or Yup or AJV
- On the same note, you need to use the valid HTTP code when returning information to the user
- Testing is important. You are required to implement a few tests on your project. Focus on testing the core functionalities

# Tips
 
Authentication:

- You do not need a full OAuth solution, just a way to generate a token
- You can use PassportJS and the strategy Passport-local-mongoose
- To test a jwt token you can use jwt.io

Validation/type solution:

- Joi, Yup and AJV are working almost in a same way
- Only test the users input
- It can be interesting to build a middleware for that !

Documentation:

- The documentation can be based on swagger/openapi standard
- For an easy writing your can use editor.swagger.io
- Try to define the endpoint with both the input value (url, body…) and the possibles returned values (success, error…)

# Deliverables

Do .
A whole documentation and request to test the API is garanteed and will be found on postman json file after import in postman client.

# Requirements

- node.js
- postman (To import and read the documentation)

# Dependencies

> "bcryptjs": "^2.4.3"

> "body-parser": "^1.19.2"

> "cors": "^2.8.5"

> "debug": "~2.6.9"

> "dotenv": "^16.0.0"

> "express": "~4.16.1"

> "joi": "^17.6.0"

> "jsonwebtoken": "^8.5.1"

>  "mongoose": "^6.2.9"

# Setup

- Back-end :
First of all, you should use 'npm install' to setup dependancies.
After, you have to make a .env file and pass somes informations in it :
  - You can find the db string on mongodb website.
  - Make sure this port is the the same used by the front-end. (react got 3000 by default).
Example :

```
SERVER_PORT = "3001"
DB_CONNECTION_STRING="mongodb+srv://<login>:<secret>@azcluster0.hhnbp.mongodb.net/<name>?retryWrites=true&w=majority" 
SECRET_TOKEN = "<your_secret_token>"
SECRET_TOKEN_DURATION = "<your_duration>"
```

# Launch the app

In development mode (using nodemon) :
- npm start
In production mode :
- npm run-script run
