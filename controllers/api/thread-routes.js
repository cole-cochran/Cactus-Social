const router = require("express").Router();
const db = require('../../models')



router.get('/', async (req,res)=>{
    try{
        const resData=await db.Thread.find({})
        .populate("posts")
        .populate("pins")
        .populate("events")
        .populate("moderator")
        .populate("members")

        if(resData.length){
            console.log('fuckupsgonnafuckup');
        }
        res.status(200).json(resData);
    }catch(err){
        res.status(400).json(err);
    }
   
});

router.post('/addThread', async({body},res)=>{
try{
const resData=await db.Thread.create(body)
if(resData.length){
console.log('fuck nougat')
}
res.status(200).json(resData)
}catch(err){
res.status(400).json(err)
}
});

router.put('/addUser',async(req,res)=>{
const resData=await db.Thread.Up
});

module.exports=router