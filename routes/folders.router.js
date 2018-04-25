'use strict';

const express = require('express');

const knex = require('../knex');

const router = express.Router();

/* ========== GET/READ ALL FOLDERS ========== */
router.get('/folders', (req, res, next) => {
  knex.select('id', 'name')
    .from('folders')
    .then(results => {
      res.json(results);
    })
    .catch(err => next(err));
});

/* ========== GET/READ SINGLE FOLDER ========== */
router.get('/folders/:id', (req, res, next) => {
  const folderId = req.params.id;

  knex
    .select('id', 'name')
    .from('folders')
    .where({id: folderId})
    .then(result => {
      if (result) {
        res.json(result[0]);
      } else {
        next();
      }
    })
    .catch(err => next(err));
});

/* ========== PUT/UPDATE A SINGLE ITEM ========== */
router.put('/folders/:id', (req, res, next) => {

})