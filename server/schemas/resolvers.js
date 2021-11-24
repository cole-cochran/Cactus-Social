const { User, Comment, Post, Thread, Tech, Event } = require('../models/index');

const resolvers = {
	Query: {
        threads: async () => {
            return await Thread.find({}).populate('posts').populate('events').populate('members').populate('moderator');
        },
        comments: async (parent, args) => {
            return await Post.findById(args.postId).populate('comments').populate('author')
        }
    },
    Mutation: {

    }
}

module.exports = resolvers;