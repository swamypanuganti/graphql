const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const groupSchema = require('../schemas/groupsSchema');

const router = express.Router();

// Define the route to handle groups GraphQL
router.use('/graphql', graphqlHTTP({
  schema: groupSchema,
  graphiql: true // GraphiQL enabled for testing
}));

module.exports = router;