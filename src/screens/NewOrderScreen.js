import React,{useState,useEffect} from 'react'
import {Text,
    View,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
    BackHandler,
    VirtualizedView,
    ScrollView,
    Dimensions,
    EStyleSheet
} from 'react-native'
import firestore from '@react-native-firebase/firestore'
import CheckBox from 'react-native-check-box'
import LinearGradient from 'react-native-linear-gradient'
import Snackbar from 'react-native-snackbar';
import {useFocusEffect,useIsFocused} from '@react-navigation/native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

// const entireScreenWidth = Dimensions.get('window').width;
// EStyleSheet.build({$rem: entireScreenWidth / 380});


const NewOrderScreen = ({navigation,route}) => {
    
    var fromScreen = 'Home'
    var {fromScreen} = route.params;
    const isFocused = useIsFocused();

    const [categoryList,setCategoryList] = useState([])
    const [itemList,setItemList] = useState([])
    const [selectedData,setSelectedData] = useState([]);
    const [selCat,setSelCat] = useState('');
    const [count,setCount] = useState(0);
    const [address,setAddress] = useState('');
    const [memcount,setMemcount] = useState('');
    const [totalPrice,setTotalPrice] = useState(0);
    const [text,setText] = useState('Select Date')
    const [date,setDate] = useState(new Date())
    const [show, setShow] = useState(false);
  
const DatePick = () => {
    const hideDatePicker = () => {
        setShow(false);
      };

    const handleConfirm = (selectedDate) => {
        setDate(selectedDate);
        let tempDate = new Date(selectedDate)
        let fDate = tempDate.getDate()+'-'+(tempDate.getMonth()+1)+'-'+tempDate.getFullYear();
        hideDatePicker();
        setText(fDate);
    }

    const handleCancel = () => {
        setShow(false)
    }


    return (
        <View style = {styles.container}>
            <Text style = {styles.text}>{text}</Text>
            <TouchableOpacity
            onPress = {()=>setShow(true)}
            >
                <FontAwesome
                name = "calendar"
                color = "#5728bd"
                size = {20}
                />
            </TouchableOpacity>

<DateTimePickerModal
                isVisible={show}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
              //  onChange = {onChange}
            />


        </View>
    )
   }

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('Home');
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

    useEffect(()=>{
        try {
        const list = []

        firestore()
        .collection('Categories')
        .get()
        .then((querySnapshot)=>{

            querySnapshot.forEach(doc => {
                const {categoryName,createdAt} = doc.data();
                const docId = doc.id;
                const innerList = [];
                firestore().collection('Categories').doc(docId).collection('LISTITEM').get()
                .then((snapShot)=>{
                    snapShot.forEach(d=>{
                        const {itemName,createdAt,itemPrice} = d.data();
                        innerList.push({itemName,createdAt,itemPrice,isSelected:false});
                    })
                })
                list.push({categoryName,createdAt,innerList})
            });

            setCategoryList(list);
            console.log(categoryList);
            setMemcount('')
            setItemList([])
            setAddress('')
            setText('Select Date')
            setSelCat('')
        })

            
        } catch (error) {
            console.log(error)
        }

    },[fromScreen])

    useEffect(()=>{
        showSelectedItems()
    },[itemList,memcount])

    const markSelected = (createdAt) =>{
        const newArr = itemList.map((list) => {
            if (list.createdAt == createdAt) {
                list.isSelected = !list.isSelected
            }
            return list
        })

        setItemList(newArr)
        showSelectedItems();
    }

    const showSelectedItems = () => {
        const ArrData = [];
        var c = 0,t=0;
        categoryList.map((list) => {
            const innerArr = [];
            list.innerList.map((i)=>{
                if(i.isSelected==true){
                    innerArr.push({itemName: i.itemName});
                    c+=1;
                    t+=(memcount*i.itemPrice)
                }
            })
            if(innerArr.length!==0) ArrData.push({categoryName: list.categoryName, selectedList:innerArr})
        })
        setSelectedData(ArrData);
        setCount(c);
        setTotalPrice(t);
    }

    const checkData =() =>{
        if(date==='Select Date' || memcount==='' || address==='' || selectedData.length===0){
            Snackbar.show({
                text: "Please Fill in All Fields",
                textColor: 'white',
                backgroundColor:'red'
            })
        }else{
            navigation.navigate('Preview',{
                date:text,
                memcount:memcount,
                totalPrice:totalPrice,
                address:address,
                selectedData:selectedData,
                fromScreen:fromScreen
            })
            console.log(selectedData)
        }
    }

    const helper = (iList,id) =>(
        setItemList(iList),
        setSelCat(id)

    )

    return (
        <SafeAreaView style={{flex:1}}>
        <View style={{backgroundColor:'#fff',flex:1}} >
            <View style={{height:hp('6%'),backgroundColor:"#5728bd",alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:wp('5%'),color:'#fff',fontWeight:'bold'}}>Datta Sai Caterings</Text>
            </View>
        
        <View style = {{justifyContent:'center',alignItems:'center',marginTop:wp('3%')}}>
            <Text style = {styles.header_title}> Select the items and Place your order</Text>
        </View>
        <View style = {styles.grp_container}>
        <DatePick />
        <TextInput 
            placeholder = "No of Members"
            placeholderTextColor="grey"
            style = {styles.textInput}
            keyboardType = 'number-pad'
            value={memcount}
            onChangeText = {(val)=>setMemcount(val)}
            />
        </View>
        <View style = {styles.address_container}>
            <TextInput
            multiline
            placeholder = "Address"
            placeholderTextColor='grey'
            style = {styles.address_text}
            value={address}
            onChangeText = {(val)=>setAddress(val)}
            />
        </View>
        
        <View style={{marginBottom:wp('1%')}}>
        <FlatList
        horizontal
        nestedScrollEnabled
        showsHorizontalScrollIndicator = {false}
            data = {categoryList}
            renderItem = {({item}) => (
                <View style={{flex:1}}>
                <TouchableOpacity
                onPress = {()=>helper(item.innerList,item.createdAt)}
                >
                <View style = {item.createdAt===selCat?styles.selected_category_container:styles.category_container}>
                    <Text style = {item.createdAt===selCat?styles.selected_category_text:styles.category_text}>{item.categoryName}</Text>
                </View>
                </TouchableOpacity>
                </View>
            )

            }
            keyExtractor = {item=>item.createdAt}
            />
            </View>
        
        <View style = {{height:hp('30%')}} >
        {itemList.length===0 ? 
        <View style = {{flex:1,alignItems:'center',justifyContent :'center'}}>
        <Text style = {{fontSize:20,color:'grey'}}>Select the Category</Text>
        </View>
         :
        <FlatList
            data = {itemList}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled
            renderItem = {({item}) => (
                <View style = {styles.item_container}>

                    <CheckBox
                    isChecked = {item.isSelected}
                    onClick = {()=>markSelected(item.createdAt)}
                    checkBoxColor = '#5728bd'
                    
                    />
                    
                    <Text style = {styles.item_text}>{item.itemName}</Text>
            
                </View>
            )

            }
            contentContainerStyle = {{marginBottom:wp('2%')}}
            keyExtractor = {item=>item.createdAt}
            /> }
            </View>

            <View style = {{flexDirection:'row',justifyContent:'center',alignItems:'center',marginHorizontal:wp('5%')}}>
                <Text style = {{fontSize:wp('5%'), color:'#a0c722', fontWeight:'bold'}}>Total Price is : Rs {totalPrice}</Text>
            </View>

            
            <TouchableOpacity
            style = {styles.button}
            onPress = {()=>{checkData()}}
            >
                <LinearGradient
                    colors = {["#a0c722","#a0c722"]}
                    start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                    style = {styles.save_btn}
                    >
                <Text style = {{color:'#fff',fontWeight:'bold', fontSize:wp('5%')}}>Preview</Text>
                </LinearGradient>
            </TouchableOpacity>
            
            
        </View>
        </SafeAreaView>
    );
}

export default NewOrderScreen;

const styles = StyleSheet.create({

    category_container:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:wp('1.5%'),
        padding:wp('1%'),
        paddingHorizontal:wp('4%'),
        marginLeft:wp('4%'),
        borderRadius:wp('4.5%'),
        borderColor:'#5728bd',
        borderWidth:1
    },
    category_text:{
        color:'#000',
        fontSize:wp('4.3%')
    },
    selected_category_container:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:wp('1.5%'),
        padding:wp('1%'),
        paddingHorizontal:wp('4%'),
        marginLeft:wp('4%'),
        borderRadius:wp('4.5%'),
        backgroundColor:'#5728bd',
        borderWidth:1,
        borderColor:'#5728bd'
    },
    selected_category_text:{
        color:'#fff',
        fontSize:wp('4.3%')
    },
    item_container:{
        marginTop:wp('2%'),
        borderWidth:1,
        borderRadius:wp('2%'),
        marginHorizontal:wp('3%'),
        padding:wp('1%'),
        flexDirection:'row',
    },
    item_text:{
        fontSize:wp('4%'),
        color:'#5728bd',
        marginLeft:wp('1%')
    },
    textInput:{
        color:"#5728bd",
        borderBottomWidth:1,
        borderBottomColor:"#5728bd",
        fontSize:wp('4%'),
        textAlign:'center',
        padding:wp('1%')
    },
    address_text:{
        color:"#5728bd",
        fontSize:wp('4%'),
        marginTop:wp('-0.5%')

    },
    header_title:{
        fontSize:wp('5%'),
        fontWeight:'bold',
        color:"#a0c722"
    },
    grp_container:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        marginHorizontal:wp('5%'),
        marginTop:wp('3.3%')
    },
    address_container:{
        borderWidth:1,
        borderColor:'#5728bd',
        borderRadius:wp('2%'),
        height:hp('10%'),
        margin:wp('3%'),
        marginHorizontal:wp('10%')
    },
    save_btn:{
        width:'100%',
        height:hp('5%'),
        justifyContent:"center",
        alignItems:"center",
        borderRadius:10,
        backgroundColor:"#5728bd"
    },
    button:{
        alignItems:'center',
        marginTop:wp('4%'),
        marginHorizontal:wp('25%')
    },
    container:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderWidth:1,
        borderRadius:wp('2%'),
        borderColor:'#5728bd',
        padding:wp('1.5%')
        
    },
    text:{
        color:'#5728bd',
        marginHorizontal:wp('5%'),
        fontSize:wp('4%')
    }

})