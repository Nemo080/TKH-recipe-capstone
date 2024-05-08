import { Strategy, ExtractJwt } from "passport-jwt";

export default function setupJWTStrategy(passport) {
  passport.use(
    new Strategy(
      {
        //Get a JWT from the Bearer token header in request
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        //Use this secret key to decrypt the token
        secretOrKey: "thisIsASuperSecretKey",
      },
      function (payload, done) {
        try {
          //If the user object exists in the payload, return it to passport using done
          return done(null, payload.user);
        } catch (e) {
          //If above does not work, return an error
          return done(e, null);
        }
      }
    )
  );
}