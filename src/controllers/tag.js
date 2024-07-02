const { getAllTags } = require("../services/tag");

exports.getTags = async (req, res, next) => {
    try {
        const tags = await getAllTags();

        if(!tags) {
            throw new Error('Error getting all tags');
        }
    
        return res.status(200).json({
            message: 'Fetched all tags successfully', 
            data: tags,
            success: true,
        });
        
    } catch (error) {
        return next(new InternalException(error));
    }
};