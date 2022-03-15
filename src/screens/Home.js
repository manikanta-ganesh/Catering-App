import React, { useContext, useEffect, useState } from 'react'
import {View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    StatusBar,
    ImageBackground
} from 'react-native'
import {AuthContext} from '../navigation/AuthProvider'
import firestore from '@react-native-firebase/firestore'

const Home = ({navigation,route}) => {
    const {user, logout} = useContext(AuthContext);
    const [userName,setUserName] = useState('');
    useEffect(()=>{
        firestore()
        .collection('Users')
        .doc(user.uid)
        .get()
        .then((snapShot)=>{
         const {name} = snapShot.data();
         console.log(snapShot)
         setUserName(name);
        })
        
        
    },[navigation])

    
    
    

    return (
        <View style={{flex:1,backgroundColor:'#fff'}}>
            <StatusBar backgroundColor = "#5728bd" barStyle = 'light-content'/>
            <View style={{height:50,backgroundColor:"#5728bd",alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:20,color:'#fff',fontWeight:'bold'}}>Datta Sai Caterings</Text>
            </View>

            <View style={{margin:20,flex:1}}>
                <ScrollView>
                <View style={{justifyContent:'center'}}>
                    <Text style={{fontSize:25, color:'#fc7b03', fontWeight:'bold'}}>Hello {userName}</Text>
                </View>
                <View style={{marginTop:10,alignItems:'center'}}>
                <Text style={styles.subtitle}>What are you looking for?</Text>
                </View>

                <View style={styles.tile_container}>
                    {/* <View style={styles.tile}>
                        <Text style = {styles.tile_text}>Curry Point</Text>
                    </View>
                    <View style={[styles.tile,{backgroundColor:"#fc65cc"}]}>
                        <Text style = {styles.tile_text}>Catering</Text>
                    </View> */}
                    

                    <TouchableOpacity
                    onPress = {()=>navigation.navigate("Today")}
                    style={styles.tile}
                    >
                    <ImageBackground source = {require('../assests/images/Curry_point_image.jpg')}
                    style={{width:'100%',height:'100%',justifyContent:'flex-end',alignItems:'center'}}
                    >
                        <Text style = {styles.tile_text}>Curry Point</Text>
                    </ImageBackground>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                    onPress = {()=>navigation.navigate("New Order",{
                        screen: 'New Order',
                        params: { fromScreen:'Home'},
                      })}
                    style={styles.tile}
                    >
                    <ImageBackground source = {require('../assests/images/Catering1.jpg')}
                    
                    style={{width:'100%',height:'100%',justifyContent:'flex-end',alignItems:'center'}}
                    >
                        <Text style = {styles.tile_text}>Catering</Text>
                    </ImageBackground>
                    </TouchableOpacity>

                </View>
                </ScrollView>
                <View style={{marginBottom:50}}/>
            </View>
        </View>
    );
}

export default Home;

const styles = StyleSheet.create({

    title_header:{
        flex:1,
        alignItems:'flex-start',
        justifyContent:'center',
        marginTop:20,
    },
    subtitle:{
        color:'grey',
        fontSize:18,
        marginTop:10
    },
    tile_container:{
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'

    },
    tile:{
        width:'100%',
        height:170,
        borderRadius:10,
        margin:10,
        marginTop:20,
       
    },
    tile_text:{
        fontSize:25,
        color:'#fff',
        fontWeight:'bold'
    }
    

})

// light blue #A7CBD9
//blue : 24A6D9
//