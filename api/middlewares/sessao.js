
const session = require('express-session');

app.use(session({
    secret: 'segredo',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // A sessão expira em 1 dia
}));

// Verificando sessões
app.use((req, res, next) => {
    if (req.session.usuarioId) {
        req.usuario = usuarios.find(u => u.ID === req.session.usuarioId);
    }
    next();
});