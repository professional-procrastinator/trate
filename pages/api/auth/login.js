import connectToDB from "../../../global/api/connectToDB" //connect to the mongodb database

//import models
import User from "../../../models/user"


connectToDB()

export default async function handler(req, res) {
    if(req.method==='GET') {
        const id_token = req.headers.authorization; //get id token from the request headers
        const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${id_token}`) //verify token, and get user details from google oauth

        if (response.status>=400){
            res.status(400).send('Invalid token') //invalid token; refresh page to regenerate token
        }

        else{
            const accountData = await response.json()
            const email = accountData.email;

            const user = await User.find({email: email}) //find user in the users collection
            
            if(user.length!==0){ //if user exists
                return res.status(200).send({details: user[0]}) //send user details
            }else{
                const newUser = new User({
                    name: accountData.name,
                    email:email,
                    image: accountData.picture,
                }) //save the new user in the users collection
                newUser.save()
                return res.status(200).send({details: newUser}) //send user details
            }
        }

    }
    
    else{
        res.status(401).send('This method is not allowed.');
    }

}
  