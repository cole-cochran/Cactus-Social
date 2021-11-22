const router = require("express").Router();
const db = require('../../models')
const connectEnsureLogin = require('connect-ensure-login'); //authorization


//
// app.get('/dashboard', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
//     res.send(`Hello ${req.user.username}. Your session ID is ${req.sessionID} 
//      and your session expires in ${req.session.cookie.maxAge} 
//      milliseconds.<br><br>
//      <a href="/logout">Log Out</a><br><br>
//      <a href="/secret">Members Only</a>`);
//   });
// app.post('/login', passport.authenticate('local', { failureRedirect: '/' }),  function(req, res) {
// 	console.log(req.user)
// 	res.redirect('/dashboard');
// });
/*get a list of all threads to populate main page */
router.get('/thread', connectEnsureLogin.ensureLoggedIn(),async(req,res)=>{
    try{
        const resData=await db.Thread.find({})
        if(!resData){
            console.log('shitsnack')
            return
        }
        res.send(resData)
    }catch(err){
        res.send(err)
    }

})


// const query  = Kitten.where({ color: 'white' });
// query.findOne(function (err, kitten) {
//   if (err) return handleError(err);
//   if (kitten) {
//     // doc may be null if no document matched
//   }
// });

router.get('/thread/:id', async (req,res)=>{
    try{

        let resData=await db.Thread.findById({_id:req.params.id})
        console.log(resData)
        let posts=resData.populate("posts")
        let pins=resData.populate("pins")
        let events=resData.populate("events")
        let moderator=resData.populate("moderator")
        let members=resData.populate("members")

      const threadPage=posts+pins+events+moderator+members
        // .populate("posts")
        // .populate("pins")
        // .populate("events")
        // .populate("moderator")
        // .populate("members")

// if(resData){

//}

        res.status(200).json(threadPage);
    }catch(err){
        res.status(400).json(err);
    }
   
});

router.post('/addThread', async({body},res)=>{
try{
const resData=await db.Thread.create(body.title)
/**conditionally use insertMany to add users */
res.status(200).json(resData)
}catch(err){
res.status(400).json(err)
}
});
//db.Workout.findOneAndUpdate({ _id: req.params.id }, { $push: { exercises: req.body } },{new:true})
router.post('/api/addThreadMember',async(req,res)=>{
    try{
        const resData=await db.Thread.insertOne({},{$push:{members: req.body}},{new:true})
        res.status(200).json(resData)
    }catch(err){
        res.status(400).json(err)
    }


});

module.exports=router