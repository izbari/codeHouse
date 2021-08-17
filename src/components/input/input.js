import React from 'react'
import { 
    View,
    TextInput,
    TouchableOpacity,
    Text,
    
 } from 'react-native';
 import styles from './input.style'

 function input(props){
     return(
        <View >
          
            <TextInput multiline={true} value={props.desc} placeholder={props.placeholder} placeholderTextColor='#7C7D7D' 
            style={styles.inputBar} onChangeText={props.onChangeText}/>

           <View style={styles.buttonContainer}>

           <TouchableOpacity  style={styles.okButton} onPress={props.cancelTaskHandler}>
                <View style={styles.butonView}>
                   
                <Text style={styles.butonText}>
                Cancel
                </Text>
                </View>
            </TouchableOpacity>
            
           <TouchableOpacity style={styles.cancelButton} onPress={props.createRoomHandler}>
                <View style={styles.butonView}>
                   
                <Text style={styles.butonText}>
                {props.sendtext}
                </Text>
                </View>
            </TouchableOpacity>
         
           </View>
            
        </View>
        
        
        )
 }
 export default input;