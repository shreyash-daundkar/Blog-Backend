const { compare, hash } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { InternalException, NotFoundException, UnauthorizedException, ConflictException } = require( "../utils/exceptions");
const { signUpSchema, loginSchema } = require("../utils/schema");
const { getUserByEmail, createUser } = require("../services/user");


exports.signUp = async (req, res, next) => {
    try {
        signUpSchema.parse(req.body);
    
        const { name, email, password } = req.body;
    
        let user = await getUserByEmail(email);
    
        if (user) {
            return next( new ConflictException(
                'User already exists!',
                null,
            ));
        }
    
        const encryptedPassword = await hash(password, 10);
    
        user = await createUser({
            name,
            email,
            password: encryptedPassword,
        });
    
        if(!user) {
            throw new Error('Error creating user');
        }
    
        return res.status(201).json({
            message: 'User created successfully', 
            data: user,
            success: true,
        });
        
    } catch (error) {
        return next(new InternalException(error));
    }

};


exports.login = async (req, res, next) => {
    try {

        loginSchema.parse(req.body);
    
        const { email, password } = req.body;
    
        let user = await getUserByEmail(email);
    
        if (!user) {
            return next( new NotFoundException(
                'User not exists!', 
                null,
            ));
        }
    
        const passwordVerified = await compare(password, user.password);
    
        if(!passwordVerified) {
            return next( new UnauthorizedException(
                'Wrong password!', 
                ErrorCode.INCORRECT_PASSWORD, 
                null
            ));
        }
    
        const token = await sign({
            userId: user.id,
        }, process.env.JWT_SECRET);
    
        return res.status(200).json({
            message: 'Login successfully', 
            data: token,
            success: true,
        });
        
    } catch (error) {
        return next(new InternalException(error));
    }

};