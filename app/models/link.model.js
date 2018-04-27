'use strict';

/**
 * Module dependencies
 */
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Link Schema
 */
const LinkSchema = new Schema({
    title: {
        type: String,
        default: '',
        trim: true,
        required: 'Link title cannot be blank.'
    },
    url: {
        type: String,
        default: '',
        trim: true,
        required: 'Link url cannot be blank'
    },
    category: {
        type: String,
        default: '',
        trim: true
    },
    rate: {
        type: Number,
        default: 0,
        required: 'Rate cannot be blank'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Link', LinkSchema);