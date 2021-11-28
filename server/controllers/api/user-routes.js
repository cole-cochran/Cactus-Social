// const path =require('path')
// const router=require('express').Router()
// const mongoose = require('mongoose');
// const db = require('../../models')
// const passport = require('passport');  // authentication
// // const connectEnsureLogin = require('connect-ensure-login');

// router.post('/',async({body},res)=>{
//         await db.User.save(body,(reqError,data)=>{
//             if(reqError){
//             res.status(404).json(reqError)
//             }else{
//                 req.session.save(() => {
//                     req.session.user_id = userData.id;
//                     req.session.logged_in = true;
              
//                     res.status(200).json(userData);
//                   });
//                 console.log(data)
//                 res.status(200).send(data)
//             }
//         })
    
// });
// router.post('/login', passport.authenticate('local', { failureRedirect: '/' }),  function(req, res) {
//     //console.log(failureRedirect)
// 	console.log(req.user)
//     console.log(res)
// 	res.redirect('/login');
// });

// // router.post('/login',async(req,res)=>{
// // try{
// // const resData=await db.User.findOne({email:req.body.email})

// // const goodPass=await resData.comparePassword(resData.password)
// // if(!goodPass){
// //     res.status(404).send({message:'wron password cunt'})
// //     return
// // }
// // res.status(200).send(resData)

// // }catch(err){
// //     res.status(400).json(err)
// // }
// //  });



// // router.post('/logout',(req,res)=>{
// //     try{

// //     }catch(err){

// //     }
// // })




// module.exports=router