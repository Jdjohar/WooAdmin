import React, { useEffect, useState } from "react";
import { StyleSheet, Modal, Text, View, Image, TouchableOpacity, FlatList, Alert } from "react-native";
import { Card, FAB, Button } from "react-native-paper";
// import { AppRegistry } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av";

const Home = ({props,navigation}) => {
    const [wdata, setwData] = useState("");
    const [orderID, setOrderID] = useState("");
    const [orderIDreal, setOrderIDreal] = useState("");
    const [secondlastorderID, setsecondlastorderID] = useState("");
    const [billingName, setbillingName] = useState("");
    const [date_created_gmt, setdate_created_gmt] = useState("");
    const [status, setstatus] = useState("");
    const [total, settotal] = useState("");
    const [sound, setSound] = useState();
    const [modal, setModal] = useState(false);
    const [playmusic, setplaymusic] = useState(false);
    const [idvalue, setidvalue] = useState('');
    const [time, setTime] = useState(0);

    useEffect(() => {
         
        const fetchorder = async () => {
           
            console.log('fetch process start');
            try {
                let items = await fetch(
                    "https://jdwebservices.com/aman/wp-json/wc/v3/orders?consumer_key=ck_169efa4f8234008f585604685ced1d8ae88e9635&consumer_secret=cs_0e67c5a70afbf45970ffe0a4c39d6567f9bf3073"
                    // 'https://indianaccentyyc.ca/wp-json/wc/v3/orders?consumer_key=ck_93d6fc3f513b9e972768c4d2906fde5874d00089&consumer_secret=cs_733a061b770250bb164852869d383e20eb442da5'
                );
                var json = await items.json();
                //   console.log(json, "hello");
                const wooorderID = 1 + json[0].id;
                const wooorderIDreal = json[0].id;
                const woosecondlastorderID = json[1].id;
                const woostatus = json[0].status;
                const woototal = json[0].total;

                var id_valueyt = await AsyncStorage.getItem('idvalue'); 
                if(id_valueyt == null || id_valueyt == ''){
                    AsyncStorage.setItem("idvalue", wooorderID.toString()); // +1
                    setidvalue(wooorderID);
                }
                AsyncStorage.setItem("orderid", wooorderIDreal.toString()); // normal
                setwData(json);
                setOrderID(wooorderID);
                setOrderIDreal(wooorderIDreal);
                setsecondlastorderID(woosecondlastorderID);
                setstatus(woostatus);
                settotal(woototal);
            } catch (error) {
                console.error(error);
            }
        };
      
        setInterval(() => {
            fetchorder();
            logictoplaysound();
        }, 10000);
    }, []);
    var setorderid = async() => {
        try{
            console.log(orderID, "orderID from setorder id ___________")

        } catch (err) {
            console.log(err);
        }
    }

    
    const logictoplaysound = async () => {
        console.log('Logic process start');

        try {
            var id_value = await AsyncStorage.getItem('idvalue'); // =1, 90
            setidvalue(id_value);
            var getorderid = await AsyncStorage.getItem('orderid'); // normal, 89
            console.log(id_value,"Id value", getorderid, "OrderID")
            
            
        if (id_value < getorderid) {
            setModal(true);
            console.log("Loading Sound");
            const { sound } = await Audio.Sound.createAsync(require("../../assets/ring.mp3"));
            setSound(sound);
            console.log("Playing Sound");
            await sound.playAsync();
            AsyncStorage.setItem("idvalue", getorderid.toString());
            setidvalue(getorderid);
           
        } else {
            console.log("Eles part running");
        }

    }  catch (error) {
            console.error(error);
        }

    };

    const addnote = async () => {
        const data = {
            note: "Order ok!!!"
          };

          fetch(`https://jdwebservices.com/aman/wp-json/wc/v3/orders/${orderIDreal}/notes?consumer_key=ck_169efa4f8234008f585604685ced1d8ae88e9635&consumer_secret=cs_0e67c5a70afbf45970ffe0a4c39d6567f9bf3073`, {
            method: "POST", // or 'POST'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orderstatus),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
                setModal(false);
            })
            .catch((error) => {
                console.error("Error:", error);
                setModal(false);
            });
    

    };


    
    const OrderUpdate = async () => {
        const orderstatus = {
            status: "completed",
        };
        fetch(`https://jdwebservices.com/aman/wp-json/wc/v3/orders/${orderIDreal}?consumer_key=ck_169efa4f8234008f585604685ced1d8ae88e9635&consumer_secret=cs_0e67c5a70afbf45970ffe0a4c39d6567f9bf3073`, {
            method: "PUT", // or 'POST'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orderstatus),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
                setModal(false);
            })
            .catch((error) => {
                console.error("Error:", error);
                setModal(false);
            });
    };

  

    const renderList = (item) => {
        return (
            <Card style={styles.mycard}>
                <View style={styles.cradView}>
                    <TouchableOpacity onPress={() => props.navigation.navigate("Order List", { orderID: item.item.id })}>
                        <View style={{ marginLeft: 10 }}>
                            <Text style={styles.text}>{item.item.date_created_gmt}</Text>
                            <Text style={styles.text}>
                                #{item.item.id} {item.item.billing.first_name}
                            </Text>
                            <Text style={styles.text}>status: {item.item.status}</Text>
                            <Text style={styles.text}>Total: {item.item.total}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </Card>
        );
    };

    return (
        <View style={styles.container}>
            <Text>
                ID Value: {idvalue} Order Id: {orderID} Seconds: {time}
            </Text>
            <Button style={{ marginTop: 10 }} 
            mode="contained" 

            >
                Welcome to Indian Accent
            </Button>

            <FlatList
                data={wdata}
                renderItem={(item) => {
                    // console.log(item);
                    return renderList(item);
                }}
                keyExtractor={(item) => `${item.id}`}
            />
           

            <Modal
                animationType="slide"
                transparent={true}
                visible={modal}
                onRequestClose={() => {
                    setModal(false);
                }}
            >
                <View style={styles.modelView}>
                    <View style={styles.modalButton}>
                        <Button theme={theme} mode="contained" onPress={() => OrderUpdate()}>
                            Accpet
                        </Button>
                        <Button mode="contained                                    " onPress={() => pickFromGallery()}>
                            Reject
                        </Button>
                    </View>
                    <Button onPress={() => setModal(false)}>Cancel</Button>
                </View>
            </Modal>
        </View>
    );
};

const theme = {
    colors: {
        primary: "#006aff",
    },
};
const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    container: {
        padding: 5,
        width: "100%",
        backgroundColor: "#eee",
    },

    container_home: {
        padding: 2,
        width: "100%",
        backgroundColor: "#eee",
    },
    home_section: {
        width: "100%",
        padding: 2,
    },
    home_image: {
        width: "100%",
    },
    home_image_cat: {
        width: "100%",

        borderRadius: 18,
    },
    text_p: {
        color: "#222",
        fontSize: 30,
    },
    mycard: {
        margin: 5,
        padding: 5,
    },
    cradView: {
        flexDirection: "row",
    },
    text: {
        fontSize: 18,
    },
    cradView: {
        flexDirection: "row",
    },
    modelView: {
        position: "absolute",
        bottom: 2,
        width: "100%",
        backgroundColor: "white",
    },
    modalButton: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
    },
});
export default Home;
