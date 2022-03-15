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
    StatusBar,
    KeyboardAvoidingView,
} from 'react-native'

import LinearGradient from 'react-native-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import {AuthContext} from '../navigation/AuthProvider'
import Snackbar from 'react-native-snackbar'
import firestore from '@react-native-firebase/firestore'
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper'



const SignUp = ({navigation}) => {


    const [data, setData] = useState({
        Name:'',
        email:'',
        password:'',
        check_textInputChange : false,
        secureTextEntry: true,
        phone:''
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

    const textNameChange = (val) =>{
        setData({
            ...data,
            Name:val
        })
    }

    const handleMobileChange = (val) =>{
        setData({
            ...data,
            phone:val
        })
    }


    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        })
    }

    const {register,user} = useContext(AuthContext);

   


    return (
        
        <View style={{flex:1,backgroundColor:'#fff'}}>
        <KeyboardAvoidingWrapper>
        <View style = {styles.container}>
            <StatusBar backgroundColor="#5728bd" barStyle="light-content"  />
            
            <View style={styles.header}>
                <Text style = {styles.text_header}>Register Now!</Text>
            </View>
        
            <View style = {styles.footer}>
            <Text style={styles.text_footer} >Name</Text>
                <View style={styles.action}>
                    <FontAwesome
                    name = "user"
                    color = "#5728bd"
                    size = {25}
                    />
                    <TextInput 
                    placeholder = "Your Name"
                    style = {styles.textInput}
                    autoCapitalize = "none"
                    keyboardType = "default"
                    onChangeText = {(val)=>textNameChange(val)}
                    />
                </View>

                <Text style={[styles.text_footer,{
                    marginTop:20
                }]} >Email</Text>
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
                    marginTop:20
                }]} >Mobile Number</Text>
                <View style={styles.action}>
                    <FontAwesome
                    name = "phone"
                    color = "#5728bd"
                    size = {25}
                    />
                    <TextInput 
                    placeholder = "Your Mobile No"
                    style = {styles.textInput}
                    keyboardType='phone-pad'
                    onChangeText = {(val)=>handleMobileChange(val)}
                    />
                    
                </View>
                
                <KeyboardAvoidingView
                behavior={Platform.OS==='ios' ? 'padding' : null}
                >
                <Text style={[styles.text_footer,{
                    marginTop:20
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
                </KeyboardAvoidingView>

                <TouchableOpacity style = {styles.button}
                onPress = {
                     ()=> {(data.Name==='' || data.email=='' || data.password==='' ||
                     data.phone.length!=10 ) ?
                        Snackbar.show({
                            text: "Please check & fill all fields",
                            backgroundColor:'red',
                            textcolor:'#fff'
                        })
                    :
                    register(data.Name,data.email,data.password,data.phone)}
      
                }
                    
                >
                    <LinearGradient
                    colors = {["#5728bd","#825ada"]}
                    style = {styles.signIn}
                    >
                        <Text style = {styles.textSign}>Sign Up</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <View
                style = {styles.signInText}
                >
                <Text style = {{fontSize:15}}>Already have an account,</Text>
                <View style={{flex:1,alignItems:'flex-start'}}>
                <TouchableOpacity
                onPress = {()=> navigation.goBack()}
                >
                    <Text style = {{fontSize:15, color:"#5728bd"}}> Sign In here.</Text>
                </TouchableOpacity>
                </View>
                </View>
            </View>
        </View>
        </KeyboardAvoidingWrapper>
        </View>
        
    );
            }

export default SignUp;


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#5728BD"
    },
    lineargradient:{
        flex:1,
    },
    header:{
        flex:0.8,
        justifyContent:"flex-end",
        paddingHorizontal:20,
        paddingBottom:50,
        paddingTop:100
    },
    footer:{
        flex:3.2,
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
    signInText:{
        flex:1,
        flexDirection:'row',
        marginTop:25,
        marginLeft:40,
        justifyContent:'center',
    }
})
