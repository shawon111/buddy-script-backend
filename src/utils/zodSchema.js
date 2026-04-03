const {z} = require("zod");

// Validation Schemas
const registerSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.email({ message: "Invalid email address" }),
    password: z.string().min(6, "Password must be at least 6 characters")
});

const loginSchema = z.object({
    email: z.email({ message: "Invalid email address" }),
    password: z.string().min(6, "Password must be at least 6 characters")
});

const postValidationSchema = z.object({
    text: z.string().max(3000, "Text must be at most 3000 characters"),
    image: z.string({message: "Invalid image URL"}).optional(),
    isPrivate: z.boolean().optional()
});

const commentValidationSchema = z.object({
    text: z.string().max(500, "Text must be at most 500 characters")
});

module.exports = {
    registerSchema,
    loginSchema,
    postValidationSchema,
    commentValidationSchema
}