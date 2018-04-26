'use strict';

const express = require('express');
const router = express.Router();

const knex = require('../knex');

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
  const folderId = req.params.id;
  const {name} = req.body;

  if (!name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }

  knex
    .from('folders')
    .where({id: folderId})
    .update({name})
    .returning(['id', 'name'])
    .then(([results]) => {
      if (results) {
        res.json(results);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});

/* ========== POST/CREATE ITEM ========== */
router.post('/folders', (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }

  knex
    .into('folders')
    .insert({name})
    .returning(['id', 'name'])
    .then(([results]) => {
      if (results) {
        res.json(results);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});

/* ========== DELETE/REMOVE A SINGLE ITEM ========== */
router.delete('/folders/:id', (req, res, next) => {
  const folderId = req.params.id;
  knex.del()
    .where({id: folderId})
    .from('folders')
    .then(() => {
      res.status(204).end();
    })
    .catch(err => next(err));
});

module.exports = router;