const { z } = require('zod');

const registerSchema = z.object({
    fullName: z.string().min(1, "Le nom complet est obligatoire."),
    email: z.string().email("Adresse email invalide."),
    password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères."),
});

const validateRegister = (req, res, next) => {
    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({ error: result.error.issues[0].message});
    }
    req.body = result.data;
    next();
}
module.exports = validateRegister;