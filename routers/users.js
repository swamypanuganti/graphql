const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const userSchema = require('../schemas/usersSchema');

const router = express.Router();

// Define the route to handle users GraphQL
router.use('/graphql', graphqlHTTP({
  schema: userSchema,
  graphiql: true // GraphiQL enabled for testing
}));

module.exports = router;
