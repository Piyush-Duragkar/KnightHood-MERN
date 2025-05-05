import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { generateTokenAndSetCookie } from '../../lib/utils/generateToken.js';



export const signup = async (req, res) => {
        try{
            const {username, email, password} = req.body;
            const emailRegrex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!emailRegrex.test(email)){
                return res.status(400).json({ error: "Invalid email format"});
            }

            const existingUser = await User.findOne({username:username});
            if(existingUser){
                return res.status(400).json({ error: "Username already exists"});
            }

            const existingEmail = await User.findOne({email:email});
            if(existingEmail){
                return res.status(400).json({ error: "Email already exists"});
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = new User({
                username,
                email,
                password: hashedPassword,
            });

            if(newUser){
                generateTokenAndSetCookie(newUser._id, res)
                await newUser.save();  
                
                res.status(201).json({
                    _id: newUser._id,
                    username: newUser.username,
                    email: newUser.email,
                    followers: newUser.followers,
                    following: newUser.following,
                    profileImg: newUser.profileImg,
                    coverImg: newUser.coverImg
                });
            } else {
                console.log(" Error in signup controller", error.message);
                res.status(400).json({ error: "Something went wrong"});
            }




        } catch (error) {
            res.status(500).json({ error: "Something went Wrong"});
        }
};


export const login = async (req, res) => {
    res.json({
        data: "we are on the login page",
    });
};

export const logout = async (req, res) => {
    res.json({
        data: "we are on the logout page",
    });
};

