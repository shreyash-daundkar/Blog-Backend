const { Router } = require('express');

const { addPost, removePost, editPost, getAllPost, getPostById } = require('../controllers/post');

const postRouter= Router();

postRouter.get('/:id', getPostById);
postRouter.get('/', getAllPost);
postRouter.post('/', addPost);
postRouter.delete('/:id', removePost);
postRouter.put('/:id', editPost);

module.exports = postRouter;