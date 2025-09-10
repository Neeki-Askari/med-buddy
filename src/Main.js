import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import App from "./App"

const Main = () => {
    const { isAuthenticated, isLoading, loginWithRedirect, user } = useAuth0();
    const { error } = useAuth0();
    console.log(error);
  
    if (isLoading) {
      return <div>Loading ...</div>;
    }

    if (!isAuthenticated) {
        loginWithRedirect()
    } else {
        return (
            <App user={user}/>
        );
        
        
    }
  };
  
  export default Main;