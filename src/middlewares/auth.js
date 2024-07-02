const { getUserById } = require("../services/user");
const { InternalException, NotFoundException, UnauthorizedException } = require("../utils/exceptions");
const { verify } = require("jsonwebtoken");


const authMiddleware = async (req, res, next) => {
    try {   
        
        const token = req.headers.authorization;

        if(!token) {
            return next(new UnauthorizedException('Token not found', null));
        }

        const payload = await verify(token, process.env.JWT_SECRET);
        if(typeof payload === 'string' || payload === null){
            return next(new UnauthorizedException(payload, null));
        }

        const user = await getUserById(payload.userId)
        if(!user) {
            return next(new NotFoundException('User not found', null));
        }

        req.user = user;
        next()

    } catch (error) {
        next(new InternalException(error));
    }
}

module.exports = authMiddleware;