const express=require('express');
const router=express.Router();
const campgrounds=require('../controllers/campgrounds')
const catchAsync=require('../utils/catchAsync')
const ExpressError=require('../utils/ExpressError');
const Campground=require('../models/campground');
const multer=require('multer');
const upload=multer({dest:'uploads/'});

const {isLoggedIn,isAuthor,validateCampground}=require('../middleware');

router.get('/',catchAsync(campgrounds.index));
router.get('/new',isLoggedIn,campgrounds.renderForm)
//router.post('/',isLoggedIn,validateCampground,catchAsync(campgrounds.createCampground));
router.post('/',upload.single('image'),catchAsync(async(req,res)=>{
    res.send(req.body)
    res.send(req.file)
}))

router.get('/:id',catchAsync(campgrounds.showCampground));
router.get('/:id/edit',isLoggedIn,isAuthor,catchAsync(campgrounds.renderEditForm));
router.put('/:id',isLoggedIn,validateCampground,catchAsync(campgrounds.updateCampground));
router.delete('/:id',isLoggedIn,catchAsync(campgrounds.deleteCampground));
module.exports=router;