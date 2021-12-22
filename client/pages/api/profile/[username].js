// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectToDB from "../../../global/api/connectToDB" //connect to the mongodb database

//import models
import User from "../../../models/user"

export default async function handler(req, res) {
    const {username} = req.query;
    const user = await User.find({username: username});
    if(user.length === 0) {
        res.status(404).json({
            status: "error",
            details: "User not found"
        })
    }else{
        res.status(200).json({
            status: "success",
            details: user[0],
        });
    }
}
  