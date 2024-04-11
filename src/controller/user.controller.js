import userService from '../services/user.service.js';
import mongoose from 'mongoose';

const create = async (req, res) => {
    const requiredFields = ['name', 'email', 'password'];
    for (const field of requiredFields) {
        if (!req.body[field]) {
            return res.status(400).json({ error: `Please add the field ${field}` });
        }
    }
    if (req.body.password.length < 8) {
        return res.status(400).json({ error: 'Password must be at least 8 characters' });
    }
    if (await userService.findByEmail(req.body.email)) {
     
        return res.status(400).json({ error: 'email already registered' });
    }
    const user = await userService.create(req.body);

    if (!user) {
        return res.status(400).json({ error: 'Error creating User' });

    }
    res.status(201).json({
        message: "User created",
        id: user._id
    });
};

const findByEmail = async (req, res) => {
    const email = req.params.email;

     if (!mongoose.Types.ObjectId.isValid(email)) {
        return res.status(404).json({ error: 'Invalid Email' });
     }   
    const user = await userService.findByEmail(email);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    res.status(200).json(user);
}

export default { create, findByEmail };