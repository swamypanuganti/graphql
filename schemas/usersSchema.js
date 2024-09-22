const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID, GraphQLList, GraphQLSchema } = require('graphql');
const Users = require('../models/users');

// Users Type
const ItemType = new GraphQLObjectType({
  name: 'Users',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    item: {
      type: ItemType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Users.findById(args.id);
      }
    },
    items: {
      type: new GraphQLList(ItemType),
      resolve() {
        return Users.find({});
      }
    }
  }
});

// Mutations for CRUD operations
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addItem: {
      type: ItemType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        age: { type: GraphQLInt }
      },
      resolve(parent, args) {
        const item = new Users({
          name: args.name,
          email: args.email,
          age: args.age
        });
        return item.save();
      }
    },
    updateItem: {
      type: ItemType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        age: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return Users.findByIdAndUpdate(
          args.id,
          { $set: { name: args.name, email: args.email, age: args.age } },
          { new: true }
        );
      }
    },
    deleteItem: {
      type: ItemType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Users.findByIdAndDelete(args.id);
      }
    },
    patchItem: {
      type: ItemType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        age: { type: GraphQLInt }
      },
      resolve(parent, args) {
        const updateFields = {};
        if (args.name !== undefined) updateFields.name = args.name;
        if (args.email !== undefined) updateFields.email = args.email;
        if (args.age !== undefined) updateFields.age = args.age;

        return Users.findByIdAndUpdate(args.id, { $set: updateFields }, { new: true });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});

// post
// mutation {
//     addItem(name: "Laptopa11", email: "A new alaptop", age: 3) {
//       id
//       name
//     }
//   }# We
// getall
// query {
//     items {
//       id
//       name
//       email
//       age
//     }
//   }

// getbyid
// query {
//     item(id: "66f0426b7020a8a49dd85c3a") {
//       id
//       name
//       email
//       age
//     }
//   }
// updatebyid
// mutation {
//     updateItem(id: "66f0426b7020a8a49dd85c3a", name: "Updated L1aptop", age: 6) {
//       id
//       name
//       age
//     }
//   }
// deletebyID
// mutation {
//     deleteItem(id: "66f0426b7020a8a49dd85c3a") {
//       id
//     }
//   }