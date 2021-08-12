import React, { useEffect, useState } from "react";
import { StyleSheet, Modal, Text, View, Image, TouchableOpacity, FlatList, Alert } from "react-native";
import { Card, FAB, Button } from "react-native-paper";
// import { AppRegistry } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av";

const OrderNotification = ({route}) => {
  
  const [sound, setSound] = useState();
  const [jsonlength, setjsonlength] = useState('');
  const [jsonlengthstore, setjsonlengthstore] = useState(0);

  useEffect(() => {
    const fetchorder = async () => {
       try{
        let items = await fetch(
            "https://jdwebservices.com/aman/wp-json/wc/v3/orders?consumer_key=ck_169efa4f8234008f585604685ced1d8ae88e9635&consumer_secret=cs_0e67c5a70afbf45970ffe0a4c39d6567f9bf3073"
            // 'https://indianaccentyyc.ca/wp-json/wc/v3/orders?consumer_key=ck_93d6fc3f513b9e972768c4d2906fde5874d00089&consumer_secret=cs_733a061b770250bb164852869d383e20eb442da5'
        );
        var json = await items.json();
        var jsonlength = json.length; // 10
        setjsonlength(jsonlength);
        // var jsonstore = 0;
        AsyncStorage.setItem("storevalue", jsonlengthstore.toString()); // 0
        // setjsonlength(jsonlength);
        //  jsonstore = 20;
        //  setjsonlengthstore(jsonstore);
        // var getjsonstore = await AsyncStorage.getItem('storevalue');
        // setjsonlengthstore(getjsonstore);

        // console.log(getjsonstore, " =========== getjsonstore on line 30 ===========")
        // AsyncStorage.setItem("storevalue", jsonlengthstore.toString());

        if (jsonlengthstore == 0){
            AsyncStorage.setItem("storevalue", jsonlength.toString());
         } 
         playsound();




        //else {
        //     console.log("Sorry Still Have problem");
        //     var getjsonstore = await AsyncStorage.getItem('storevalue');
        //    console.log(getjsonstore, "getjsonstore");
        // }

       } catch (err) {
        console.log(err);
       }
    
   
      }

      setInterval(() => {
        fetchorder();
    }, 20000);

},[]);



const playsound = async() => {

    var getjsonstore = await AsyncStorage.getItem('storevalue');
    console.log(getjsonstore, "getjsonstore");
    console.log(jsonlength, getjsonstore, "sd");
    if(parseInt(jsonlength) > parseInt(getjsonstore)) {
        console.log("Sound Play");
        AsyncStorage.setItem("storevalue", jsonlength.toString()); 
    }
    else {
        console.log("Not Play");
    }

}




    return (
        <View>
            <Text>Order Notification {jsonlengthstore}</Text>
            </View>
    );

};

export default OrderNotification;