on your terminal or power shell type :-  git clone https://github.com/SwalehaZarekari/MERN-Stack-Student-Teacher-App-final/tree/main

Or else go to code and download zip file after extracting it , open it into vs code

then in your terminal in root file type : npm i

then type cd client and press enter  in client folder again  type : npm i

 After that in .env file 
 Add your port number eg-9000
  PORT=""   // and copy this same PORT number in server.js file and in client package.json file where proxy: http://loac;host number written
  
  NODE_ENV=development
  
 your mongodb conncetion url
 MONGO_URL=""

 Write any String with number
 JWT_SECRET=""

 then in terminal in root folder type:  npm run dev

 
And yup your client and server will start concurrently

