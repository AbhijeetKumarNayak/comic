const mongoose = require('mongoose');
const slugify = require('slugify');
const Review = require('./reviewModel');
const comicSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A story must have a title'],
      unique: true,
      trim: true,
      maxlength: [40, 'A story name must have less or equal then 40 characters'],
      minlength: [5, 'A book name must have more or equal then 10 characters']
      // validate: [validator.isAlpha, 'book name must only contain characters']
    },
    author: {
      type: String,
      required: [true, 'A story must have a author'],
      trim: true,
      maxlength: [40, 'A author name must have less or equal then 40 characters'],
      minlength: [1, 'A author name must have more or equal then 10 characters']
      // validate: [validator.isAlpha, 'book name must only contain characters']
    },
    category: {
      type: String,
      trim: true,
      required: [true, 'A story must have a categoryname'],
      maxlength: [40, 'A category name must have less or equal then 40 characters'],
      minlength: [1, 'A category name must have more or equal then 10 characters']
      
    },
    subcategory:{
      type: String,
      trim: true,
      required:[true,'A story must have a subcategory'],
      maxlength: [40, 'A category name must have less or equal then 40 characters'],
      minlength: [5, 'A category name must have more or equal then 10 characters']
    },
    slug: String,
    
    hint: {
      type: String,
      trim: true,
      required: [true, 'A story must have a hint']
    },
    description: {
      type: String,
      trim: true,
      required: [true, 'A story must have a description']
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: true
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  },
);


// DOCUMENT MIDDLEWARE: runs before .save() and .create()
comicSchema.pre('save', function(next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

// Virtual populate
// comicSchema.virtual('reviews', {
//   ref: 'Review',
//   foreignField: 'comic',
//   localField: '_id'
// });

comicSchema.post(/^find/, function(docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  next();
});
const Comic = mongoose.model('Comic', comicSchema);

module.exports = Comic;
