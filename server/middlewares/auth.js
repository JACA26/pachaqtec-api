const jwt = require('jsonwebtoken');


// ============================
//  Verificar Token
// ============================

const verificarToken = (req, res, next) => {
    //obtener el header llamado token
    let token = req.get('token')
    
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            });
        }
        
        req.user = decoded.user;
        next();
    })
}



module.exports = {
    verificarToken,
}