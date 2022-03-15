import React,{useState,useEffect,useContext} from 'react'
import {View,Text,
    StyleSheet,
    FlatList,
    BackHandler,
    TouchableOpacity,
    Alert
} from 'react-native'
import {
    useFocusEffect
   } from '@react-navigation/native';
import {AuthContext} from '../navigation/AuthProvider'
import firestore from '@react-native-firebase/firestore'
import LinearGradient from 'react-native-linear-gradient'
import shortid from 'shortid'

const Preview = ({navigation,route}) => {

    const {date,memcount,address,totalPrice,selectedData,fromScreen} = route.params;
    const {user} = useContext(AuthContext);
    const [userName,setUserName] = useState('');
    const [userId,setUserId] = useState('');
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
        
        setUserId(user.uid);
        
    },[navigation])

    useFocusEffect(
        React.useCallback(() => {
          const onBackPress = () => {
            navigation.navigate('New Order',{fromScreen:fromScreen});
            // Return true to stop default back navigaton
            // Return false to keep default back navigaton
            return true;
          };
    
          // Add Event Listener for hardwareBackPress
          BackHandler.addEventListener(
            'hardwareBackPress',
            onBackPress
          );
    
         return () => {
            // Once the Screen gets blur Remove Event Listener
            BackHandler.removeEventListener(
              'hardwareBackPress',
              onBackPress
            );
          };
        }, []),
      );


      const PostOrder= async() =>{
        const uid = shortid.generate()
        await firestore()
              .collection('Orders')
              .doc(uid)
              .set({
                  Date:date,
                  MemCount: memcount,
                  Address: address,
                  TotalPrice: totalPrice,
                  id: uid,
                  SelectedData:selectedData,
                  Status:"Not Confirmed",
                  userId:userId,
                  createdAt:firestore.Timestamp.fromDate(new Date())
              })
              .then(()=>{
                  console.log("Order Saved")
                  Alert.alert(
                    "Order Confirmation",
                    "To Confirm your Order, Please call to 9885292524",
                    [
                      { text: "OK", onPress: () => navigation.navigate("New Order",{
                          fromScreen: fromScreen==='Home' ? 'PreView' : 'Home'
                      }) }
                    ]
                  );
              });
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
                <Text style = {styles.text_content}>{memcount}</Text>
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
            onPress = {PostOrder}
            >
                <LinearGradient
                    colors = {["#a0c722","#a0c722"]}
                    start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                    style = {styles.save_btn}
                    >
                <Text style = {{color:'#fff',fontWeight:'bold', fontSize:20}}>Save & Continue</Text>
                </LinearGradient>
            </TouchableOpacity>

        </View>
    )
}

export default Preview


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