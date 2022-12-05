const { User, Thought } = require('../models');

const resolvers = {
    Query: {
        // methods below need to match the name of the query or mutation they are resolving
        thoughts: async (parent, { username }) => {
            // check if username exists, if it does set params to an object with a username key set to that value. If not, return empty object
            const params = username ? { username } : {};
            // perform find() method on Thought model and return data in descending order
            return Thought.find().sort({ createdAt: -1 });
        },
        
        thought: async (parent, { _id }) => {
            return Thought.findOne({ _id });
        },

        // get all users
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('friends')
                .populate('thoughts');
        },

        // get a user by username
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('friends')
                .populate('thoughts');
        },
    }
}

module.exports = resolvers;