import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Image,TouchableOpacity ,FlatList, Alert } from 'react-native';
import {Card,Button, FAB} from 'react-native-paper';
import { Audio } from 'expo-av';
import * as Print from 'expo-print';
const OrderList=({route})=>{
    const [wdata, setwData] = useState('');
    const [totalamount, settotalamount] = useState('');
    const [total_tax, settotal_tax] = useState('');
    const [billingName, setbillingName] = useState('');
    const [date_created_gmt, setdate_created_gmt] = useState('');
    const [status, setstatus] = useState('');
    const [total, settotal] = useState('');
    const [sound, setSound] = useState();
    const OrderIDfromHome = route.params.orderID;
    

   



    useEffect(() => {
        fetchorder();
    });
            const fetchorder = async () => {

            try {
        let items = await fetch(`https://jdwebservices.com/aman/wp-json/wc/v3/orders/${OrderIDfromHome}?consumer_key=ck_169efa4f8234008f585604685ced1d8ae88e9635&consumer_secret=cs_0e67c5a70afbf45970ffe0a4c39d6567f9bf3073`);
        // let items = await fetch(`https://indianaccentyyc.ca/wp-json/wc/v3/orders/${OrderIDfromHome}?consumer_key=ck_93d6fc3f513b9e972768c4d2906fde5874d00089&consumer_secret=cs_733a061b770250bb164852869d383e20eb442da5`);
          var json = await items.json();
        //   console.log(json, "hello");
        //   console.log(json.total, "total amount");
          const totalamountorder = json.total;
          const woototal_tax = json.total_tax;


          settotal_tax(woototal_tax)  
          settotalamount(totalamountorder)  
          setwData([json.line_items]);
        //   console.log(wdata, "wdata");
        }
        catch (error) {
            console.error(error);
          }
        }


        const renderList = ((item)=>{
            // console.log(item.item, "item")
            return(
                <View style={styles.container_home}>
                    
                <View style={styles.box}>
                    <View style={styles.inner}>
                        <Text>{item.name} X {item.quantity}</Text>
                    </View>
               </View> 
                  
                            <View style={styles.box}>
                                <View style={styles.inner}>
                                <Text>${item.subtotal}</Text>
                                </View>
            
                            </View> 
                            </View>  
              
            )
        });
   
    return(
        <View style={styles.container}>
            <View style={styles.box1}>
            <Text>Your Orders</Text>
            <Button onPress={()=>{
                // const JSONString = wdata[0];
                // var object = JSON.stringify(JSONString);
                // const array = object.map(function(k) {
                //     console.log(object[k], "object")
                //   return object[k];
                // });
            Print.printAsync({
              html: `
<html>

<head>
<style>
#invoice-POS{
    box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5);
    padding:2mm;
    margin: 0 auto;
    width: 44mm;
    background: #FFF;
    
    
  ::selection {background: #f31544; color: #FFF;}
  ::moz-selection {background: #f31544; color: #FFF;}
  h1{
    font-size: 1.5em;
    color: #222;
  }
  h2{font-size: .9em;}
  h3{
    font-size: 1.2em;
    font-weight: 300;
    line-height: 2em;
  }
  p{
    font-size: .7em;
    color: #666;
    line-height: 1.2em;
  }
   
  #top, #mid,#bot{ /* Targets all id with 'col-' */
    border-bottom: 1px solid #EEE;
  }
  
  #top{min-height: 100px;}
  #mid{min-height: 80px;} 
  #bot{ min-height: 50px;}
  
  #top .logo{
    //float: left;
      height: 60px;
      width: 60px;
      background: url(http://michaeltruong.ca/images/logo1.png) no-repeat;
      background-siz+e: 60px 60px;
  }
  .clientlogo{
    float: left;
      height: 60px;
      width: 60px;
      background: url(http://michaeltruong.ca/images/client.jpg) no-repeat;
      background-size: 60px 60px;
    border-radius: 50px;
  }
  .info{
    display: block;
    //float:left;
    margin-left: 0;
  }
  .title{
    float: right;
  }
  .title p{text-align: right;} 
  table{
    width: 100%;
    border-collapse: collapse;
  }
  td{
    //padding: 5px 0 5px 15px;
    //border: 1px solid #EEE
  }
  .tabletitle{
    //padding: 5px;
    font-size: .5em;
    background: #EEE;
  }
  .service{border-bottom: 1px solid #EEE;}
  .item{width: 24mm;}
  .itemtext{font-size: .5em;}
  
  #legalcopy{
    margin-top: 5mm;
  }
  
    
    
  }
</style>
</head>
<body>
<div id="invoice-POS">
  
  <center id="top">
    <div class="logo"></div>
    <div class="info"> 
      <h2>Indian Accent YYC</h2>
    </div><!--End Info-->
  </center><!--End InvoiceTop-->
  
  <div id="mid">
    <div class="info">
      <p> 
          Address : street city, state 0000</br>
          Email   : JohnDoe@gmail.com</br>
          Phone   : 555-555-5555</br>
      </p>
    </div>
  </div><!--End Invoice Mid-->
  
  <div id="bot">

                  <div id="table">
                      <table>
                          <tr class="tabletitle">
                              <td class="item"><h2>ITEM</h2></td>
                              <td class="Hours"><h2>Qty</h2></td>
                              <td class="Rate"><h2>Sub Total</h2></td>
                          </tr>
                          ${wdata[0].map(function(k) {
                            return `<tr class="service">
                            <td class="tableitem"><p class="itemtext">
                            ${k.name}</p></td>
                            <td class="tableitem"><p class="itemtext">${k.quantity}</p></td>
                            <td class="tableitem"><p class="itemtext">${k.subtotal}</p></td>
                        </tr>`;
                           })}
                          

                          <tr class="tabletitle">
                              <td></td>
                              <td class="Rate"><h2>tax</h2></td>
                              <td class="payment"><h4>${total_tax}</h4></td>
                          </tr>

                          <tr class="tabletitle">
                              <td></td>
                              <td class="Rate"><h2>Total</h2></td>
                              <td class="payment"><h4>${totalamount}</h4></td>
                          </tr>

                      </table>
                  </div><!--End Table-->

                  <div id="legalcopy">
                      <p class="legal"><strong>Thank you for your business!</strong>  Payment is expected within 31 days; please process this invoice within that time. There will be a 5% interest charge per month on late invoices. 
                      </p>
                  </div>

              </div><!--End InvoiceBot-->
</div><!--End Invoice-->


</body>
</html>
        `
            })

          }} >print
          </Button>
            </View>
            

            <FlatList
            data={wdata[0]}
            renderItem={(item)=>{
                // console.log(item.item,"ITEMS");
                return renderList(item.item)
            }}
            keyExtractor={item=>`${item.id}`}
    />

<View style={styles.container_home}>
                    
                    <View style={styles.box}>
        
                        <View style={styles.inner}>
                           
                            <Text>Amount Total</Text>
                        </View>
                    
                   </View> 
                   <View style={styles.box}>
        
                        <View style={styles.inner}>
                           
                            <Text>{totalamount}</Text>
                        </View>
                    
                   </View> 
                   <View style={styles.box}>
        
                        <View style={styles.inner}>
                        
                           
                        </View>
                    
                   </View> 
</View>

  
        </View>     
     )
}

const styles = StyleSheet.create({
    container:
    {
        padding:5,
        width: '100%',
        backgroundColor:'#eee',
    },
    container_home:
    {
        padding:5,
        width: '100%',
        backgroundColor:'#eee',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },

    box:{
        padding:5,
        width: '50%',
        height: 'auto',
       
      },
    box1:{
        padding:5,
        width: '100%',
        height: 'auto',
       
      },
      inner: {
          flex:1,
        width: '100%',
        padding: 2,
      
      },
  
    
})
export default OrderList