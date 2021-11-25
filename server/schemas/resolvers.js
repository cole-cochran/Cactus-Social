const { User,Thread,Post,Comment,Event,Tech } = require('../models');


// schools: async () => {
//     return await School.find({}).populate('classes').populate({
//       path: 'classes',
//       populate: 'professor'
//     });
//   },
// const { User, Comment, Post, Thread, Tech, Event } = require('../models/index');

const resolvers = {
	Query: {
        // threads: async () => {
        //     return await Thread.find({}).populate('posts').populate('events').populate('members').populate('moderator');
        // },
        post: async (parent, args) => {
            return await Post.findById(args.postId).populate('comments').populate('author')
        },
        users: async () => {
          return await User.find({}).populate('threads')
          
        },
        threads:async ()=>{
          return await Thread.find({}).populate('members')
        }
    },
    Mutation: {

    }
}

module.exports = resolvers;