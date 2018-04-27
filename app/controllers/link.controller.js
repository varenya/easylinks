const Link = require('../models/link.model');
const errorController = require('../core/errorController');

// Create and save a new link
exports.create = (req, res) => {
    // Create a link
    const link = new Link({
        title: req.body.title || 'Untitled Link',
        url: req.body.url,
        category: req.body.category,
        rate: req.body.rate
    });

    // Save link in database
    link.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: errorController.getErrorMessage(err) || 'Some error occured while creating the link.'
            });
        });
};

// Retrieve and return all links from the database
exports.findAll = (req, res) => {
    Link.find()
        .then(links => {
            res.send(links);
        }).catch(err => {
            res.status(500).send({
                message: errorController.getErrorMessage(err) || "Some error occurred while retrieving links."
            });
        });
};
// Find a single link with linkId
exports.findOne = (req, res) => {
    Link.findById(req.params.linkId)
        .then(link => {
            if (!link) {
                return res.status(400).send({
                    message: `Link not found with id ${req.params.linkId}`
                });
            }
            res.send(link);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: `Link not found with id ${req.params.linkId}`
                })
            }
            return res.status(500).send({
                message: `Error retrieving link with id ${req.params.linkId}`
            });
        });
};
// Update a link identified by the linkId in the request
exports.update = (req, res) => {
    Link.findByIdAndUpdate(req.params.linkId, {
            title: req.body.title || 'Untitled Link',
            url: req.body.url,
            category: req.body.category,
            rate: req.body.rate
        }, {
            new: true
        })
        .then(link => {
            if (!Link) {
                return res.status(404).send({
                    message: `Link not found with id ${req.params.linkId}`
                });
            }
            res.send(link);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: `Link not found with id ${req.params.linkId}`
                })
            }
            return res.status(500).send({
                message: `Error updating link with id ${req.params.linkId}`
            });
        });

};

// Delete a link with the specified link id in the request
exports.delete = (req, res) => {
    Link.findByIdAndRemove(req.params.linkId)
        .then(link => {
            if (!link) {
                return res.status(404).send({
                    message: "Link not found with id " + req.params.linkId
                });
            }
            res.send({
                message: "Link deleted successfully!"
            });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Link not found with id " + req.params.linkId
                });
            }
            return res.status(500).send({
                message: "Could not delete link with id " + req.params.linkId
            });
        });
};