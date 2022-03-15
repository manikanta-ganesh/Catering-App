import React, {useContext, useState} from 'react'

import {
    Text,
    TouchableOpacity,
    Dimensions,
    SafeAreaView,
    ScrollView,
    TextInput,
    View,
    Button,
    StyleSheet,
    Platform,
    StatusBar
} from 'react-native'

import LinearGradient from 'react-native-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import {AuthContext} from '../navigation/AuthProvider'
import Snackbar from 'react-native-snackbar'

const SignIn = ({navigation}) => {

    const [data, setData] = useState({
        email:'',
        password:'',
        check_textInputChange : false,
        secureTextEntry: true
    })

    const textInputChange = (val) => {
        if(val.length!==0){
            setData({
                ...data,
                email:val,
                check_textInputChange:true
            })
        }else{
            setData({
                ...data,
                email:val,
                check_textInputChange:false
            })
        }
    }

    const handlePasswordChange = (val) =>{
        setData({
            ...data,
            password:val
        })
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        })
    }

    const {login} = useContext(AuthContext);

    return (
        
        <View style = {styles.container}>
            <StatusBar backgroundColor="#5728bd" barStyle="light-content"  />
            
            <View style={styles.header}>
                <Text style = {styles.text_header}>Welcome!</Text>
            </View>
        
            <View style = {styles.footer}>
                <Text style={styles.text_footer} >Email</Text>
                <View style={styles.action}>
                    <FontAwesome
                    name = "envelope"
                    color = "#5728bd"
                    size = {20}
                    />
                    <TextInput 
                    placeholder = "Your Email"
                    style = {styles.textInput}
                    autoCapitalize = "none"
                    keyboardType = "email-address"
                    onChangeText = {(val)=>textInputChange(val)}
                    />
                    {data.check_textInputChange ? 
                    <Feather
                    name = "check-circle"
                    color = "green"
                    size = {20}
                    /> : null }
                </View>

                <Text style={[styles.text_footer,{
                    marginTop:35
                }]} >Password</Text>
                <View style={styles.action}>
                    <FontAwesome
                    name = "lock"
                    color = "#5728bd"
                    size = {25}
                    />
                    <TextInput 
                    placeholder = "Your Password"
                    secureTextEntry = {data.secureTextEntry ? true : false}
                    style = {styles.textInput}
                    autoCapitalize = "none"
                    onChangeText = {(val)=>handlePasswordChange(val)}
                    />
                    <TouchableOpacity
                    onPress = {updateSecureTextEntry}
                    >
                    {data.secureTextEntry ? 
                    <Feather
                    name = "eye-off"
                    color = "grey"
                    size = {20}
                    />
                    :
                    <Feather
                    name = "eye"
                    color = "grey"
                    size = {20}
                    />}
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style = {styles.button}
                onPress = {()=> {(data.email=='' || data.password==='') ?
                Snackbar.show({
                    text: "Please fill all fields",
                    backgroundColor:'red',
                    textcolor:'#fff'
                })
                :
                login(data.email,data.password)}}
                >
                    <LinearGradient
                    colors = {["#5728bd","#825ada"]}
                    style = {styles.signIn}
                    >
                        <Text style = {styles.textSign}>Sign In</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <View
                style = {styles.signUpText}
                >
                <Text style = {{fontSize:15}}>Don't have an account,</Text>
                <View style={{flex:1,alignItems:'flex-start'}}>
                <TouchableOpacity
                onPress = {()=> navigation.navigate("SignUp")}
                
                >
                    <Text style = {{fontSize:15, color:"#5728bd"}}> Sign Up here.</Text>
                </TouchableOpacity>
                </View>
                </View>
            </View>
        </View>
        
    );
}

export default SignIn;


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#5728BD"
    },
    lineargradient:{
        flex:1,
    },
    header:{
        flex:1,
        justifyContent:"flex-end",
        paddingHorizontal:20,
        paddingBottom:50
    },
    footer:{
        flex:3,
        backgroundColor:"#fff",
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        paddingHorizontal:20,
        paddingVertical:30
    },
    text_header:{
        color:"#fff",
        fontWeight:"bold",
        fontSize:30
    },
    text_footer:{
        color:"#5728bd",
        fontSize:18
    },
    action:{
        flexDirection:"row",
        marginTop:10,
        borderBottomWidth:1,
        borderBottomColor:"#f2f2f2",
    },
    textInput:{
        flex:1,
        marginTop: Platform.OS==='ios' ? 0:-12,
        paddingLeft:10,
        color:"#05375a"
    },
    button:{
        alignItems:"center",
        marginTop:50
    },
    signIn:{
        width:'100%',
        height:50,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:10
    },
    textSign:{
        fontSize:18,
        fontWeight:'bold',
        color:"#fff"
    },
    signUpText:{
        flex:1,
        flexDirection:'row',
        marginTop:25,
        marginLeft:50,
        justifyContent:'center',
    }
})
