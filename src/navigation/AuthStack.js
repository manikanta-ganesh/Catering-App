import React from 'react'
import {View,StatusBar} from 'react-native'
import 'react-native-gesture-handler'


import {createStackNavigator} from '@react-navigation/stack'
import SignIn from '../screens/SignIn'
import SignUp from '../screens/SignUp'

const Stack = createStackNavigator();

const AuthStack = () =>{
    return (
        <Stack.Navigator
        initialRouteName = "SignIn"
        >
            <Stack.Screen
            name = "SignIn"
            component = {SignIn}
            options = {{header: ()=>null}}
            />
            
            <Stack.Screen
            name = "SignUp"
            component = {SignUp}
            options = {{header: ()=>null}}
            />
            
        </Stack.Navigator>

    );
}

export default AuthStack;




