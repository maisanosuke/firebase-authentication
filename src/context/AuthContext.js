import React from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, updateEmail, updatePassword, sendPasswordResetEmail} from "firebase/auth";

const userContext = React.createContext();
export const useUserContext = () => React.useContext(userContext);

export function AuthProvider({children}){
    const [currentUser, setCurrentUser] = React.useState();
    
    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if(user){//user is signed in update currentUser
                console.log('user data is updated: ', user);
                setCurrentUser(user);
            }else{//user is signed out update current user to null
                console.log('user data is set to null')
                setCurrentUser(null);
            }
        });
        return unsubscribe;
    }, [])

    const signin = ({email, password}) => signInWithEmailAndPassword(auth, email, password);
    const signup = async ({email, password}) => createUserWithEmailAndPassword(auth, email, password);
    const logout = () => signOut(auth);
    const updateProfileEmail = (email) => updateEmail(auth.currentUser, email);
    const updateProfilePassword = (password) => updatePassword(auth.currentUser, password);

    const sendForgotPasswordEmail = (email) => {
        const actionCodeSettings = {
            // URL you want to redirect back to. 
            url: 'http://localhost:3000/login',
            handleCodeInApp: true
          };
          return sendPasswordResetEmail(auth, email, actionCodeSettings);
    }

    const value = {
        currentUser,
        signin,
        signup,
        logout,
        updateProfileEmail,
        updateProfilePassword,
        sendForgotPasswordEmail,
    }

    return (
        <userContext.Provider value={value}>
            {children}
        </userContext.Provider>
    )
}