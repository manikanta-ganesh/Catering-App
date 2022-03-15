import React from 'react'
import 'react-native-gesture-handler'
import {createStackNavigator} from '@react-navigation/stack'

import Tabs from '../navigation/tabs'

const Stack = createStackNavigator();


const AppStack = () => {
    return (
        <Tabs />
    );
}

export default AppStack;