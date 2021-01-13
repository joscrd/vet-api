'use strict'
// Conexiones con express
const express = require('express');
const PetController = require('../controllers/pet');

const router = express.Router();

// Conexión con connect-multiparty
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({ uploadDir: './pets' });

// Rutas de la apliación conectadas a mongoDB
router.get('/home', PetController.home);
router.post('/test', PetController.test);
router.post('/save-pet', PetController.savePet);
router.get('/pet/:id?', PetController.getPet);
router.get('/pets', PetController.getPets);
router.put('/pet/:id', PetController.updatePet);
router.delete('/pet/:id', PetController.deletePet);
router.post('/upload-image/:id', multipartMiddleware, PetController.uploadImage);
router.get('/get-image/:image', PetController.getImageFile);

module.exports = router;