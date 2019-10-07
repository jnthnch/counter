GRIO counter app
===

### Start

1. Create a .env file in the root directory with `SECRET_TOKEN = 'anyText'`

2. Install dependencies, `npm install`

3. Compile, `npm run build`

4. Start server, `npm run server` and visit `localhost:3000`

5. Log in with any username and password. Dummy user is created on server. 

---

### Description

This app uses tokens to authorize users at login. Users can then query the server to increment the counter (processed on the server). Users have the option to confirm or cancel the query before the request is made.
