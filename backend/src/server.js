const express = require('express');
const path = require('path');
const { apiReference } = require('@scalar/express-api-reference');
const sequelize = require('./config/database');


const cors = require('cors');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const authRoutes = require('./routes/auth.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.use('/docs', apiReference({
    theme: 'purple',
    spec: {
        content: require(path.join(__dirname, 'docs', 'OpenApi.json')),
    },
})
);


app.use('/api/auth', authRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true }).then(() => {
    console.log("Base de données connectée !")
    app.listen(PORT, () => {
        console.log(`🚀 Le serveur tourne sur http://localhost:${PORT}`);
        console.log(`📚 Documentation API : http://localhost:${PORT}/docs`);
    });
}).catch((err) => {
    console.error("Erreur DB :", err);
});