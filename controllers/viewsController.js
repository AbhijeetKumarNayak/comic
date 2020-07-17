const Comic = require('../models/comicModel');
const crypto = require('crypto');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const APIFeatures=require('../utils/apiFeatures');
const router = require('../routes/viewRoutes');
const Review = require('../models/reviewModel');
const mongoose = require('mongoose');


const ITEMS_PER_PAGE = 10;

exports.getProducts = catchAsync(async(req, res, next) => {
  const page = +req.query.page || 1;
  let totalItems;


  let totalodia=0;
  Comic.countDocuments({ category:"odia" }, function(err, result) {
    totalodia=result
  });
  const featuresodia = new APIFeatures(Comic.where('category').in(['odia']));
  const odia= await featuresodia.query;
  let odiai;
  let odiag;
  let odiak;
  let odiap=new Array(odia.length);
  let odiaresult;
  for(odiai=0;odiai<odia.length;odiai++){
    odiag=odia[odiai];
    odiak=odiag.subcategory;
    odiap[odiai]=odiak;
  }
  function removeDuplicates(data){
    return data.filter((value,index)=>data.indexOf(value)===index);
  }
  odiaresult=removeDuplicates(odiap);

  let totalenglish=0;
  Comic.countDocuments({ category:"english" }, function(err, result) {
    totalenglish=result
  });
  const featuresenglish = new APIFeatures(Comic.where('category').in(['english']));
  const english= await featuresenglish.query;
  let englishi;
  let englishg;
  let englishk;
  let englishp=new Array(english.length);
  let englishresult;
  for(englishi=0;englishi<english.length;englishi++){
    englishg=english[englishi];
    englishk=englishg.subcategory;
    englishp[englishi]=englishk;
  }
  function removeDuplicates(data){
    return data.filter((value,index)=>data.indexOf(value)===index);
  }
  englishresult=removeDuplicates(englishp);

  let totalhindhi=0;
  Comic.countDocuments({ category:"hindhi" }, function(err, result) {
    totalhindhi=result
  });
  const featureshindhi = new APIFeatures(Comic.where('category').in(['hindhi']));
  const hindhi= await featureshindhi.query;
  let hindhii;
  let hindhig;
  let hindhik;
  let hindhip=new Array(hindhi.length);
  let hindhiresult;
  for(hindhii=0;hindhii<hindhi.length;hindhii++){
    hindhig=hindhi[hindhii];
    hindhik=hindhig.subcategory;
    hindhip[hindhii]=hindhik;
  }
  function removeDuplicates(data){
    return data.filter((value,index)=>data.indexOf(value)===index);
  }
  hindhiresult=removeDuplicates(hindhip);



  Comic.find()
    .countDocuments()
    .then(numProducts => {
      totalItems = numProducts;
      return Comic.find()
      .sort('-createdAt')
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);
    })
    .then(products => {
      res.render('overview', {
        prods: products,
        title: 'overview',
        odia:odiaresult,
        totalodia:totalodia,
        english:englishresult,
        totalenglish:totalenglish,
        hindhi:hindhiresult,
        totalhindhi:totalhindhi,
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
});

const SEARCH_PER_PAGE = 10;
exports.getcomics = catchAsync(async (req, res, next) => {
const page = +req.query.page || 1;
  let totalItems;
  let totalodia;
  Comic.count({ category:"odia" }, function(err, result) {
    totalodia=result
  });
  const featuresodia = new APIFeatures(Comic.where('category').in(['odia']));
  const odia = await featuresodia.query;
  queryStr = req.query.id;
  Comic.find({ title: { $regex: queryStr, $options: "i" } })
    .countDocuments()
    .then(numProducts => {
      totalItems = numProducts;
      if(!numProducts){
        return next(new AppError('Comic Not Found', 404));
      }
      return Comic.find({ title: { $regex: queryStr, $options: "i" } })
      .sort('-createdAt')
        .skip((page - 1) * SEARCH_PER_PAGE)
        .limit(SEARCH_PER_PAGE);
    })
    .then(products => {
      res.render('overview', {
        prods: products,
        title: 'overview',
        odia:odia,
        totalodia:totalodia,
        currentPage: page,
        hasNextPage: SEARCH_PER_PAGE * page < totalItems,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems / SEARCH_PER_PAGE)
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });

});
exports.allcomics =catchAsync(async(req, res,next) => {
  const features = new APIFeatures(Comic.where('category').in([req.params.slug]), req.query)
  .filter()
  .sort()
  .limitFields()
  .paginate();
  const allcomic = await features.query;
  // console.log(allbook.category[0]);
  res.status(200).render('allbooks', {
    title: `${allbook.category} Comic`,
    allcomic
  });
});

exports.getComic = catchAsync(async (req, res, next) => {
  // 1) Get the data, for the requested tour (including reviews and guides)
  const comic = await (await Comic.findOne({ slug: req.params.slug }));
  if (!comic) {
    return next(new AppError('There is no comic with that name.', 404));
  }


  const reviewapi= new APIFeatures(Review.where('comic').in([req.params.slug]));
  const review = await reviewapi.query;
  if (!review) {
    return next(new AppError('There is no review with that comic.', 404));
  }

  

  let totalodia=0;
  Comic.countDocuments({ category:"odia" }, function(err, result) {
    totalodia=result
  });
  const featuresodia = new APIFeatures(Comic.where('category').in(['odia']));
  const odia= await featuresodia.query;
  let odiai;
  let odiag;
  let odiak;
  let odiap=new Array(odia.length);
  let odiaresult;
  for(odiai=0;odiai<odia.length;odiai++){
    odiag=odia[odiai];
    odiak=odiag.subcategory;
    odiap[odiai]=odiak;
  }
  function removeDuplicates(data){
    return data.filter((value,index)=>data.indexOf(value)===index);
  }
  odiaresult=removeDuplicates(odiap);

  let totalenglish=0;
  Comic.countDocuments({ category:"english" }, function(err, result) {
    totalenglish=result
  });
  const featuresenglish = new APIFeatures(Comic.where('category').in(['english']));
  const english= await featuresenglish.query;
  let englishi;
  let englishg;
  let englishk;
  let englishp=new Array(english.length);
  let englishresult;
  for(englishi=0;englishi<english.length;englishi++){
    englishg=english[englishi];
    englishk=englishg.subcategory;
    englishp[englishi]=englishk;
  }
  function removeDuplicates(data){
    return data.filter((value,index)=>data.indexOf(value)===index);
  }
  englishresult=removeDuplicates(englishp);

  let totalhindhi=0;
  Comic.countDocuments({ category:"hindhi" }, function(err, result) {
    totalhindhi=result
  });
  const featureshindhi = new APIFeatures(Comic.where('category').in(['hindhi']));
  const hindhi= await featureshindhi.query;
  let hindhii;
  let hindhig;
  let hindhik;
  let hindhip=new Array(hindhi.length);
  let hindhiresult;
  for(hindhii=0;hindhii<hindhi.length;hindhii++){
    hindhig=hindhi[hindhii];
    hindhik=hindhig.subcategory;
    hindhip[hindhii]=hindhik;
  }
  function removeDuplicates(data){
    return data.filter((value,index)=>data.indexOf(value)===index);
  }
  hindhiresult=removeDuplicates(hindhip);

 

  // 2) Build template
  // 3) Render template using data from 1)
  res.status(200).render('content', {
    title: `${comic.title}`,
    comic,
    review,
    odia:odiaresult,
    totalodia:totalodia,
    english:englishresult,
    totalenglish:totalenglish,
    hindhi:hindhiresult,
    totalhindhi:totalhindhi
  });
});
exports.createpost= (req,res) =>{
  res.status(200).render('createpost', {
    title:'createpost'
  });
};
exports.createuser= (req,res) =>{
  console.log("get");
  res.status(200).render('createuser', {
    title:'createuser'
  });
};
exports.getdeleteuser = (req,res) =>{
  res.status(200).render('deleteuser',{
    title:'deleteuser&updateuser'

  });
};
exports.getdeletepost = (req,res) =>{
  res.status(200).render('deletepost',{
    title:'deletepost'

  });
};



exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account'
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account'
  });
};

exports.reset=(req, res) => {
  res.status(200).render('reset',{
    title: 'ResetMail'
  })
}
exports.recover=(req, res) => {
  res.status(200).render('recover',{
    title: 'recovermail'
  })
}
exports.getsetpassword=catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  });
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }
    res.status(200).render('setpassword', {
      title:"Recover password",
      token: req.params.token
    });
 
});

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email
    },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).render('account', {
    title: 'Your account',
    user: updatedUser
  });
});
exports.deleteuser = catchAsync(async (req, res, next) => {
const{ email}=req.body;
    const user = await User.findOneAndDelete({email});

    if (!user) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: null
    });
  });
  exports.deletepost = catchAsync(async (req, res, next) => {
    const{ title}=req.body;
        const post = await Comic.findOneAndDelete({title});
    
        if (!post) {
          return next(new AppError('No document found with that ID', 404));
        }
    
        res.status(200).json({
          status: 'success',
          data: null
        });
      });
  exports.updateuser= catchAsync(async (req, res, next) => {
    const { email,role } = req.body;
    const user = await User.findOneAndUpdate({email}, req.body);

    if (!user) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: user
      }
    });
  });

exports.upload = catchAsync(async (req, res, next) => {
  console.log(req.body)
const doc = await Comic.create(req.body);
res.status(201).json({
  status: 'success',
  data: {
    data: doc
  }
});
});


const ITEMS_PER_CATEGORY =10

exports.getCategory =catchAsync(async(req, res, next) => {
  const page = +req.query.page || 1;
  let totalItemsCategory;

  let totalodia=0;
  Comic.countDocuments({ category:"odia" }, function(err, result) {
    totalodia=result
  });
  const featuresodia = new APIFeatures(Comic.where('category').in(['odia']));
  const odia= await featuresodia.query;
  let odiai;
  let odiag;
  let odiak;
  let odiap=new Array(odia.length);
  let odiaresult;
  for(odiai=0;odiai<odia.length;odiai++){
    odiag=odia[odiai];
    odiak=odiag.subcategory;
    odiap[odiai]=odiak;
  }
  function removeDuplicates(data){
    return data.filter((value,index)=>data.indexOf(value)===index);
  }
  odiaresult=removeDuplicates(odiap);

  let totalenglish=0;
  Comic.countDocuments({ category:"english" }, function(err, result) {
    totalenglish=result
  });
  const featuresenglish = new APIFeatures(Comic.where('category').in(['english']));
  const english= await featuresenglish.query;
  let englishi;
  let englishg;
  let englishk;
  let englishp=new Array(english.length);
  let englishresult;
  for(englishi=0;englishi<english.length;englishi++){
    englishg=english[englishi];
    englishk=englishg.subcategory;
    englishp[englishi]=englishk;
  }
  function removeDuplicates(data){
    return data.filter((value,index)=>data.indexOf(value)===index);
  }
  englishresult=removeDuplicates(englishp);

  let totalhindhi=0;
  Comic.countDocuments({ category:"hindhi" }, function(err, result) {
    totalhindhi=result
  });
  const featureshindhi = new APIFeatures(Comic.where('category').in(['hindhi']));
  const hindhi= await featureshindhi.query;
  let hindhii;
  let hindhig;
  let hindhik;
  let hindhip=new Array(hindhi.length);
  let hindhiresult;
  for(hindhii=0;hindhii<hindhi.length;hindhii++){
    hindhig=hindhi[hindhii];
    hindhik=hindhig.subcategory;
    hindhip[hindhii]=hindhik;
  }
  function removeDuplicates(data){
    return data.filter((value,index)=>data.indexOf(value)===index);
  }
  hindhiresult=removeDuplicates(hindhip);


  Comic.where('subcategory').in([req.params.sub])
    .countDocuments()
    .then(numProducts => {
      totalItemsCategory = numProducts;
      return Comic.where('subcategory').in([req.params.sub])
      .sort('-createdAt')
        .skip((page - 1) * ITEMS_PER_CATEGORY)
        .limit(ITEMS_PER_CATEGORY);
    })
    .then(products => {
      res.render('category', {
        prods: products,
        title: 'subcategory',
        odia:odiaresult,
        totalodia:totalodia,
        english:englishresult,
        totalenglish:totalenglish,
        hindhi:hindhiresult,
        totalhindhi:totalhindhi,
        currentPage: page,
        hasNextPage: ITEMS_PER_CATEGORY * page < totalItemsCategory,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItemsCategory / ITEMS_PER_CATEGORY)
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
});
exports.createcomment = catchAsync(async (req, res, next) => {
  console.log(req.body);
  console.log(req.params.id);
  const newReview = await Review.create({
    name: req.body.name,
    mail: req.body.mail,
    review:req.body.review,
    comic:req.params.id

  });
  const comic = await (await Comic.findOne({"title":req.params.id}));
  if (!comic) {
    return next(new AppError('There is no comic with that name.', 404));
  }
  const reviewapi = new APIFeatures(Review.where('comic').in([ req.params.id ]));
  const review = await reviewapi.query;
  if (!review) {
    return next(new AppError('There is no review with that name.', 404));
  }
  let totalodia=0;
  Comic.countDocuments({ category:"odia" }, function(err, result) {
    totalodia=result
  });
  const featuresodia = new APIFeatures(Comic.where('category').in(['odia']));
  const odia= await featuresodia.query;
  let odiai;
  let odiag;
  let odiak;
  let odiap=new Array(odia.length);
  let odiaresult;
  for(odiai=0;odiai<odia.length;odiai++){
    odiag=odia[odiai];
    odiak=odiag.subcategory;
    odiap[odiai]=odiak;
  }
  function removeDuplicates(data){
    return data.filter((value,index)=>data.indexOf(value)===index);
  }
  odiaresult=removeDuplicates(odiap);

  let totalenglish=0;
  Comic.countDocuments({ category:"english" }, function(err, result) {
    totalenglish=result
  });
  const featuresenglish = new APIFeatures(Comic.where('category').in(['english']));
  const english= await featuresenglish.query;
  let englishi;
  let englishg;
  let englishk;
  let englishp=new Array(english.length);
  let englishresult;
  for(englishi=0;englishi<english.length;englishi++){
    englishg=english[englishi];
    englishk=englishg.subcategory;
    englishp[englishi]=englishk;
  }
  function removeDuplicates(data){
    return data.filter((value,index)=>data.indexOf(value)===index);
  }
  englishresult=removeDuplicates(englishp);

  let totalhindhi=0;
  Comic.countDocuments({ category:"hindhi" }, function(err, result) {
    totalhindhi=result
  });
  const featureshindhi = new APIFeatures(Comic.where('category').in(['hindhi']));
  const hindhi= await featureshindhi.query;
  let hindhii;
  let hindhig;
  let hindhik;
  let hindhip=new Array(hindhi.length);
  let hindhiresult;
  for(hindhii=0;hindhii<hindhi.length;hindhii++){
    hindhig=hindhi[hindhii];
    hindhik=hindhig.subcategory;
    hindhip[hindhii]=hindhik;
  }
  function removeDuplicates(data){
    return data.filter((value,index)=>data.indexOf(value)===index);
  }
  hindhiresult=removeDuplicates(hindhip);

  res.status(200).render('content',{
    status: 'success',
    title: `${comic.title}`,
    comic,
    review,
    odia:odiaresult,
    totalodia:totalodia,
    english:englishresult,
    totalenglish:totalenglish,
    hindhi:hindhiresult,
    totalhindhi:totalhindhi

  });

});
exports.publish=catchAsync(async (req, res, next) => {
  
  let totalodia=0;
  Comic.countDocuments({ category:"odia" }, function(err, result) {
    totalodia=result
  });
  const featuresodia = new APIFeatures(Comic.where('category').in(['odia']));
  const odia= await featuresodia.query;
  let odiai;
  let odiag;
  let odiak;
  let odiap=new Array(odia.length);
  let odiaresult;
  for(odiai=0;odiai<odia.length;odiai++){
    odiag=odia[odiai];
    odiak=odiag.subcategory;
    odiap[odiai]=odiak;
  }
  function removeDuplicates(data){
    return data.filter((value,index)=>data.indexOf(value)===index);
  }
  odiaresult=removeDuplicates(odiap);

  let totalenglish=0;
  Comic.countDocuments({ category:"english" }, function(err, result) {
    totalenglish=result
  });
  const featuresenglish = new APIFeatures(Comic.where('category').in(['english']));
  const english= await featuresenglish.query;
  let englishi;
  let englishg;
  let englishk;
  let englishp=new Array(english.length);
  let englishresult;
  for(englishi=0;englishi<english.length;englishi++){
    englishg=english[englishi];
    englishk=englishg.subcategory;
    englishp[englishi]=englishk;
  }
  function removeDuplicates(data){
    return data.filter((value,index)=>data.indexOf(value)===index);
  }
  englishresult=removeDuplicates(englishp);

  let totalhindhi=0;
  Comic.countDocuments({ category:"hindhi" }, function(err, result) {
    totalhindhi=result
  });
  const featureshindhi = new APIFeatures(Comic.where('category').in(['hindhi']));
  const hindhi= await featureshindhi.query;
  let hindhii;
  let hindhig;
  let hindhik;
  let hindhip=new Array(hindhi.length);
  let hindhiresult;
  for(hindhii=0;hindhii<hindhi.length;hindhii++){
    hindhig=hindhi[hindhii];
    hindhik=hindhig.subcategory;
    hindhip[hindhii]=hindhik;
  }
  function removeDuplicates(data){
    return data.filter((value,index)=>data.indexOf(value)===index);
  }
  hindhiresult=removeDuplicates(hindhip);
  res.status(200).render('publish',{
    status: 'success',
    title: "Submit-Story",
    odia:odiaresult,
    totalodia:totalodia,
    english:englishresult,
    totalenglish:totalenglish,
    hindhi:hindhiresult,
    totalhindhi:totalhindhi

  });


});