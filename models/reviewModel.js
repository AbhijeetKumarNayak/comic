// review / rating / createdAt / ref to tour / ref to user
const mongoose = require('mongoose');
const Comic = require('./comicModel');
const validator = require('validator');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review can not be empty!']
    },
    name:{ 
        type:String,
        required: [true, 'name required']
    },
    mail:{
        type: String,
        required: [true, 'Please provide your email'],
        lowercase: true
    },

    createdAt: {
      type: Date,
      default: Date.now
    },
    comic: {
      type:String,
      required: [true, 'name required']
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);


const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
