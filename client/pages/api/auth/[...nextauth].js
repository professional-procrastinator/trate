import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import connectToDB from "../../../global/api/connectToDB" //connect to the mongodb database

//import models
import User from "../../../models/user"


connectToDB()

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // ...add more providers here
  ],
    callbacks: {
      
      async error(message) {
        console.log(message);
        
      },
      async signIn(req, userAcc) {
        console.log(req,userAcc)
        
        const id_token = userAcc.id_token; //get id token from the request headers
        const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${id_token}`) //verify token, and get user details from google oauth

        const accountData = await response.json()
        const email = accountData.email;
        const user = await User.find({email: email}) //find user in the users collection
        
        if(user.length!==0){ //if user exists
            return;
        }else if(req.id!==accountData.sub){
            return;
        }
        else{
            const firstName = req.name.replace(" ", "")
            const id = Math.random().toString(36).slice(2);

            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
              color += letters[Math.floor(Math.random() * 16)];
            }
            const profileColor = color;

            const newUser = new User({
                name: req.name,
                username:firstName+'-'+id,
                email:req.email,
                image: req.image,
                banner:profileColor,
                bio:`Hi, I'm ${req.name}!`,
            }) //save the new user in the users collection
            newUser.save()
        }
      }
  },
  pages: {
    signIn: '/',
  },
  debug: true

  // A database is optional, but required to persist accounts in a database
  // database: process.env.DATABASE_URL,
});