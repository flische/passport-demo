const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const { users } = require('../db');

const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, async (email, password, done) => {
    try {
        email = email.toLowerCase();

        const foundUser = await users.findOne({
            where: {
                email: email
            }
        });

        if(!foundUser) return done(null, false);

        const isMatch = foundUser.comparePasswords(password);

        if(!isMatch) return done(null, false);

        done(null, foundUser);
    } catch (err){
        done(err);
    }
});
