const { z } = require('zod');

exports.signUpSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
});

exports.loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

exports.createPostSchema = z.object({
    title: z.string().min(3),
    text: z.string().min(3),
    tags: z.array( z.string().min(1) ),
});