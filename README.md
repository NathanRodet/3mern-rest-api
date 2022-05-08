# supinfo-3mern

## Deliverables

Do .
A whole documentation and request to test the API is garanteed and will be found on postman json file after import in postman client.

## Requirements

- node.js
- postman (To import and read the documentation)

## Dependencies

> "bcryptjs": "^2.4.3"

> "body-parser": "^1.19.2"

> "cors": "^2.8.5"

> "debug": "~2.6.9"

> "dotenv": "^16.0.0"

> "express": "~4.16.1"

> "joi": "^17.6.0"

> "jsonwebtoken": "^8.5.1"

>  "mongoose": "^6.2.9"

## Setup

- Back-end :
First of all, you should use 'npm install' to setup dependancies.
After, you have to make a .env file and pass somes informations in it :
  - You can find the db string on mongodb website.
  - Make sure this port is the the same used by the front-end. (react got 3000 by default).
  - 
### Example :

```
SERVER_PORT = "3001"
DB_CONNECTION_STRING="mongodb+srv://<login>:<secret>@azcluster0.hhnbp.mongodb.net/<name>?retryWrites=true&w=majority" 
SECRET_TOKEN = "<your_secret_token>"
SECRET_TOKEN_DURATION = "<your_duration>"
```

## Launch the app

In development mode (using nodemon) :
- npm start
In production mode :
- npm run-script run
