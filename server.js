const express = require('express');
const connectDB = require('./config/db');

const app = express();
connectDB();

app.use(express.json());
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server connected on port ' + PORT));

// Routes
app.use('/api/users', require('./routes/api/Users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/note', require('./routes/api/note'));
app.use('/api/notebook', require('./routes/api/notebook'));

