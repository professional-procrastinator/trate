import connectToDB from "../../global/api/connectToDB";
import User from "../../models/user";
import {getSession} from 'next-auth/client';



connectToDB();

export default async function handler(req, res) {
  const session = await getSession({req});
  if(!session){
    res.status(401).json({error: "Auth_Invalid"});
  }else{
    const email = session.user.email;
    const user = await User.findOne({ email:email });
    if (!user) {
      res.status(401).json({error: "User_Not_Found"});
    }else{
      res.status(200).send({user:user,error:'None'});
    }
  }
}
