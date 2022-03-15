import React,{useEffect, useState,useContext} from "react";
import {View,Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Alert
} from 'react-native'
import firestore from '@react-native-firebase/firestore'
import {AuthContext} from '../navigation/AuthProvider'
import LinearGradient from 'react-native-linear-gradient'
import Snackbar from "react-native-snackbar";

const Order = ({navigation,route}) => {
    const {DocId} = route.params;
    const [memCount,setMemCount] = useState("");
    const [address,setAddress] = useState("");
    const [totalPrice,setTotalPrice] = useState(0);
    const [date,setDate] = useState('');
    const [selectedData,setSelectedData] = useState([]);
    const [userName,setUserName] = useState('');
    const {user} = useContext(AuthContext);

    useEffect(()=>{
        try {
            firestore()
            .collection('Orders')
            .doc(DocId)
            .get()
            .then((querySnapShot)=>{
                const {MemCount,Address,TotalPrice,Date,SelectedData} = querySnapShot.data();
                setMemCount(MemCount);
                setAddress(Address);
                setTotalPrice(TotalPrice);
                setDate(Date);
                setSelectedData(SelectedData);
            })
            
        } catch (error) {
            console.log(error)
        }

        try {
        firestore()
        .collection('Users')
        .doc(user.uid)
        .get()
        .then((snapShot)=>{
         const {name} = snapShot.data();
         setUserName(name);
        })
            
        } catch (error) {
            console.log(error)
        }

    },[navigation])

    const deleteOrder = () =>{
        try {
            firestore()
            .collection('Orders')
            .doc(DocId)
            .delete()
            .then(()=>{
                console.log('Order Deleted')
                Snackbar.show({
                    text: "Order Deleted Succesfully",
                    textColor: 'white',
                    backgroundColor:'green'
                })
                navigation.goBack();
            })
            
        } catch (error) {
            console.log(error)
        }
    }




    return (
        <View style={{flex:1,backgroundColor:'#fff'}}>
            <View style={{height:50,backgroundColor:"#5728bd",alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:20,color:'#fff',fontWeight:'bold'}}>Datta Sai Caterings</Text>
            </View>
            <View style = {styles.heading}>
                <Text style = {{fontSize:20,color:'#a0c722',fontWeight:'bold'}}>Details of the Catering:</Text>
            </View>
            <View style = {styles.card}>
                <View style = {styles.text_container}>
                <Text style = {styles.text_heading}>Name:</Text>
                <Text style = {styles.text_content}>{userName}</Text>
                </View>
                <View style = {styles.text_container}>
                <Text style = {styles.text_heading}>Date:</Text>
                <Text style = {styles.text_content}>{date}</Text>
                </View>
                <View style = {styles.text_container}>
                <Text style = {styles.text_heading}>Total Members:</Text>
                <Text style = {styles.text_content}>{memCount}</Text>
                </View>
                <View style = {{flexDirection:'row'}}>
                <Text style = {styles.text_heading}>Address:</Text>
                <Text style = {styles.text_content}>{address}</Text>
                </View>
                <Text style = {styles.text_heading}>Selected Items:</Text>
                <View
                style = {styles.flatList_style}
                >
                <FlatList
                showsVerticalScrollIndicator={false}
                data = {selectedData}
                renderItem = {({item})=>(
                    <View style = {{flexDirection:'row'}}>
                        <Text style = {styles.text_heading}>{item.categoryName}: </Text>
                        <View>
                            {item.selectedList.map((i,key)=>(
                                <Text key = {key} style = {styles.text_heading}>{i.itemName}</Text>
                            ))}
                        </View>
                    </View>
                )}
                keyExtractor = {(item,Index)=>Index}
                />
                </View>
                <Text style = {{color:'#5728bd',
                fontSize:18,
                marginTop:10,
                textAlign:'center'
                }}>Total Price: Rs.{totalPrice}</Text>
            </View>

            <TouchableOpacity
            style = {styles.button}
            onPress = {()=>{
                Alert.alert(
                    "Are you sure want to delete?",
                    "once deleted you can not restore it back",
                    [
                      { text: "Delete", onPress: () => {deleteOrder()} },
                      {
                          text: "Cancel", onPress: ()=>{console.log("cancel Pressed")}
                      }
                    ]
                  );
            }}
            >
                <LinearGradient
                    colors = {["#a0c722","#a0c722"]}
                    start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                    style = {styles.save_btn}
                    >
                <Text style = {{color:'#fff',fontWeight:'bold', fontSize:20}}>Delete Order</Text>
                </LinearGradient>
            </TouchableOpacity>

        </View>
    );
}

export default Order

const styles = StyleSheet.create({
    heading:{
        marginTop:10,
        justifyContent:'center',
        marginLeft:20

    },
    card:{
        marginHorizontal:20,
    },
    text_heading:{
        color:'#5728bd',
        fontSize:18,
        marginTop:10,
        width:150
    },
    text_content:{
        color:'#5728bd',
        fontSize:18,
        marginTop:10,
        marginRight:150,
    },
    text_container:{
        flexDirection:'row',
        
    },
    flatList_style:{
        height:220,
        backgroundColor:'#faec82',
        borderRadius:10,
        padding:10,
        marginTop:10
    },
    save_btn:{
        width:'100%',
        height:45,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:10,
        backgroundColor:"#5728bd"
    },
    button:{
        alignItems:'center',
        marginTop:20,
        marginHorizontal:70
    }
})