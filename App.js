import React,{useState} from 'react'
import { TextInput,StyleSheet,SafeAreaView,View,Text,TouchableOpacity } from 'react-native';


function SignIn(){


  //states

  const [text, onChangeText] = React.useState(null);
  const [number, onChangeNumber] = React.useState(null);

  //functions

 

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
      <TouchableOpacity style={styles.signInButton}>
        <Text style={styles.buttonText}>Giriş yap</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signUpButton}>
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