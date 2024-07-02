const User = require("../models/user");
const Post = require("../models/post");
const Tag = require("../models/tag");
const TagPost = require('../models/tag-post');

const addModelsRelations = () => {
    User.hasMany(Post);
    Post.belongsTo(User);
    
    Post.belongsToMany(Tag, { through: TagPost });
    Tag.belongsToMany(Post, { through: TagPost });
}

module.exports = addModelsRelations;
