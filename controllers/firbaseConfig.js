require("dotenv").config()
module.exports.firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  messagingSenderId:process.env.messagingSenderId ,
  appId: process.env.appId,
  measurementId: process.env.measurementId
}