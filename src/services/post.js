const Post = require("../models/post");
const Tag = require("../models/tag");
const TagPost = require("../models/tag-post");
const database = require("../utils/database");


exports.createPost = async postData => {

    let t;

    try {
        t = await database.transaction(); 

        const { title, text, userId, tags } = postData;


        const post = await Post.create(
            {
                title, 
                text,
                userId,
            }, 
            {
                transaction: t,
        });

        const tagPosts = tags.map(t => {
            return {
                tagName: t,
                postId: post.id,
            };
        });

        await TagPost.bulkCreate(tagPosts, { transaction: t });
        
        await t.commit();
        return post;

    } catch (error) {
        console.log(error);
        if (t) {
            await t.rollback();
        }
    }
}


exports.deletePost = async id => {
    try {
        const post = await Post.findByPk(id);

        await post.destroy();

        return post;

    } catch (error) {
        console.log(error)
    }
}


exports.updatePost = async postData => {

    let t;

    try {
        t = await database.transaction();

        const { id, title, text, tags } = postData;

        const post = await Post.findByPk(id);

        post.title = title;
        post.text = text;
        await post.save({ transaction: t });

        const existingTags = await TagPost.findAll({
            where: {
                postId: id,
            }
        });

        await Promise.all(existingTags.map( async tp => {
            if(!tags.includes(tp.tagName)) {
                await tp.destroy({ transaction: t });
            }
        }));
          
        const existingTagNames = existingTags.map(tp => tp.tagName);
        const newtagNames = tags.filter(t => !existingTagNames.includes(t));

        const newTags = newtagNames.map(t => {
            return {
                tagName: t,
                postId: id,
            };
        });

        await TagPost.bulkCreate(newTags, { transaction: t });
        
        await t.commit();
        return post;

    } catch (error) {
        console.log(error);
        if (t) {
            await t.rollback();
        }
    }
}


exports.readAllPost = async () => {
    try {
        const post = await Post.findAll({
            include: {
                model: Tag,
                through: { attributes: [] },
            }
        });

        return post;

    } catch (error) {
        console.log(error)
    }
}


exports.readPostById = async id => {
    try {
        const post = await Post.findAll({
            where: {
                id,
            },
            include: {
                model: Tag,
                through: { attributes: [] },
            }
        });

        return post;

    } catch (error) {
        console.log(error)
    }
}