
import jwt from'jsonwebtoken'

export const validToken = (req, res, next) => {
    let token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ message: 'Token not provided' });
    }
  
    token = token.replace('Bearer ', '')
  
    jwt.verify(token,  process.env.SECRET_JWT_KEY, (err, decoded) => {
      if (err) {
        console.error('JWT verify error:', err)
        return res.status(403).json({ message: 'Invalid token' });
      }
  
      req.usuario = decoded; 
      next();
    });
  };

// module.exports = validToken