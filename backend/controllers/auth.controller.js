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
                res.status(400).json({ error: "Invalid User Data"});
            }




        } catch (error) {
            console.log(" Error in signup controller", error.message);
            res.status(500).json({ error: "Something went Wrong"});
        }
};


export const login = async (req, res) => {
  try{

    const {username, password} = req.body;

    const user = await User.findOne({username: username});

    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
    if(!user || !isPasswordCorrect){
      return res.status(400).json({ error: "Invalid username or password"});
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        followers: user.followers,
        following: user.following,
        profileImg: user.profileImg,
        coverImg: user.coverImg
    });


  } catch (error){
    console.log(" Error in login controller", error.message);
    res.status(500).json({ error: "Something went Wrong"});
  }
};

export const logout = async (req, res) => {
    try{
        res.cookie("jwt", "", {maxAge: 0})
        res.status(200).json({ message: "User logged out successfully"});
    } catch (error){
        console.log(" Error in logout controller", error.message);
        res.status(500).json({ error: "Something went Wrong"});
    }   

};


export const getMe = async (req, res) => {
    try{
        const user = await User.findById(req.user._id).select("-password");
        res.status(200).json(user);
    } catch (error){
        console.log(" Error in getMe controller", error.message);
        res.status(500).json({ error: "Something went Wrong"});
    }
};


