import React from 'react'
import 'react-native-gesture-handler'
import {createStackNavigator} from '@react-navigation/stack'
import Home from '../screens/Home'
import Today from '../screens/Today'
import NewOrderScreen from '../screens/NewOrderScreen'
import Preview from '../screens/Preview'
import MyOrders from '../screens/MyOrders'
import Order from '../screens/Order'



const Stack = createStackNavigator();

const HomeStack = () =>{
    return (
        <Stack.Navigator>
            <Stack.Screen  name = "Home" component={Home} options = {{header: ()=>null}}/>
            <Stack.Screen name = "Today" component = {Today} options = {{header: ()=>null}} />
        </Stack.Navigator>
    )
}

const NewOrderStack = ({navigation}) =>{
    const fromScreen = 'Home'
    return (
        <Stack.Navigator>
            <Stack.Screen name = "New Order" component={NewOrderScreen} options = {{header: ()=>null}} initialParams={{ fromScreen: 'Home' }}/>
            <Stack.Screen name = "Preview" component = {Preview} options = {{header: ()=>null}} />
        </Stack.Navigator>
    )
}

const MyOrderStack = () =>{
    return (
        <Stack.Navigator>
            <Stack.Screen name = "My Orders" component={MyOrders} options = {{header: ()=>null}}/>
            <Stack.Screen name = "Order" component = {Order} options = {{header: ()=>null}} />
        </Stack.Navigator>
    )
}


export {HomeStack,NewOrderStack,MyOrderStack}