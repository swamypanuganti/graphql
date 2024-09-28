const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID, GraphQLList, GraphQLSchema } = require('graphql');
const Groups = require('../models/groups');
const Users = require('../models/users');


// User Type (for admin reference in Group)
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      email: { type: GraphQLString }
    })
  });
  
// Groups Type
const groupType = new GraphQLObjectType({
  name: 'Groups',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    number_of_users: { type: GraphQLInt },
    group_admin: {
        type: UserType,
        resolve(parent, args) {
          // Populate group_admin_id with the actual user data
          return Users.findById(parent.group_admin);
        }
      },
  })
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    item: {
      type: groupType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Groups.findById(args.id);
      }
    },
    items: {
      type: new GraphQLList(groupType),
      resolve() {
        return Groups.find({});
      }
    }
  }
});

// Mutations for CRUD operations
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addItem: {
      type: groupType,
      args: {
        name: { type: GraphQLString },
        email:{ type: GraphQLString},
        number_of_users: { type: GraphQLInt },
        group_admin: { type: GraphQLString }
      },
      resolve(parent, args) {
        const item = new Groups({
          name: args.name,
          email: args.email,
          number_of_users: args.number_of_users,
          group_admin: args.group_admin
        });
        return item.save();
      }
    },
    updateItem: {
      type: groupType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        
        number_of_users: { type: GraphQLInt },
        group_admin: { type: GraphQLString }
      },
      resolve(parent, args) {
        return Groups.findByIdAndUpdate(
          args.id,
          { $set: { name: args.name,   email: args.email,number_of_users: args.number_of_users, group_admin: args.group_admin } },
          { new: true }
        );
      }
    },
    deleteItem: {
      type: groupType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Groups.findByIdAndDelete(args.id);
      }
    },
    patchItem: {
      type: groupType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        number_of_users: { type: GraphQLInt },
        group_admin: { type: GraphQLString }
      },
      resolve(parent, args) {
        const updateFields = {};
        if (args.name !== undefined) updateFields.name = args.name;
        if (args.number_of_users !== undefined) updateFields.number_of_users = args.number_of_users;
        if (args.group_admin !== undefined) updateFields.group_admin = args.group_admin;

        return Groups.findByIdAndUpdate(args.id, { $set: updateFields }, { new: true });
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
//     addItem(name: "testgroup",email:"test@mail.com", group_admin: "66f0427a7020a8a49dd85c3e", number_of_users:1) {
//       id
//       name
//     }
//   }
  
  
// getall
// query {
//     items {
//       id
//       name
//       number_of_users,
//       group_admin {
//       id
//         name
//       }

      
//     }
//   }

// getbyid
// query {
//     item(id: "66f0426b7020a8a49dd85c3a") {
//       id
//       name
//       number_of_users
//       group_admin
//     }
//   }
// updatebyid
// mutation {
//     updateItem(id: "66f0426b7020a8a49dd85c3a", name: "Updated L1aptop", group_admin: 6) {
//       id
//       name
//       group_admin
//     }
//   }
// deletebyID
// mutation {
//     deleteItem(id: "66f0426b7020a8a49dd85c3a") {
//       id
//     }
//   }