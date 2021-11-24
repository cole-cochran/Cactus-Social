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
module.exports = resolvers;