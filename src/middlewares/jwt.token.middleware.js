
import jwt from'jsonwebtoken'

export const validToken = (req, res, next) => {
    let token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }
  
    token = token.replace('Bearer ', '')
  
    jwt.verify(token,  process.env.SECRET_JWT_KEY, (err, decoded) => {
      if (err) {
        console.error('JWT verify error:', err)
        return res.status(403).json({ message: 'Token inválido' });
      }
  
      req.usuario = decoded; 
      next();
    });
  };
