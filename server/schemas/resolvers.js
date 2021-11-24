const { User } = require('../models');
const Thread = require('../models/threads');

const resolvers = {
  Query: {
    users: async () => {
      return await User.find({}).populate('threads').populate({
        path:'posts',
        populate:'thread'
      })
      
    },
    threads:async ()=>{
      return await Thread.find({}).populate('members')
    }



  
}
}
// schools: async () => {
//     return await School.find({}).populate('classes').populate({
//       path: 'classes',
//       populate: 'professor'
//     });
//   },
const { User, Comment, Post, Thread, Tech, Event } = require('../models/index');

const resolvers = {
	Query: {
        // threads: async () => {
        //     return await Thread.find({}).populate('posts').populate('events').populate('members').populate('moderator');
        // },
        comments: async (parent, args) => {
            return await Post.findById(args.postId).populate('comments').populate('author')
        }
        
    },
    Mutation: {

    }
}

module.exports = resolvers;