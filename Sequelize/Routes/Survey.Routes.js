module.exports = app => {
    const Surveys = require("../Controllers/Survey.Controller.js");

    var router = require("express").Router();

    // Create a new Survey
    router.post("/", Surveys.create);

    // Retrieve all Survey by where condition
    router.post("/filter", Surveys.find);
    
    // Update a single Survey with id
    router.put("/:id", Surveys.update);

    
    // Retrieve all Survey
    router.get("/", Surveys.findAll);

    // Retrieve a single Survey with id
    router.get("/:id", Surveys.findOne);

    // Delete a single Survey with id
    router.delete("/:id", Surveys.delete);

    app.use('/Survey', router);
};
