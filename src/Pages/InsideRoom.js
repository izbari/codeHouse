import React,{useState,useEffect,useRef} from 'react'
import {StyleSheet, SafeAreaView,TouchableOpacity,Text,View ,FlatList, Dimensions} from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import parseContent from '../utils/parseFirebaseData';
import Input from '../components/input'
import RoomCard from '../components/RoomCard'
import RBSheet from "react-native-raw-bottom-sheet";
import {  formatDistance , parseISO} from 'date-fns'
import { tr} from 'date-fns/locale'
import Loading from '../components/Loading';
import Error from '../components/Error';

function InsideRoom(props){

  const refRBSheet = useRef();

  //states
    const roomName = props.route.params.roomName;
    const [text,onChangeText] = useState();
    const [isButtonShown,setButtonShown] = useState(true);
    const [error,setError] = useState(false);
    const [loading,setLoading] = useState(true);

    const [contentList,setContentList] = useState();
    const [path,setPath] = useState();

   


  //functions
  useEffect(() => {
    getAllMessages();
    
}, []);
function getAllMessages(){
    const ref = database().ref("rooms/");

    ref.on("value",snapshot => {
       
        if(snapshot.val()== null){setLoading(false) setError(true) return;}
        //LOOPING EACH CHILD AND PUSHING TO ARRAY
        snapshot.forEach(item => {
           if(item.val().name == roomName){
             setPath(item.key);
           }
            item.forEach(item2=>{ 
                if(item2.key == 'messages' && item.val().name == roomName)
                {
                    const parsedData = parseContent(item2.val())
                    setContentList(parsedData);
                   setLoading(false)
                   
      
                }
           
            });
           
        });

        
    })
}
if(loading){
 return  <Loading />
  }
  if(error){
   return <Error />
    }
const createMessage = () =>{
  refRBSheet.current.close() 
    setButtonShown(!isButtonShown)
  
    const userMail= auth().currentUser.email;
    const contentObj={
        message:text,
        name: userMail.split('@')[0],
        date: new Date().toISOString(),
    };
    const ref = database().ref("rooms/"+path+'/messages/');
    ref.push(contentObj)
    
  
}
  const chatItem = ({ item }) => {
    const formattedData =formatDistance(parseISO(item.date), new Date(), {
       addSuffix: true ,
       locale:tr,
      });

     return(
      <View style={styles.messageContainer}>
      <View style={styles.innerMessageContainer}>
          <Text style={styles.whoSend}>{item.name}</Text>
          <Text>{formattedData}</Text>
      </View>
      <Text style={styles.message}>{item.message}</Text>
  </View>
     )
  }

      const cancelTaskHandler = () =>{
        refRBSheet.current.close() 
        setButtonShown(!isButtonShown)
      }
return(


    <SafeAreaView style={styles.container}>
      
      <View style={styles.innerContainer}>

      <Text style={styles.firstMessage} ellipsizeMode='tail' numberOfLines={2}>
 {roomName} odası kuruldu !
</Text>

      </View>
    <View style={styles.input}>
   

    <FlatList 
            data={contentList}
            renderItem={chatItem}
            keyExtractor={item => item.id}
            
        />
    </View>
        

        
       <RBSheet
        ref={refRBSheet}
        
        closeOnDragDown={false}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent"
          },
          draggableIcon: {
            backgroundColor: "#000"
          },
          container: {
            height: 150,
            alignSelf:'center',
            justifyContent:'flex-end',

            backgroundColor:'#37474F',
            borderRadius:20,
            padding: 10,
          },
        }}
      >
  <Input sendtext='Send' placeholder = 'Type something...' cancelTaskHandler={()=> cancelTaskHandler()} createRoomHandler ={()=>createMessage()} desc={text} onChangeText={onChangeText}/>
      </RBSheet>
    
    {isButtonShown && <TouchableOpacity  onPress={()=> {refRBSheet.current.open() 
                                     setButtonShown(!isButtonShown)   }} style={styles.addRoom}>
        <Text style = {styles.plus}>+</Text>
    </TouchableOpacity>}
    </SafeAreaView>








  )
}
const styles = StyleSheet.create({
  container: {
      flex:1,
    backgroundColor:'#FFB74D',

  },

  innerContainer:{
      flex:0.05,
    padding: 10,
    
  },
  input:{
      flex:1,

justifyContent:"flex-end",

  },
addRoom:{
    flex:1,
    position: 'absolute',
    bottom:25,
    right:25,
    backgroundColor:'#FFA040',
    justifyContent:'center',
    alignItems: 'center',
    height:70,width:70,
  
    borderRadius:50,
},
plus:{color:'white',fontSize:42,alignSelf:'center'},
  firstMessage:{
    flex:1,
    borderRadius:10,
    borderStyle:'dashed',
    borderWidth:1,
    borderColor:'white',
    padding:8,
    fontSize:14,
    color:'white',
    fontWeight:'bold',
    textAlign:'center',
    width:350,
    height: 40,
    justifyContent:'center',
    alignSelf:'center',
  },
  messageContainer:{
    padding: 20,
    margin:12,
    backgroundColor:'white',
    borderRadius:10,
    flex:1,
  },
  innerMessageContainer:
  {
    flex:1,
    flexDirection: 'row',
  }
  ,message:{
    fontWeight:'bold',
    marginTop:15,
  },
  whoSend:{
    flex:1,
  }

})
export default InsideRoom;