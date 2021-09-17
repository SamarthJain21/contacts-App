import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { firebaseApp } from '../config/Firebase'

export default class AddScreen extends React.Component{
    state={
        name:"",
        phoneNumber:""
    }
    render(){
        return(
            <View style={styles.container}>
                <TextInput
                label='name'
                value={this.state.name}
                onChangeText={(text)=>{this.setState({name:text})}}
                style={{
                    margin:10
                }}
                />
                <TextInput
                label='Phone Number'
                value={this.state.phoneNumber}
                keyboardType="phone-pad"
                onChangeText={(text)=>{this.setState({phoneNumber:text})}}
                style={{
                    margin:10
                }}
               />
               
               <Button
               mode="contained"
               onPress={()=>{
                   if(this.state.name!="" && this.state.phoneNumber!=""){
                   const user = firebaseApp.auth().currentUser
                   console.log("user id id " + user.uid)
                   firebaseApp.firestore().collection("data")
                   .doc(user.uid)
                   .collection("contacts")
                   .add({
                       name:this.state.name,
                       phone:this.state.phoneNumber
                   }).then(
                       result=>{
                        //    console.log(result)
                        this.props.navigation.goBack();
                       }
                   ).catch(error=>alert(error))
                   }else{
                       alert("Fill the information")
                   }
                   
               }}
               style={{
                   margin:10
               }}
               >
                   Save Contact
               </Button>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff",
    }
})