const { z } = require('zod');

const loginSchema = z.object({
    email: z.string().email("Adresse email invalide."),
    password: z.string().min(1, "Le mot de passe est invalide"),
});

const validateLogin = (req, res, next) => {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({ error: result.error.issues[0].message});
    }
    req.body = result.data;
    next();
};
module.exports = validateLogin;