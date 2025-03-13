require('dotenv').config();
const express = require('express')
const cors = require('cors');
const { ConnectDB } = require('./src/database');
const AuthRoutes = require('./src/routes/auth')
const TodoRoutes = require('./src/routes/todo')

const app = express();
app.use(express.json());
app.use(cors());

ConnectDB();

app.use('/api/auth', AuthRoutes);
app.use('/api/todo', TodoRoutes);

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));