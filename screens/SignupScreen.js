import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import {Button, TextInput} from 'react-native-paper'

import { firebaseApp } from '../config/Firebase'
export default class SignupScreen extends React.Component{
    state={
        email:"",
        password:"",
        confirmPassword:""
    }
    render(){
        return(
            <View style={styles.container}>
                <View>
                    <Text
                    style={{
                        marginTop:50,
                        fontSize:50,
                        textAlign:"center"
                    }}>
                        Sign Up
                    </Text>
                </View>
                <View style={{
                    marginTop:50,
                    marginHorizontal:20
                }}>
                    <TextInput
                     label="Email"
                     keyboardType="email-address"
                     value={this.state.email}
                     onChangeText={(text)=>this.setState({email:text})}
                     />

                    <TextInput
                    style={{
                        marginTop:10
                    }}
                     label="Password"
                     keyboardType="default"
                     secureTextEntry={true}
                     value={this.state.password}
                     onChangeText={(text)=>{this.setState({password:text})}}
                     />

                    <TextInput
                    style={{
                        marginTop:10
                    }}
                     label="Confirm Password"
                     keyboardType="default"
                     secureTextEntry={true}
                     value={this.state.confirmPassword}
                     onChangeText={(text)=>{this.setState({confirmPassword:text})}}
                     />

                     <Button 
                     onPress={()=>{
                         if(this.state.email!="" && 
                         this.state.password!="" && 
                         this.state.confirmPassword!="" &&
                        this.state.password==this.state.confirmPassword)
                        {
                            firebaseApp.auth().createUserWithEmailAndPassword(
                                this.state.email,
                                this.state.password
                            ).then(result =>{
                                console.log()
                                this.props.navigation.goBack()
                            }).catch(error=>{
                                alert(error);
                            })
                        }else{
                            alert("Provide Correct Data")
                        }
                     }}
                     mode="contained"
                     style={{
                         marginTop:20
                     }}
                     >
                         Signup Now
                    </Button>

                    <Button 
                     onPress={()=>{
                         this.props.navigation.goBack()
                     }}
                     style={{
                         marginTop:20
                     }}
                     >
                         Existing user? Signin Now
                    </Button>
                </View>
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