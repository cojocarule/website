const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');
//__dirname = '/mnt/mydisk/DATA/PHOTOS/'

app.set('view engine', 'pug');
//app.set('views','./views');
//app.set('view engine', 'ejs');

app.get('/get-images', (req, res) => {
    let images = getImagesFromDir(path.join(__dirname, 'uploads'));
     res.render('index', { title: 'Auto Generate a Photo Gallery from a Directory', images: images })
});

app.use('/static', express.static(path.join(__dirname, 'uploads')));
// dirPath: target image directory
function getImagesFromDir(dirPath) {

    // All iamges holder, defalut value is empty
    let allImages = [];

    // Iterator over the directory
    let files = fs.readdirSync(dirPath);

    // Iterator over the files and push jpg and png images to allImages array.
    for (file of files) {
        let fileLocation = path.join(dirPath, file);
        var stat = fs.statSync(fileLocation);
        if (stat && stat.isDirectory()) {
            getImagesFromDir(fileLocation); // process sub directories
        } else if (stat && stat.isFile() && ['.jpg', '.png',".JPG" ].indexOf(path.extname(fileLocation)) != -1) {
            allImages.push('static/'+file); // push all .jpf and .png files to all images 
        }
    }

    // return all images in array formate
    return allImages;
}

app.listen(3001, function () {
    console.log(`Application is running at : localhost:3001`);
});