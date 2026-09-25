// require('dotenv').config()
// const jwt=require('jsonwebtoken')
// SECRET_KEY="4e7b6b94b410e034b430ee6cbc02c28e54cefd823d5f41e224459a89dcf9784e6462776c0a5cc13ecbeb25cd3ac3608de58ae817cbcf5cbffe05bfb7a6f3589e"

// exports.generateToken=(payload,passwordReset=false)=>{
//     return jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:passwordReset?process.env.PASSWORD_RESET_TOKEN_EXPIRATION:process.env.LOGIN_TOKEN_EXPIRATION})
// }


require('dotenv').config();
const jwt = require('jsonwebtoken');

const SECRET_KEY = "4e7b6b94b410e034b430ee6cbc02c28e54cefd823d5f41e224459a89dcf9784e6462776c0a5cc13ecbeb25cd3ac3608de58ae817cbcf5cbffe05bfb7a6f3589e";

exports.generateToken = (payload, passwordReset = false) => {
  return jwt.sign(payload, SECRET_KEY, {
    expiresIn: passwordReset
      ? process.env.PASSWORD_RESET_TOKEN_EXPIRATION || "15m"
      : process.env.LOGIN_TOKEN_EXPIRATION || "1h",
  });
};
