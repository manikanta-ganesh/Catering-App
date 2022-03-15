import React,{useState,useEffect,useContext} from 'react'
import {Text,
    View,
    SafeAreaView,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native'
import { useIsFocused} from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore'
import {AuthContext} from '../navigation/AuthProvider'

const numColumns = 2;

const MyOrders = ({navigation}) => {

    const isFocused = useIsFocused();
    const {user} = useContext(AuthContext);
    const [orderList,setOrderList] = useState([]);

    useEffect(()=>{

        try {
            const list = []
    
            firestore()
            .collection('Orders')
            .where('userId','==',user.uid)
            .orderBy('createdAt','desc')
            .get()
            .then((querySnapshot)=>{
    
                querySnapshot.forEach(doc => {
                    const {Date,MemCount,TotalPrice,id,Status} = doc.data();
                    list.push({Date,MemCount,TotalPrice,id,Status})
                });
                setOrderList(list);
                console.log(orderList.length)
            })
            
       
            } catch (error) {
                console.log(error)
            }

    },[isFocused])


    return (
        <View style = {{flex:1,backgroundColor:'#fff'}}>
            <View style={{height:50,backgroundColor:"#5728bd",alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:20,color:'#fff',fontWeight:'bold'}}>Datta Sai Caterings</Text>
            </View>

            <View style = {styles.header}>
                <Text style = {styles.header_title}>My Orders</Text>
            </View>

            {orderList.length===0 ?
            <View style={{marginTop:20, justifyContent:'center',alignItems:'center'}}>
                <Image style={styles.image} source={require("../assests/images/No_data.png")}/>
                <Text style={{fontSize:20,color:'#77d426',fontWeight:'500'}}>Sorry, No Orders Found</Text>
            </View>

            :
    
                <FlatList
                showsVerticalScrollIndicator={false}
                data={orderList}
                renderItem={({item})=>(
                    <TouchableOpacity style = {styles.item_container}
                    onPress={()=>navigation.navigate('Order',{
                        DocId: item.id
                    })}
                    >
                    <Text style = {styles.text}>Date: {item.Date}</Text>
                    <Text style = {styles.text}>Total Members: {item.MemCount}</Text>
                    <Text style = {styles.text}>Total Price: {item.TotalPrice}</Text>
                    <Text style = {styles.text}>Current Status: {item.Status}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item,index)=>index.toString()}
                />
                }
               

        </View>
    );
}

export default MyOrders;

const styles = StyleSheet.create({
    item_container:{
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        backgroundColor:'#5afaed',
        padding:30,
        margin:10,
        marginHorizontal:20
    },
    header:{
        marginTop:20,
        justifyContent:'center',
        alignItems:'center'
    },
    header_title:{
        fontSize:30,
        fontWeight:'800',
        color:"#77d426"
    },
    text:{
        fontSize:18,
        color:'#000',
        marginTop:10
    },
    image:{
        width:400,
        height:400
    }
})