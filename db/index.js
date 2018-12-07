const Sequelize = require('sequelize');

const db = new Sequelize('passport-demo', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

db.authenticate().then(() => {
    console.log('Connected to MySQL DB');
}).catch(() => {
    console.log('Error connecting to MySQL DB');
});

module.exports = {
    db: db,
    users: require('./user')(db)
};

db.sync();
