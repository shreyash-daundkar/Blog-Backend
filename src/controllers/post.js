const { createPost, deletePost, updatePost, readAllPost, readPostById } = require("../services/post");
const { InternalException } = require("../utils/exceptions");
const { createPostSchema } = require("../utils/schema");

exports.addPost = async (req, res, next) => {
    try {
        createPostSchema.parse(req.body);
    
        const { title, text, tags } = req.body;
    
        const post = await createPost({
            title,
            text,
            tags,
            userId: req.user.id,
        });
    
        if(!post) {
            throw new Error('Error creating post');
        }
    
        return res.status(201).json({
            message: 'Post created successfully', 
            data: post,
            success: true,
        });
        
    } catch (error) {
        return next(new InternalException(error));
    }
};


exports.removePost = async (req, res, next) => {
    try {
        const id = req.params.id;
    
        const post = await deletePost(id);

        if(!post) {
            throw new Error('Error deleting post');
        }
    
        return res.status(200).json({
            message: 'Post deleted successfully', 
            data: post,
            success: true,
        });
        
    } catch (error) {
        return next(new InternalException(error));
    }
};


exports.editPost = async (req, res, next) => {
    try {
        createPostSchema.parse(req.body);
    
        const { title, text, tags } = req.body;
    
        const post = await updatePost({
            title,
            text,
            tags,
            id: req.params.id,
        });
    
        if(!post) {
            throw new Error('Error updating post');
        }
    
        return res.status(200).json({
            message: 'Post updated successfully', 
            data: post,
            success: true,
        });
        
    } catch (error) {
        return next(new InternalException(error));
    }
};


exports.getAllPost = async (req, res, next) => {
    try {
        const posts = await readAllPost();

        if(!posts) {
            throw new Error('Error getting all post');
        }
    
        return res.status(200).json({
            message: 'Fetched all post successfully', 
            data: posts,
            success: true,
        });
        
    } catch (error) {
        return next(new InternalException(error));
    }
};


exports.getPostById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const post = await readPostById(id);

        if(!post) {
            throw new Error('Error getting post by id');
        }
    
        return res.status(200).json({
            message: 'Fetched post by id successfully', 
            data: post,
            success: true,
        });
        
    } catch (error) {
        return next(new InternalException(error));
    }
};