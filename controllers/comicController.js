const Comic = require('../models/comicModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');


exports.getComic = catchAsync(async (req, res, next) => {
    // 1) Get the data, for the requested tour (including reviews and guides)
    const comic = await (await Comic.findById(req.params.id )).populate('reviews');
    if (!comic) {
      return next(new AppError('There is no comic with that name.', 404));
    }
    // 2) Build template
    // 3) Render template using data from 1)
    res.status(200).json( {
      comic
    });
  });
exports.getAllComics = factory.getAll(Comic);
// exports.getComic = factory.getOne(Comic);
exports.createComic = factory.createOne(Comic);
exports.updateComic = factory.updateOne(Comic);
exports.deleteComic= factory.deleteOne(Comic);