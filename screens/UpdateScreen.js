import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { firebaseApp } from '../config/Firebase'

export default class UpdateScreen extends React.Component{
    state={
        id:"",
        name:"",
        phoneNumber:""
    }
    componentDidMount(){
        const id = this.props.route.params.id
        const name = this.props.route.params.name
        const phoneNumber = this.props.route.params.phoneNumber
        this.setState({
            id,
            name,
            phoneNumber
        })
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
                   firebaseApp.firestore()
                   .collection("data")
                   .doc(user.uid)
                   .collection("contacts")
                   .doc(this.state.id)
                   .update({
                       name:this.state.name,
                       phone:this.state.phoneNumber
                   }).then(()=>{
                       this.props.navigation.goBack()
                   }
                   )
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