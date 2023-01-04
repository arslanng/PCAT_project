const Photo = require('../models/Photo');
const fs = require('fs');


exports.getAllPhotos = async (req, res) => {
  const page = req.query.page || 1;
  const photosPerPage = 2;

  const totalPhotos = await Photo.find().countDocuments();

  const photos = await Photo.find({})
  .sort('-dateCreated')
  .skip((page-1) *photosPerPage)
  .limit(photosPerPage);

  res.render('index', {
      photos: photos,
      current: page,
      pages: Math.ceil(totalPhotos/photosPerPage)
    });

  // console.log(req.query);
  // const photos = await Photo.find({}).sort('-dateCreated');
  // res.render('index', {
  //   photos: photos,
  // });
};

exports.getPhoto = async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render('photo', {
    photo,
  });
};

exports.createPhoto = async (req, res) => {
  const uploadDIR = 'public/uploads';
  if (!fs.existsSync(uploadDIR)) {
    fs.mkdirSync(uploadDIR);
  }

  let zaman = Date.now(); // zaman değişkeni ve bunu dosya yolunda adın başına eklenmesi, dosyayı unike hale getirmesi için arafımca eklendi.
  let uploadedImage = req.files.image;
  let uploadPath = __dirname + '/../public/uploads/' + zaman + uploadedImage.name;

  uploadedImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + zaman + uploadedImage.name,
    });
    res.redirect('/');
  });
};

exports.updatePhoto = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save();

  res.redirect(`/photos/${req.params.id}`);
};

exports.deletePhoto = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  let deletedImage = __dirname + '/../public' + photo.image;
  fs.unlinkSync(deletedImage);
  await Photo.findByIdAndRemove(req.params.id);
  res.redirect('/');
};
