import React, { createContext, useState } from 'react'
import auth from '@react-native-firebase/auth'
import Snackbar from 'react-native-snackbar'
import firestore from '@react-native-firebase/firestore'

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    return (
        <AuthContext.Provider
        value = {{
            user,
            setUser,
            login: async (email,password) =>{
                try {
                    await auth().signInWithEmailAndPassword(email,password)
                } catch (error) {
                    console.log(error)
                    Snackbar.show({
                        text: "SignIn Failed",
                        textColor: 'white',
                        backgroundColor:'red'
                    })
                }
            },
            register: async (name,email,password,phone) =>{
                try {
                  await auth().createUserWithEmailAndPassword(email,password)
                  .then(()=>{
                      firestore()
                      .collection("Users").doc(auth().currentUser.uid)
                      .set({
                          name,
                          email,
                          UserId: auth().currentUser.uid,
                          phone
                      })
                  })
                    
                } catch (error) {
                    console.log(error)
                    Snackbar.show({
                        text: "SignUp Failed",
                        textColor: 'white',
                        backgroundColor:'red'
                    })
                }
            },
            logout: async () =>{
                try {
                    await auth().signOut();
                } catch (e) {
                    console.log(e);
                    Snackbar.show({
                        text: "SignOut Failed",
                        textColor: 'white',
                        backgroundColor:'red'
                    })
                }
            }
        }}
        >
            {children}
        </AuthContext.Provider>
    );
}