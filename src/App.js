import "./App.css";
import {
  FacebookAuthProvider,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "./Firebase/firebase.init";
import { useState } from "react";
const auth = getAuth(app);
function App() {
  const [user, setUser] = useState({});
  const [error, setError] = useState({});
  const googleProvider = new GoogleAuthProvider();
  const gitHubProvider = new GithubAuthProvider();
  const facebookProvider = new FacebookAuthProvider()

  const handelGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
      })
      .catch((error) => {
        setError(error)
        console.error("error occured:", error);
      });
  };
  const handelgitHubSignIn = () => {
    signInWithPopup(auth, gitHubProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch((error) => {
        setError(error)
        console.error("error occured:", error);
      });
  };
  const handelfbSignIn = () => {
    signInWithPopup(auth, facebookProvider)
    .then((result) => {
      const user = result.user;
      setUser(user);
      console.log(user);
    })
    .catch((error) => {
      setError(error)
      console.error("error occured:", error);
    });
  }
  const handelSignOut = () => {
    signOut(auth)
      .then(setUser({}))
      .catch((error) => {
        setUser({});
        console.log(error);
      });
  };

  return (
    <div className='App'>
      {!user.email ? (
        <>
          <button onClick={handelGoogleSignIn}>Sign in with google</button>
          <button onClick={handelgitHubSignIn}>Sign in with gitHub</button>
          <button onClick={handelfbSignIn}>Sign in with Facebook</button>
        </>
      ) : (
          <button onClick={handelSignOut}>Sign Out</button>
          
      )}
      
      <div className='user'>
        {/* {
          error ? <p>{error}</p>: 'Log In Successfully!'
        } */}
        {user.email && (
          <div className='card'>
            <img src={user.photoURL} alt='Avatar' />
            <div className='container'>
              <h4>
                <b>{user.displayName}</b>
              </h4>
              <p>{user.email}</p>
              <p>{user.providerId}</p>
              {/* <p>isVarified:{user.providerData[0].providerId}</p> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
