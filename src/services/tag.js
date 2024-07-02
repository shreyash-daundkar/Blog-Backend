const Tag = require("../models/tag");

exports.createTags = async tags => {
    try {

        const tagList = await Tag.bulkCreate(tags);

        return tagList;

    } catch (error) {
        console.log(error.stack)
    }
}

exports.getAllTags = async tags => {
    try {

        const tags = await Tag.findAll();

        return tags;

    } catch (error) {
        console.log(error.stack)
    }
}