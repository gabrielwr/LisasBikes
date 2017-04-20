'use strict'
const db = require('APP/db')
const Product = db.model('Products')
const { mustBeLoggedIn, forbidden } = require('./auth.filters')

module.exports = require('express').Router()
  .get('/',
    forbidden('listing Products is not allowed'),
    (req, res, next) =>
      Product.findAll()
        .then(products => res.json(products))
        .catch(next))
  .post('/',
    (req, res, next) =>
      Product.create(req.body)
        .then(product => res.status(201).json(product))
        .catch(next))
  .get('/:id',
    mustBeLoggedIn,
    (req, res, next) =>
      Product.findById(req.params.id)
        .then(product => res.json(product))
        .catch(next))
  .put('/:id',
    mustBeLoggedIn,
    (req, res, next) =>
      Product.findById(req.params.id)
        .then(product => product.update(req.body))
        .then(updatedProduct => res.json(updatedProduct))
        .catch(next))
  .delete('/:id',
    // TO DO: make sure that this user is Admin
    mustBeLoggedIn,
    (req, res, next) =>
      Product.findById(req.params.id)
        .then(product => product.destroy())
        .then(wasDestroyedBool => {
          if (wasDestroyedBool) {
            res.sendStatus(204)
          } else {
            const err = Error('Product not destroyed')
            err.status = 400
            throw err
          }
        })
        .catch(next))