import React, { useState ,useEffect} from 'react'
import {View,
Text,
StyleSheet,
TouchableOpacity
} from 'react-native'

import DateTimePicker from '@react-native-community/datetimepicker'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const DatePick = ({childToParent,DateText,isFocused}) => {

    const [text,setText] = useState('Select Date')
    const [date,setDate] = useState(new Date())
    const [show, setShow] = useState(false);

    useEffect(()=>{
        setText(DateText);
    },[])

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        let tempDate = new Date(currentDate)
        let fDate = tempDate.getDate()+'-'+tempDate.getMonth()+'-'+tempDate.getFullYear();
        setText(fDate);
      };

      const hideDatePicker = () => {
        setShow(false);
      };

    const handleConfirm = (selectedDate) => {
        setDate(selectedDate);
        let tempDate = new Date(selectedDate)
        let fDate = tempDate.getDate()+'-'+(tempDate.getMonth()+1)+'-'+tempDate.getFullYear();
        hideDatePicker();
        childToParent(fDate);
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
                size = {30}
                />
            </TouchableOpacity>

            {/* {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          is24Hour={true}
          display="default"
          onChange={onChange}
          onConfirm = {handleConfirm}
        />

      )} */}

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

export default DatePick

const styles = StyleSheet.create({

    container:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderWidth:1,
        borderRadius:10,
        borderColor:'#5728bd',
        padding:10
        
    },
    text:{
        color:'#5728bd',
        marginHorizontal:20
    }


})