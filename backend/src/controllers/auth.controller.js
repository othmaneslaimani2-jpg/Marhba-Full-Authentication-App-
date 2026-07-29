const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

const register = async (req, res, next) => {
    try {
        const { fullName, email, password } = req.body;

        if ( await User.findOne({ where: { email } })) {
            return res.status(400).json({ error: "Cet email déjà utilisé."});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ fullName, email, password: hashedPassword});
        res.status(201).json({
            message: "Inscription réussie !",
            token: signToken(user.id),
            user: { id: user.id, fullName: user.fullName, email: user.email},
        });
    } catch (err) { next(err) };
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email }});
        const authError = "Email ou mot de passe incorrect";

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ error: authError });
        }
        res.json({
            message: "Connexion réussie !",
            token: signToken(user.id),
            user: { id: user.id, fullName: user.fullName, email: user.email },
        });
    } catch (err) { next(err);}
};

const getMe = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.user.id, { attributes: { exclude : ['password']}});
        if (!user) return res.status(404).json({ error: "Utilisateur introuvable."});
        res.json(user);
    } catch (err) { next(err); }
};

module.exports = { register, login, getMe };