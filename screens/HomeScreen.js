import React from 'react'
import { View, StyleSheet, Text,FlatList, ActivityIndicator, TouchableOpacity , Linking} from 'react-native'
import {Button, FAB} from 'react-native-paper'

import {MaterialIcons} from '@expo/vector-icons'
import { firebaseApp } from '../config/Firebase'
export default class HomeScreen extends React.Component{

    state={
        contacts:[],
        isLoaded:false
    }

    componentDidMount(){
        this.props.navigation.setOptions({
            headerRight:()=>(
                <Button
                    icon="logout"
                    onPress={()=>{
                        firebaseApp.auth().signOut()
                        .then(()=>{
                            this.props.navigation.replace("LoginScreen")
                        })
                        .catch(error=>alert(error))
                    }}
                />
        )
        })
        // this.getAllContacts();

        this.props.navigation.addListener("focus",()=>{
            this.getAllContacts();
        })
    }

    getAllContacts(){
        const user = firebaseApp.auth().currentUser

        firebaseApp.firestore()
        .collection("data")
        .doc(user.uid)
        .collection("contacts")
        .get()
        .then(querySnapshot=>{
            this.setState({
                contacts:[]
            })
            querySnapshot.forEach(snapshot=>{
                // console.log(snapshot.data())
                // console.log(snapshot.data.name)

                this.state.contacts.push({
                    id:snapshot.id,
                    name:snapshot.data().name,
                    phoneNumber: snapshot.data().phone
                })
            })
            this.setState({
                isLoaded:true,
                contacts:this.state.contacts
            })
        })
    }
    render(){
        if(this.state.isLoaded){
            return(
                <View style={styles.container}>
                    
                    <Text>HomeScreen</Text>
                    <FlatList
                        data={this.state.contacts}
                        keyExtractor={(item, index)=>item.id}
                        renderItem={({item}) =>{
                            return(
                                <View style={{
                                    backgroundColor:"#dedede",
                                    marginTop:10,
                                    marginHorizontal:20,
                                    padding:20,
                                    borderRadius:8,
                                    flexDirection:"row",
                                    justifyContent:"space-between",
                                    alignItems:"center"
                                }}>
                                    <TouchableOpacity onPress={()=>{
                                        this.props.navigation.navigate("UpdateScreen",{
                                            id:item.id,
                                            name:item.name,
                                            phoneNumber:item.phoneNumber
                                        })
                                    }}>
                                    <View>
                                    <Text style={{
                                        fontSize:18,
                                        fontWeight:"bold"
                                    }}>
                                        {item.name}
                                     </Text>

                                    <Text style={{
                                        marginTop:5
                                    }}>
                                        {item.phoneNumber}
                                     </Text>
                                    </View>
                                    </TouchableOpacity>
                                    <View style={{
                                        flexDirection:"row"
                                    }}>
                                    <TouchableOpacity
                                    onPress={()=>{
                                        Linking.openURL(`tel:${item.phoneNumber}`)
                                    }}>
                                        <MaterialIcons
                                        name="call"
                                        size={28}
                                        color="#333"
                                        />
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                    onPress={()=>{
                                        const user = firebaseApp.auth().currentUser

                                        firebaseApp.firestore().collection("data")
                                        .doc(user.uid)
                                        .collection("contacts")
                                        .doc(item.id)
                                        .delete()


                                        let contacts = this.state.contacts
                                        contacts = contacts.filter(c=>c.id!=item.id)
                                        this.setState({
                                            contacts:contacts
                                        })

                                    }}>
                                        <MaterialIcons
                                        name="delete"
                                        size={28}
                                        color="#ff0000"
                                        />
                                    </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        }}
                    />
                    <FAB
                    icon="plus"
                    style={styles.fab}
                    onPress={()=>{
                        this.props.navigation.navigate("AddScreen")
                    }}
                    color="#0000ff"
                    />
                </View>
            )
        }else{
            return(
                <View style={styles.container}>
                    <ActivityIndicator size="large"/>
                </View>
            )
        }
        }
        
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff",
    },
    fab:{
        position:"absolute",
        bottom:30,
        right:20,
    }
})