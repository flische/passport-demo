const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (db) => {
    const users = db.define('users', {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        id: {
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        password: Sequelize.STRING
    }, {
        hooks: {
            beforeCreate: async (user) => {
                const hash = await bcrypt.hash(user.password, 10);

                user.password = hash;
                user.email = user.email.toLowerCase();
            }
        }
    });

    users.prototype.comparePasswords = function(candidatePassword){
        return Promise((resolve, reject) => {
            bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
                if(err){
                    reject(err);
                }
                resolve(isMatch);
            });
        });
    }

    return users;
}
