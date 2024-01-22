# 3mern - REST API to manage launch, rover and more...

Rest API build with Nodejs and Expressjs.

## Deliverables

A whole documentation and request to test the API is garanteed and will be found on postman json file after import in postman client.

## Requirements

- node.js
- postman (To import and read the documentation)


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
