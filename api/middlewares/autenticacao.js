const senha = '123';

const autenticar = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token === senha){
        next()
    } else {
        res.status(401).send('Acesso não autorizado')
    }
};

module.exports = autenticar;