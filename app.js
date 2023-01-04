// core modüller
const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');

const ejs = require('ejs');

const photoController = require('./controllers/photoControllers')
const pageController = require('./controllers/pageControllers')
// const { dir } = require('console');


const app = express();

// connect DB
mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://arslan_ng:narniag7A.@cluster0.z8aaudl.mongodb.net/pcat-db?retryWrites=true&w=majority')
.then(()=>{
  console.log('DB Connected')
}).catch((err)=>{
  console.log(err)
});

// Template Engine
app.set('view engine', 'ejs');

// middlewares
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(fileUpload());

app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

// Routes
app.get('/', photoController.getAllPhotos);
app.get('/photos/:id', photoController.getPhoto);
app.post('/photos', photoController.createPhoto);
app.put('/photos/:id', photoController.updatePhoto);
app.delete('/photos/:id', photoController.deletePhoto);

app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);
app.get('/photos/edit/:id', pageController.getEditPage);

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı`);
});
