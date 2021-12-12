import express from 'express';
import expressAssyncHandler from 'express-async-handler';
import User from "../models/userModel.js";
import data from "../data.js";

const userRouter = express.Router();

userRouter.get('/seed', expressAssyncHandler(async (req, res) =>{
    await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({createdUsers});
}));

export default userRouter;