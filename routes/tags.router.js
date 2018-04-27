'use strict';

const express = require('express');
const router = express.Router();

const knex = require('../knex');

/* ========== GET/READ ALL TAGS ========== */
router.get('/tags', (req, res, next) => {

  knex
    .select()
    .from('tags')
    .then(results => {
      res.json(results);
    })
    .catch(err => next(err));
});

/* ========== GET/READ SINGLE TAG ========== */
router.get('/tags/:id', (req, res, next) => {
  const tagId = req.params.id;

  knex
    .select()
    .from('tags')
    .where('id', tagId)
    .then(results => {
      res.json(results[0]);
    })
    .catch(err => next(err));
});

/* ========== POST/CREATE TAG ========== */
router.post('/tags', (req, res, next) => {
  const { name } = req.body;

  /***** Never trust users. Validate input *****/
  if (!name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }

  const newItem = { name };

  knex.insert(newItem)
    .into('tags')
    .returning(['id', 'name'])
    .then((results) => {
      // Uses Array index solution to get first item in results array
      const result = results[0];
      res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
    })
    .catch(err => next(err));
});

/* ========== PUT/UPDATE A SINGLE TAG ========== */
router.put('/tags/:id', (req, res, next) => {
  const tagId = req.params.id;
  const {name} = req.body;

  if (!name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }

  knex
    .update({name})
    .from('tags')
    .where('id', tagId)
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


/* ========== DELETE/REMOVE A SINGLE TAG ========== */
router.delete('/tags/:id', (req, res, next) => {
  knex.del()
    .where('id', req.params.id)
    .from('tags')
    .then(() => {
      res.status(204).end();

    })
    .catch(err => next(err));
});

module.exports = router;