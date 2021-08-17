import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    inputContainer: {
        
        margin: 10,
        backgroundColor:'white',
        borderRadius:20,
        padding: 10,
        
    },
    butonView: {
        backgroundColor: "#FFA500",
        borderRadius: 10,
        margin:10,
        height:40,
        justifyContent: 'center',       
        
            

      },
      butonText: {
       color:'white',
       fontSize: 16,
       fontWeight: 'bold',
       textAlign: 'center',


      },
    
    inputBar:{
       
        margin: 12,
        borderWidth: 1,
        color: 'white',
        padding: 10,  borderRadius: 20,
        borderColor:'#37474F',
    },
    buttonContainer:{
       
        flexDirection:'row',
        justifyContent:'center',
    }
    ,cancelButton:{
        flex:1,
        justifyContent:'flex-end',
    },
    okButton:{           
        justifyContent:'flex-end',
    flex:1,
    },
   
})
export default styles;