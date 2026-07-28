const validateRegister = (req, res, next) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ error: "Tous les champs sont requis."});
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Format d'email invalide."});
    }

    if (password.length < 6) {
        return res.status(400).json({ error: "Le mot de passe doit faire au moins 6 caractères." });
    }

    next();
};

module.exports = { validateRegister };