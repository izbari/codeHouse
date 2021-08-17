import React,{useState} from 'react'
import { Alert,TextInput,StyleSheet,SafeAreaView,View,Text,TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';


function SignIn(props){


  //states

  const [mail, onChangeMail] = React.useState(null);
  const [mail2, onChangeMail2] = React.useState(null);
  const [number, onChangeNumber] = React.useState(null);

  //functions

 const authHander= () => {
    
    auth()
    .createUserWithEmailAndPassword(mail, number)
    .then(() => {
      Alert.alert('User account created & signed in!');
      onChangeMail('')
      onChangeMail2('')
      onChangeNumber('')
        props.navigation.navigate('Rooms')
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }
  
      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
  
      console.error(error);
    });
 }

 const singupHandler =()=>{
     if(mail === mail2){
         authHander();
     }
     else{
         console.log('Mails dont match...')
     }
 }
  return(




    <SafeAreaView style={styles.container}>
      
      <View style={styles.innerContainer2}>
      <Text style={styles.header }>CodeHouse</Text>
      </View>
        <View style={styles.innerContainer}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeMail}
        value={mail}
        placeholder="e-postanızı giriniz..."
        placeholderTextColor="white" 
      />
       <TextInput
        style={styles.input}
        onChangeText={onChangeMail2}
        value={mail2}
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
      <TouchableOpacity onPress={()=>singupHandler()} style={styles.signInButton}>
        <Text style={styles.buttonText}>Kayıt Ol</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> props.navigation.goBack()}style={styles.signUpButton}>
        <Text style={styles.buttonText2}>Geri</Text>
      </TouchableOpacity>
    
      </View> 
        
    </SafeAreaView>








  )
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#FF6F00',
    justifyContent: 'center',

  },
  innerContainer2:{flex:0.3},

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