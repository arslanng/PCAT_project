const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// connect DB
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost/pcat-test-db');

// Create schema
const PhotoSchema = new Schema({
  title: String,
  description: String,
});

const Photo = mongoose.model('Photo', PhotoSchema);

// Create a photo
// Photo.create({
//   title: 'Photo Title 2',
//   description: 'Photo 2 desc. lorem ipsum',
// });

// read a photo
// Photo.find({}, (err, data) => {
//   console.log(data);
// });

// Update a photo
// const id = '63a57f07705931fa74b54a35';
// Photo.findByIdAndUpdate(
//   id,
//   {
//     title: 'Photo Title 1 updated',
//     description: 'Photo desc 1 updated',
//   },
//   {
//     new: true
//   },
//   (err, data) => {
//     console.log(data);
//   }
// );

// delete a photo
const id = '63a5861957e7afe19e3caa81';
Photo.findByIdAndDelete(id, (err, data) => {
  console.log('foto silindi');
});
