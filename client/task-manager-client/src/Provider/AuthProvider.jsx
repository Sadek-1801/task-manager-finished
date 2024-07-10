import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider } from "firebase/auth";
import PropTypes from "prop-types"
import auth from "../firebase/firebase.config";
import axios from 'axios';

export const AuthContext = createContext(null)
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loader, setLoader] = useState(true)
    // create user
    const createUser = (email, password) => {
        setLoader(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }
    // update profile
    const updateUserProfile = (name, image) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: image
        })
    }

    // sign In
    const signIn = (email, password) => {
        setLoader(true)
        return signInWithEmailAndPassword(auth, email, password);
    }
    // logout
    const logOut = async() => {
        setLoader(true)
        await axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
            withCredentials: true,
        })
        return signOut(auth)
    }
    // google log in
    const googleLogin = () => {
        setLoader(true)
        return signInWithPopup(auth, googleProvider)
    }
    // token implementation
    const getToken = async email => {
        const { data } = await axios.post(
            `${import.meta.env.VITE_SERVER}/jwt`,
            { email },
            { withCredentials: true }
        )
        return data
    }

    // save user
    const saveUser = async user => {
        const currentUser = {
            email: user?.email,
            role: 'user',
        }
        const { data } = await axios.put(
            `${import.meta.env.VITE_SERVER}/user`,
            currentUser
        )
        return data
    }


    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async currentUser => {
            setUser(currentUser);
            if (currentUser) {
                getToken(currentUser.email)
                saveUser(currentUser)
            }
            setLoader(false)
        });
        return () => {
            unSubscribe();
        }
    }, [])


    const authInfo = {
        user,
        createUser,
        signIn,
        updateUserProfile,
        logOut,
        googleLogin,
        loader,
        setLoader
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node
}

export default AuthProvider;