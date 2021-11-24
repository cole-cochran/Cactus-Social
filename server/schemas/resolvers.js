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
        
    },
    Mutation: {

    }
}

module.exports = resolvers;