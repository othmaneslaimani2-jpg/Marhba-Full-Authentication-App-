const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const signAccessToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '15m' });
const signRefreshToken = (id) => jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

const register = async (req, res, next) => {
    try {
        const { fullName, email, password } = req.body;

        if ( await User.findOne({ where: { email } })) {
            return res.status(400).json({ error: "Cet email déjà utilisé."});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ fullName, email, password: hashedPassword});
        
        const accessToken = signAccessToken(user.id);
        const refreshToken = signRefreshToken(user.id);
        
        user.refreshToken = refreshToken;
        await user.save();

        res.status(201).json({
            message: "Inscription réussie !",
            accessToken,
            refreshToken,
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

        const accessToken = signAccessToken(user.id);
        const refreshToken = signRefreshToken(user.id);

        user.refreshToken = refreshToken;
        await user.save();

        res.json({
            message: "Connexion réussie !",
            accessToken,
            refreshToken,
            user: { id: user.id, fullName: user.fullName, email: user.email },
        });
    } catch (err) { next(err);}
};

const getMe = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.user.id, { attributes: { exclude : ['password', 'refreshToken']}});
        if (!user) return res.status(404).json({ error: "Utilisateur introuvable."});
        res.json(user);
    } catch (err) { next(err); }
};

const refresh = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(400).json({ error: "Refresh token requis." });
        }

        let decoded;
        try {
            decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        } catch (err) {
            return res.status(401).json({ error: "Refresh token invalide ou expiré." });
        }

        const user = await User.findByPk(decoded.id);
        if (!user || user.refreshToken !== refreshToken) {
            return res.status(401).json({ error: "Refresh token invalide ou expiré." });
        }

        const newAccessToken = signAccessToken(user.id);
        const newRefreshToken = signRefreshToken(user.id);

        user.refreshToken = newRefreshToken;
        await user.save();

        res.json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        });
    } catch (err) {
        next(err);
    }
};

const logout = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;
        if (refreshToken) {
            const user = await User.findOne({ where: { refreshToken } });
            if (user) {
                user.refreshToken = null;
                await user.save();
            }
        }
        res.json({ message: "Déconnexion réussie !" });
    } catch (err) {
        next(err);
    }
};

module.exports = { register, login, getMe, refresh, logout };