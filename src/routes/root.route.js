import express from 'express';
import {validToken} from "../middlewares/jwt.token.middleware.js";
const route = express.Router();

route.get('/', validToken, (req, res) => {
    res.send('Hello World! It works!')
  })

route.post('/', async (req, res) => {



    const {name, email, password } = req.body;

    const verifcyUser = await User.findOne({email:email}) 
    
    if (verifcyUser){

      res.status(422).json({
        message: 'Utilizar outro E-mail.'});

    }

    try {

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();

        res.status(201).json({
            message: "User criado com sucesso.",
            user: savedUser
        });
    } catch (error) {

        res.status(500).json({
            msg: 'Aconteceu um erro.',
            error: error.message
        });
    }
});


export default route;