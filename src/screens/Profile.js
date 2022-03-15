import React,{useContext, useState,useEffect} from "react";
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Image,
    Dimensions,
    TextInput,
    Platform,
    KeyboardAvoidingView
} from 'react-native'
import {AuthContext} from '../navigation/AuthProvider'
import LinearGradient from 'react-native-linear-gradient'
import firestore from '@react-native-firebase/firestore'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Snackbar from "react-native-snackbar";
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";

const Width = Dimensions.get('window').width;
const Profile = ({navigation}) =>{
    const {user,logout} = useContext(AuthContext);
    const [userName,setUserName] = useState('');
    const [email,setEmail] = useState('');
    const [phone,setPhone] = useState('');
    const [edit,setEdit] = useState(false);
    const [changedName,setChangedName] = useState('');
    const [changedphone,setChangedphone] = useState('');
    useEffect(()=>{
        firestore()
        .collection('Users')
        .doc(user.uid)
        .get()
        .then((snapShot)=>{
         const {name,email,phone} = snapShot.data();
         console.log(snapShot)
         setUserName(name);
         setEmail(email);
         setPhone(phone)
        })
        
        
    },[edit])

    const upDatedB = () =>{
        if(changedName=='' || changedphone.length!=10){
           return Snackbar.show({
                text: "Please check & fill all fields",
                textColor: 'white',
                backgroundColor:'red'
            })
        }

        try {
            firestore()
            .collection('Users')
            .doc(user.uid)
            .update({
                name:changedName,
                phone:changedphone
            })
            .then(()=>{
                console.log('Details Updated')
                setEdit(false);
            })
            
        } catch (error) {
            console.log(error);
        }

    }

    // if(edit){
    //     navigation.setOptions({tabBarVisible: false})
    // }else{
    //     navigation.setOptions({tabBarVisible: true})
    // }

    return (
        <View style = {{flex:1,backgroundColor:'#fff'}}>
        <KeyboardAvoidingWrapper>
        <View>
            <View style={{height:50,backgroundColor:"#5728bd",alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:20,color:'#fff',fontWeight:'bold'}}>Datta Sai Caterings</Text>
            </View>
            <View style={{marginTop:10,justifyContent:'center',alignItems:'center'}}>
            <Image source={require('../assests/images/account1.png')}
            style={{width:Width/2-50,height:Width/2-50}}
            />
            </View>

            <View style={{margin:15}}>
            <Text style={styles.text_footer} >Name</Text>
                <View style={styles.action}>
                    <FontAwesome
                    name = "user"
                    color = "#5728bd"
                    size = {25}
                    />
                    {edit ? 
                    <TextInput 
                    placeholder = "Your Name"
                    style = {styles.textInput}
                    autoCapitalize = "none"
                    keyboardType = "default"
                    onChangeText = {(val)=>setChangedName(val)}
                    />
                    :
                    <Text style={styles.text}>{userName}</Text>
                    }
                </View>

                <Text style={[styles.text_footer,{
                    marginTop:20
                }]} >Email</Text>
                <View style={styles.action}>
                    <FontAwesome
                    name = "envelope"
                    color = "#5728bd"
                    size = {25}
                    />
                    <Text style={styles.text}>{email}</Text>
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
                    {edit ?
                    
                    <TextInput 
                    placeholder = "Your Mobile No"
                    style = {styles.textInput}
                    keyboardType='phone-pad'
                    onChangeText = {(val)=>setChangedphone(val)}
                    />
                    :    
                
                    <Text style={styles.text}>{phone}</Text>
                    }
                </View>
                </View>

                {edit?

                <View  style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity
                style = {styles.button}
                onPress = {()=>{upDatedB()}}
                >
                    <LinearGradient
                        colors = {["#a0c722","#a0c722"]}
                        start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                        style = {styles.save_btn}
                        >
                    <Text style = {{color:'#fff',fontWeight:'bold', fontSize:20}}>Submit</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <View
                style = {styles.button}
                >
                    <TouchableOpacity
                        style = {{backgroundColor:'#fff',borderColor:'#a0c722',
                    width:150,
                    height:45,
                    justifyContent:"center",
                    alignItems:"center",
                    borderRadius:10,
                    paddingHorizontal:20,
                    borderWidth:2
                }}
                onPress = {()=>setEdit(false)}
                        >
                    <Text style = {{color:'#a0c722',fontWeight:'bold', fontSize:20}}>Cancel</Text>
                    </TouchableOpacity>
                </View>

                </View> 

                :


            <View  style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <TouchableOpacity
            style = {styles.button}
            onPress = {()=>{setEdit(true)}}
            >
                <LinearGradient
                    colors = {["#a0c722","#a0c722"]}
                    start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                    style = {styles.save_btn}
                    >
                <Text style = {{color:'#fff',fontWeight:'bold', fontSize:20}}>Edit</Text>
                </LinearGradient>
            </TouchableOpacity>

            <View
            style = {styles.button}
            >
                <TouchableOpacity
                    style = {{backgroundColor:'#fff',borderColor:'#a0c722',
                width:150,
                height:45,
                justifyContent:"center",
                alignItems:"center",
                borderRadius:10,
                paddingHorizontal:20,
                borderWidth:2
            }}
            onPress = {logout}
                    >
                <Text style = {{color:'#a0c722',fontWeight:'bold', fontSize:20}}>Logout</Text>
                </TouchableOpacity>
            </View>

            </View>
            }

        </View>
        </KeyboardAvoidingWrapper>
        </View>
    );
}

export default Profile

const styles = StyleSheet.create({
    save_btn:{
        width:150,
        height:45,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:10,
        paddingHorizontal:20
    },
    button:{
        alignItems:'center',
        marginTop:20,
        marginHorizontal:20,
        justifyContent:'center',
        
    },
    text:{
        fontSize:16,
        color:'#5728bd',
        fontWeight:'500',
        paddingHorizontal:10
    },
    text_footer:{
        color:"#5728bd",
        fontSize:18
    },
    action:{
        flexDirection:"row",
        marginTop:10,
        borderWidth:1,
        borderColor:"#5728bd",
        borderRadius:10,
        padding:10,
        alignItems:'center',
    },
    textInput:{
       // marginTop: Platform.OS==='ios' ? 0:-12,
        paddingLeft:22,
        color:"#5728bd",
        margin:-12,
        fontWeight:'500',
        fontSize:16
    },
})