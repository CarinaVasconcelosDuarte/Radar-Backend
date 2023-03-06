require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const _user = require("../models/user");
const _technology = require("../models/technology");
const { checkToken, isAdmin } = require("../middleware/auth");
const router = express.Router();

// User part of the API
// Route to get the user id from login
router.post("/user/login", async (req, res) => {
    try{
        const user = await _user.findOne({
            username: req.body.username,
        });

        if (!user) {
            return res.status(404).send({ message: "User not found"});
        };

        const checkPassword = (req.body.password === user.password);

        if (!checkPassword) {
            return res.status(401).send({
                message: "Incorrect Username or Password!"
            });
        };

        let token = jwt.sign({id: user._id}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: 43200
        });

        return res.status(200).send({
            id : user._id,
            isAdmin : user.admin,
            token : token,
        })
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});


router.get("/user/validate", async (req, res) => {
    let authHeader = req.headers['x-access-token'];
    jwt.verify(authHeader, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
        if(error){
            return res.status(200).send({message:"invalid"});
        }
        else { res.status(200).send({message: "valid"});}
    });
})

// Technologies part of the API
// Return only the published technologies
router.get("/technologies/published", [checkToken], async (req, res) => {
    try {
        const technologies = await _technology.find({
            published: true
        });
        res.status(200).send(technologies);
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});

// Return all technologies in the db (including non published)
router.get("/technologies/all", [checkToken, isAdmin] , async (req, res) => {
    try {
        const technologies = await _technology.find({});
        res.status(200).send(technologies);
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});

// Return a technology by its given id
router.get("/technologies/:id", [checkToken, isAdmin] , async (req, res) => {
    try {
        const technology = await _technology.findById(req.params.id);

        if (!technology) {
            return res.status(404).send({ message: "Technology not found. "});
        };

        return res.status(200).send(technology);
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});

// Add a new technology
router.post("/technologies", [checkToken, isAdmin] , (req, res) => {
    if(!req.body.name){
        return res.status(400).send({ message: "A name is required!" });
    }

    console.log(req);
    const technology = new _technology({
        name : req.body.name,
        category : req.body.category,
        ring : req.body.ring, 
        descTech : req.body.descTech,
        descRing : req.body.descRing,
        published : req.body.published,
        createdAt : Date.now(),
        createdBy : req.userId
    });

    technology.save(technology).then(data => {
        res.send(data);
    })
    .catch(error => {
        res.status(500).send({
            message: error.message
        });
    });
})

// Update an existing technology
router.put("/technologies/:id", [checkToken, isAdmin] , async (req, res) => {
    if(!req.params.id){
        return res.status(400).send({ message: "An ID of the technology is required!" });
    }

    const user = await _user.findOne({
        _id: req.userId,
    });

    console.log(user.username);
    
    const technology = await _technology.findOneAndUpdate({ _id: req.params.id}, req.body, {new: true});
    technology.history.push({name: user.username, changedBy: req.userId, updatedAt: Date.now()});

    await technology.save().then(data => {
        if (!data) {
            res.status(404).send({ message: "No Technology found" });
        }else {
            res.send(data);
            console.log('Updated sucessfully');
        }
    })
    .catch(error => {
        res.status(500).send({
            message: error.message
        });
    });
})

// Remove a given technology by its id
router.delete("/technologies/:id",  [checkToken, isAdmin] , async (req, res) => {
    if(!req.params.id){
        return res.status(400).send({ message: "An ID of the technology is required!" });
    }

    _technology.findByIdAndRemove(req.params.id).then( data => {
        if (!data) {
            res.status(404).send({ message: "No Technology found" });
        }else {
            res.send({ message : "Deleted successfully"});
        }
    }).catch(error => {
        res.status(500).send({
            message: error.message
        });
    });
})

module.exports = router;



