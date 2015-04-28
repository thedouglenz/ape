/*
 * Passport configuration
 */

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

var User = require('../../models/user').User;

passport.use(new LocalStrategy(
            function(username, password, done) {
                var errMessage = 'Invalid username or password';
                User.find({ where: { username: username }}).then(function(user) {
                    if(!user) {
                        return done(null, false, { message: errMessage });
                    }
                    if (!user.validatePassword(password)) {
                        return done(null, false, { message: errMessage });
                    }
                    return done(null, user);
                });
            })
        );

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findOne(id).then(function(user) {
        done(null, user);
    });
});

module.exports = {
    passport: passport
}
