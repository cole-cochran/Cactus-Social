const router = require("express").Router();
const db = require('../../models')



router.get('/api/thread', async (req,res)=>{
    try{
        const resData=await db.Thread.find({})

        .populate("posts")
        .populate("pins")
        .populate("events")
        .populate("moderator")
        .populate("members")

// if(resData){

//}

        res.status(200).json(resData);
    }catch(err){
        res.status(400).json(err);
    }
   
});

router.post('/api/addThread', async({body},res)=>{
try{
const resData=await db.Thread.create(body.title)

res.status(200).json(resData)
}catch(err){
res.status(400).json(err)
}
});
//db.Workout.findOneAndUpdate({ _id: req.params.id }, { $push: { exercises: req.body } },{new:true})
router.put('/api/addThreadMember',async(req,res)=>{
    try{
        const resData=await db.Thread.updateOne({},{$push:{members: req.body}},{new:true})
        res.status(200).json(resData)
    }catch(err){
        res.status(400).json(err)
    }


});

module.exports=router