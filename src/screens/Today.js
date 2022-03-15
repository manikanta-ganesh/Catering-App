import React,{useEffect, useState} from 'react'
import {Text,
View,
StatusBar,
StyleSheet,
FlatList
} from 'react-native'
import firestore from '@react-native-firebase/firestore'
import {useIsFocused} from '@react-navigation/native'

const Today = ({navigation}) =>{

    const [itemList,setItemList] = useState([])
    const isFocused = useIsFocused();

    useEffect(()=>{
        try {
        const list = []

        firestore()
        .collection('Today')
        .get()
        .then((querySnapshot)=>{

            querySnapshot.forEach(doc => {
                const {itemName,itemMsg,createdAt} = doc.data();
                list.push({itemName,itemMsg,createdAt})
            });

            setItemList(list);

        })

            
        } catch (error) {
            console.log(error)
        }
        
        
    },[navigation])

    return (
        <View style={{flex:1,backgroundColor:'#fff'}}>
            <StatusBar backgroundColor = "#5728bd" barStyle = 'light-content'/>
            <View style={{height:50,backgroundColor:"#5728bd",alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:20,color:'#fff',fontWeight:'bold'}}>Datta Sai Caterings</Text>
            </View>

            <View style = {styles.header}>
                <Text style = {styles.header_title}>Today's Menu</Text>
            </View>

            <FlatList
            data = {itemList}
            showsVerticalScrollIndicator={false}
            renderItem = {({item}) => (
                <View style = {styles.item_container}>
                    <Text style = {styles.item_text}>{item.itemName}</Text>
                    <Text style = {{marginTop:5}}>{item.itemMsg}</Text>
                </View>
            )

            }
            keyExtractor = {item=>item.createdAt}
            />

            <View style={{marginBottom:80}}></View>

        </View>
    );
}

export default Today

const styles = StyleSheet.create({

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
    item_container:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:15,
        padding:20,
        backgroundColor:'#f5bd56',
        marginHorizontal:20,
        borderRadius:10
    },
    item_text:{
        color:'#000',
        fontSize:20
    }

})