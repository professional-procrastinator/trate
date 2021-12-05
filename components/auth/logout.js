import GoogleLogout from "react-google-login";

export default function Logout(){

    const logOut = (response) => {
        console.log(response)
    }

    return(
        <GoogleLogout
            clientId={process.env.GOOGLE_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={logOut}
            onLogoutFailure={logOut}
            icon={false}
        />
    )
}