import React,{useEffect,useState} from 'react'
import {StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Keyboard
} from 'react-native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import MyOrders from '../screens/MyOrders'
import {HomeStack,NewOrderStack,MyOrderStack } from './NestedNavigation'
import Profile from '../screens/Profile'
import About from '../screens/About'

const Tab = createBottomTabNavigator();


const CustomTabBarButton = ({children,onPress}) =>{

    return (
    <TouchableOpacity
    style = {{
        top:wp('-7%'),
        justifyContent:'center',
        alignItems:'center',
        
    }}
    onPress = {onPress}
    >
        <View  style={{
            width:wp('15%'),
            height:wp('15%'),
            borderRadius:wp('7.5%'),
            backgroundColor:'#5728bd',
            ...styles.shadow
        }}>
            {children}
        </View>
    </TouchableOpacity>

    )

}


const Tabs = () =>{

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

 useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

    return (
        <Tab.Navigator
        initialRouteName='Home'
        tabBarOptions = {{
            showLabel : false,
            style:{
                position:'absolute',
                bottom: isKeyboardVisible ? -100 : 20 ,
                left:wp('4%'),
                right:wp('4%'),
                elevation:0,
                height:hp('7%'),
                borderRadius:wp('3.75%'),
                backgroundColor:"#fff",
                ...styles.shadow
            },
            
        }}
        >
            <Tab.Screen
            name = "Home"
            component = {HomeStack}
            options = {{
                tabBarIcon: ({focused})=>(
                    <View
                    style={{alignItems:'center',justifyContent:'center'}}
                    >
                        <Image
                        source = {require('../assests/icons/home.png')}
                        resizeMode = 'contain'
                        style = {{
                            width:25,
                            height:25,
                            tintColor: focused ? "#5728bd" : "#748c94"
                        }}
                        />
                        <Text style = {{color: focused ? "#5728bd" : "#748c94", fontSize:10}}>HOME</Text>
                    </View>
                ),
            }}
            />

            <Tab.Screen
            name = "My Orders"
            component = {MyOrderStack}
            options = {{
                tabBarIcon: ({focused})=>(
                    <View
                    style={{alignItems:'center',justifyContent:'center'}}
                    >
                        <Image
                        source = {require('../assests/icons/cart.png')}
                        resizeMode = 'contain'
                        style = {{
                            width:25,
                            height:25,
                            tintColor: focused ? "#5728bd" : "#748c94"
                        }}
                        />
                        <Text style = {{color: focused ? "#5728bd" : "#748c94", fontSize:10}}>MY ORDERS</Text>
                    </View>
                ),
            }}
            />

            <Tab.Screen
            name = "New Order"
            component = {NewOrderStack}
            options = {{
                tabBarIcon: ({focused}) =>(
                    <Image
                    source = {require('../assests/icons/plus.png')}
                    resizeMode = 'contain'
                    style= {{
                        width:40,
                        height:40,
                        tintColor:"#fff"
                    }}
                    />
                ),
                tabBarButton: (props) =>(
                    <CustomTabBarButton {...props} />
                )
            }}
            initialParams={{fromScreen:'Home'}}
            />

            <Tab.Screen
            name = "My Account"
            component = {Profile}
            options = {{
                tabBarIcon: ({focused})=>(
                    <View
                    style={{alignItems:'center',justifyContent:'center'}}
                    >
                        <Image
                        source = {require('../assests/icons/user.png')}
                        resizeMode = 'contain'
                        style = {{
                            width:25,
                            height:25,
                            tintColor: focused ? "#5728bd" : "#748c94"
                        }}
                        />
                        <Text style = {{color: focused ? "#5728bd" : "#748c94", fontSize:10}}>MY ACCOUNT</Text>
                    </View>
                ),
            }}
            />

            <Tab.Screen
            name = "About Us"
            component = {About}
            options = {{
                tabBarIcon: ({focused})=>(
                    <View
                    style={{alignItems:'center',justifyContent:'center'}}
                    >
                        <Image
                        source = {require('../assests/icons/info.png')}
                        resizeMode = 'contain'
                        style = {{
                            width:25,
                            height:25,
                            tintColor: focused ? "#5728bd" : "#748c94"
                        }}
                        />
                        <Text style = {{color: focused ? "#5728bd" : "#748c94", fontSize:10}}>ABOUT US</Text>
                    </View>
                ),
            }}
            />

        </Tab.Navigator>

    );
}

export default Tabs;

const styles = StyleSheet.create({

    shadow:{
        shadowColor:"#000",
        shadowOffset:{
            width:0,
            height:10
        },
        shadowOpacity:0.25,
        shadowRadius:3.5,
        elevation:5
    }
    

})