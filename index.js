const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 9000;

const app = express();

require('./db');

require('./services/passport');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1>App is working!</h1>');
});

app.listen(PORT, () => {
    console.log('Server running on PORT:', PORT);
}).on('error', (err) => {
    console.log('Server listen error. You probably already have a server running on this port');
});
