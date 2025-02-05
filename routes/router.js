const express = require('express')
const router = express.Router()
const pool = require('../dbconnection')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')

router.post('/register', async (req,res) =>{
    const {name,age,email,password} = req.body

    if(!email|| !password|| !name ||!age){
        return res.status(500).json({messege:'All fields are required'});
    }

    try{
        const [existingUser] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Email is already registered' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.query('INSERT INTO users (name, age, email, password) VALUES (?, ?, ?, ?)', [name, age, email, hashedPassword]);
        res.status(201).json({ message: 'User registered', userId: result.insertId });
    } 
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Registration failed' });
    }
}
)

router.post('/login',async(req,res)=>{
    const {email , password} = req.body

    if(!email|| !password){
        return res.status(500).json({messege:'Email and password are required'});
    }
try{
    const [users]= await pool.query('SELECT * FROM users WHERE email = ? ',[email])
    if (users.length === 0) {
        return res.status(401).json({ message: 'Invalid email' });
      }
      const user = users[0];

      const Match = await bcrypt.compare(password, user.password);
      if (!Match) {
        return res.status(401).json({ message: 'Invalid password' });
      }

        const token = JWT.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Logged In', token, name : user.name });
}
catch(err){
    console.log(err);
    res.status(500).json({messege:"login failed"});
}

}
)


module.exports=router