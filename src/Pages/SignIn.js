import React,{useState,useEffect} from 'react'
import { TextInput,StyleSheet,SafeAreaView,View,Text,TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { StackActions } from '@react-navigation/native';


function SignIn(props){
  

  useEffect(() => {
 }, []);
  //states
 
  const [text, onChangeText] = React.useState(null);
  const [number, onChangeNumber] = React.useState(null);
 

 
 
 
  const toSignUp=() => { 
   return props.navigation.navigate('Rooms');


}


const signInHander=() => { 
 return(
  auth()
  .signInWithEmailAndPassword(text, number)
  .then(() => {
    console.log('Signed in!');
    props.navigation.dispatch(
      StackActions.replace('Rooms')
    );
  })
  .catch(error => {


    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }

    console.error(error);
  })
  
  
  
  )

}

return(
    <SafeAreaView style={styles.container}>
      
      <View style={styles.innerContainer2}>
      <Text style={styles.header }>CodeHouse</Text>
      </View>
        <View style={styles.innerContainer}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="e-postanızı giriniz..."
        placeholderTextColor="white" 
      />
      
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="şifrenizi giriniz..."
        placeholderTextColor="white" 
        keyboardType="numeric"
      /> 
      <TouchableOpacity onPress={()=>signInHander()}style={styles.signInButton}>
        <Text style={styles.buttonText}>Giriş yap</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>toSignUp()} style={styles.signUpButton}>
        <Text style={styles.buttonText2}>Kayıt Ol</Text>
      </TouchableOpacity>
    
      </View> 
        
    </SafeAreaView>








  )
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#FF6F00',
alignItems: 'stretch',
    justifyContent: 'center',

  },
  innerContainer2:{flex:0.2},

  innerContainer:{
    flex:0.4,
    padding: 10,
    

  },
  header: {
    color:'white',
    fontWeight:'bold',
   alignSelf: 'center',
 
fontWeight:'bold',
    fontSize: 20,
    
  },
  input: {
    justifyContent: 'center',

    padding: 10,
    height: 40,
    margin: 12,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    borderColor:'white',
    padding: 10,
  },
  signInButton:{
    marginTop:20,
    height: 40,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems:'center',
    borderRadius: 5,
    backgroundColor:'#FFA040',
  },
  buttonText: {fontWeight:'bold',fontSize: 16,color:'white'},
  signUpButton:{
    marginTop:20,
    height: 40,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems:'center',
    borderRadius: 5,
    backgroundColor:'white',
  },
  buttonText2: {fontWeight:'bold',fontSize: 16,color:'#FF6F00'},

})
export default SignIn;