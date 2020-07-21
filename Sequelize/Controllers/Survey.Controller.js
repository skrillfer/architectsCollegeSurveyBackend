const db = require("../Models");
const Survey = db.Survey;


const sequelize = db.sequelize;
let transaction;

// Create and Save a new Survey
exports.create =  (req, res) => {
    // Save Survey in the database
    Survey.create(req.body)
    .then(data => {
        res.send({status:true,message:'create Survey success',data});
    })
    .catch(err => {
        res.send({
            status:false,
            message:
            err.message || "Some error occurred while creating the Survey."
        });
    });
};

// Get all Surveys from the database.
exports.findAll = (req, res) => {
    Survey.findAll({})
    .then(data => {
        res.send({status:true,message:"finded data",data});
    })
    .catch(err => {
        res.send({
            status:false,
            message:
            err.message || "Some error occurred while retrieving Surveys."
        });
    });
};

// Find a single Survey with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Survey.findByPk(id)
    .then(data => {
        res.send({status:true,data});
    })
    .catch(err => {
        res.send({
            status:false,
            message: "Error retrieving Survey with id=" + id
        });
    });
};

// Find a single "Survey" where condition
exports.find = (req, res) => {
    console.log(req.body);
    Survey.findAll({ where : req.body })
    .then(data => {
        res.send({status:true,data,message:""});
    })
    .catch(err => {
        res.send({
            status:false,
            message: `Error retrieving Survey ${err.message}`
        });
    });
};


// Update a Survey by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Survey.update(req.body, {
        where: { code: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                status: true,
                message: "Survey was updated successfully."
            });
        } else {
            res.send({
                status: false,
                message: `Cannot update Survey with id=${id}. Maybe Survey was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.send({
            status: false,
            message: "Error updating Survey with id=" + id
        });
    });
};



// Delete a Survey with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Survey.destroy({
        where: { code: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                status: true,
                message: "Survey was deleted successfully!"
            });
        } else {
            res.send({
                status: false,
                message: `Cannot delete Survey with id=${id}. Maybe Survey was not found!`
            });
        }
    })
    .catch(err => {
        res.send({
            status: false,
            message: "Could not delete Survey with id=" + id
        });
    });
};
