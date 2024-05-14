import userService from '../services/user.service.js';
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
    const user = await userService.create(req.body);

    res.status(201).json({
        message: "User created",
        id: user._id
    });
};

const findAll = async(req, res) =>{
    const users = await userService.findAll();

    if(users.length === 0){
        return res.status(400).json({ error: 'There are no registered users' });
    }
    res.json(users);
}

const findById = async (req, res) => {
    const user = req.user;
    res.status(200).json(user);
}

const update = async(req, res) =>{
    const{name, email, password} = req.body;
    if(!name && !email && !password){
        return res.status(400).json({ error: 'Please add at least one of the fields: name, email, password' });
    }
    const id = req.id;

    await userService.updateService(
        id,
        name,
        email,
        password
    );
    res.json({message: 'User successfully updated!'});
};
export default { create, findAll,findById, update};