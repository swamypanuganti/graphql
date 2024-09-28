const express = require('express');
const mongoose = require('mongoose');
// const schema = require('./schemas/usersSchema');
require('dotenv').config();
const cors = require('cors');
const userRoutes = require('./routers/users');
const groupRoutes = require('./routers/groups');


const app = express();
const server = require('http').createServer(app);
app.use(express.json());
app.use(cors());
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));
  // const dbConnection = db.dbCon();
  app.use(async (req, res, next) => {
    try {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, token');
      res.setHeader('Access-Control-Expose-Headers', 'X-Requested-With, content-type, token');
      res.setHeader('Access-Control-Allow-Credentials', true);
      // res.header('token', token);
      next();
    } catch (error) {
      console.log('========>>>>>> Error in webserver support  ======>>>>>>', error);
    }
  });
  app.use('/api/users', userRoutes);  // http://localhost:3000/api/users/graphql
  app.use('/api/groups', groupRoutes);



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
