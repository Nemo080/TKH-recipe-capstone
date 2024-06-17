import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";


export default function(passport){
  passport.use(new JWTStrategy({
      //Get a JWT from the Bearer token header in request
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //Use this secret key to decrypt the token
      secretOrKey: process.env.SECRET_KEY,
    },
  async function(payload, done){
      try {
          done(null, {...payload})
      } catch(err){
          done(err, null);
      }
  }))
}

