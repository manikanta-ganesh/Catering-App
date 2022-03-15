import React from 'react'
import {View,
    Text,
    StyleSheet
} from 'react-native'

const About = () =>{
    return (
        <View style={{backgroundColor:'#fff',flex:1}}>
            <View style={{height:50,backgroundColor:"#5728bd",alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:20,color:'#fff',fontWeight:'bold'}}>Datta Sai Caterings</Text>
            </View>

            <View style = {styles.header}>
                <Text style = {styles.header_title}>About Us</Text>
            </View>

            <View style={{margin:20}}>
            <Text style={{fontSize:18,color:'#000',textAlign:'center'}}>We provide catering to all places in and near rajahmundry with good quality.
            </Text>
            <Text style={styles.text}>Along with we also have a curry point which will be opened on every afternoons and evenings.</Text>
            <Text style={{fontSize:22,color:'#77d426',marginTop:20,textAlign:'center',fontWeight:'500'}}>Address:</Text>
            
            <Text style={styles.text}>Sri Datta Sai Curry Point {'\n'} Lalitha Nagar, 3rd Line
            {'\n'}Near Vinayaka Temple {'\n'} Rajahmundry {'\n'} East Godavari Dist, AP
            </Text>

            <Text style={{fontSize:20,color:'#77d426',marginTop:20,fontWeight:'500'}}
            >For any further queries, Contact us </Text>

            <Text style={{fontSize:18,color:'#000',marginTop:10}}>
                Name: Kummaraguntla VeerabhadraRao 

            </Text>

            <Text style={{fontSize:18,color:'#000',marginTop:10}}>
                Mobile: 9885292524 

            </Text>

            <Text style={{fontSize:18,color:'#000',marginTop:10}}>
                WhatsApp: 9885292524

            </Text>
            
            
            </View>
        </View>

    );
}

export default About

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
    text:{
        fontSize:18,
        color:'#000',
        marginTop:10,
        textAlign:'center'
    }
})