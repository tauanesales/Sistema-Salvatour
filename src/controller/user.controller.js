const userService = require('../services/user.service');

const create = async (req, res) => {
    const requiredFields = ['name', 'email', 'password'];

    for (const field of requiredFields) {
        if (!req.body[field]) {
            return res.status(400).json({ error: `Please add the field ${field}` });
        }
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

module.exports = { create };