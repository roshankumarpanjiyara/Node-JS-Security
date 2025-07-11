const express = require('express');

const db = require('../data/database');

const router = express.Router();

router.get('/', function (req, res) {
  res.redirect('/discussion');
});

router.get('/discussion', async function (req, res) {
  let filter = '';

  if (req.query.author) {
    // filter = `WHERE author = "${req.query.author}"`;  high chance of SQL injection
    filter = `WHERE author = ?`; // safer way to prevent SQL injection
  }

  const query = `SELECT * FROM comments ${filter}`;

  console.log(query);

  const [comments] = await db.query(query, [req.query.author]);

  res.render('discussion', { comments: comments });
});

router.post('/discussion/comment', async function (req, res) {

  await db.query('INSERT INTO comments (author, comment) VALUES (?)', [[req.body.name, req.body.comment]])

  res.redirect('/discussion');
});

module.exports = router;
