import {loginService, generateToken} from '../services/auth.service.js';

import dotenv from "dotenv";

dotenv.config();

const login = async (req, res) => {
   
    const requiredFields = ['email', 'password'];

    for (const field of requiredFields) {
        if (!req.body[field]) {
            return res.status(400).json({ error: `Please provide the ${field}` });
        }
    }

    let user = await loginService(req.body.email);

    if (!user) {
         return res.status(404).json({ error: 'User not found' });
    }

    if (user.password != req.body.password) {
        return res.status(404).json({ error: 'Invalid password' });
    }

    const token = generateToken(user.id)
    
    res.status(200).json({token}, "isAdmin: " + user.isAdmin )

}

export default { login };