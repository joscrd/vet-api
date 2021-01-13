'use strict'

const Pet = require('../models/pet');

const fs = require('fs');
const path = require('path');

// App controller
const controller = {
    home: function(req, res) {
        return res.status(200).send({ message: "Home" });
    },

    test: function(req, res) {
        return res.status(200).send({ message: "test" });

    },

    // POST request to save pet data in the database
    savePet: function(req, res) {
        let pet = new Pet();

        let params = req.body;
        pet.name = params.name;
        pet.age = params.age;
        pet.animal = params.animal;
        pet.gender = params.gender;
        pet.diagnostic = null;
        pet.prescription = null;
        pet.image = null;
        pet.date = null;

        pet.save((err, petStored) => {
            if (err) return res.status(500).send({ message: "Error trying save in the database" });

            if (!petStored) return res.status(404).send({ message: "Not stored" });

            return res.status(200).send({ pet: petStored });
        });

    },

    // GET request to find an object stored in the database using its id
    getPet: function(req, res) {
        let petId = req.params.id;

        Pet.findById(petId, (err, pet) => {

            if (petId == null) return res.status(404).send({ message: 'This pet is not stored in the database' });

            if (err) return res.status(500).send({ message: 'Error returning data' });

            if (!pet) return res.status(404).send({ message: 'Pet not stored' });

            return res.status(200).send({ pet });
        });
    },

    // Get request to display a list of pets stored in the database
    getPets: function(req, res) {
        Pet.find({}).sort('year').exec((err, pets) => {

            if (err) return res.status(500).send({ message: 'Error returning data' });

            if (!pets) return res.status(404).send({ message: 'No pets in the database' });

            return res.status(200).send({ pets });
        });
    },

    // PUT request to update an object using its id
    updatePet: function(req, res) {
        let petId = req.params.id;
        let update = req.body;

        Pet.findByIdAndUpdate(petId, update, { new: true }, (err, petUpdated) => {
            if (err) return res.status(500).send({ message: 'Error, not updated' });

            if (!petUpdated) return res.status(404).send({ message: 'Pet not stored' });

            return res.status(200).send({ pet: petUpdated });
        });
    },

    // DELETE request to delete a pet from the database
    deletePet: function(req, res) {
        let petId = req.params.id;

        Pet.findByIdAndRemove(petId, (err, petRemoved) => {
            if (err) return res.status(500).send({ message: 'Pet not removed' });

            if (!petRemoved) return res.status(404).send({ message: "This pet can't be removed" });

            return res.status(200).send({ pet: petRemoved });
        });
    },

    // POST request to upload the image of the pet
    uploadImage: function(req, res){
		let petId = req.params.id;
        const file_name = 'Not upload...';

		 if(req.files){
			let filePath = req.files.image.path;
			let fileSplit = filePath.split('/');
			let fileName = fileSplit[1];
			let extSplit = fileName.split('\.');
            let fileExt = extSplit[1];
            
            fileExt = fileExt.toLowerCase();

			if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){

				Pet.findByIdAndUpdate(petId, {image: fileName}, {new: true}, (err, petUpdated) => {
					if(err) return res.status(500).send({message: 'Image not upload'});

					if(!petUpdated) return res.status(404).send({message: 'Pet not stored'});

					return res.status(200).send({ pet: petUpdated });
				});

			}else{
				fs.unlink(filePath, (err) => {
					return res.status(200).send({message: 'Extension file not valid'});
				});
			}

		}else{
			return res.status(200).send({
				message: file_name
			});
		} 

	},
    // GET request to get the image in the front end
    getImageFile: function(req, res) {
        let file = req.params.image;
        let path_file = `./pets/${file}`;

        fs.exists(path_file, (exists) => {
            if (exists) {
                return res.sendFile(path.resolve(path_file));
            } else {
                return res.status(200).send({ message: "Image not found..." });
            }
        });
    }

};

module.exports = controller;