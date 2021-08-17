import React,{useState,useEffect,useRef} from 'react'
import {StyleSheet, Button,Alert,SafeAreaView,TouchableOpacity,Text,View ,FlatList, Dimensions} from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import parseContent from '../utils/parseFirebaseData';
import Input from '../components/input'
import RoomCard from '../components/RoomCard'
import RBSheet from "react-native-raw-bottom-sheet";
import Loading from '../components/Loading';
import Error from '../components/Error';

function Rooms(props){
  const refRBSheet = useRef();

    //states
    const [text,onChangeText] = useState();
    const [isButtonShown,setButtonShown] = useState(true);
    const [contentList,setContentList] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(false);


      useEffect(() => {
          database().ref('rooms/').on('value',snapshot =>{
              const contentData = snapshot.val();
              const parsedData = parseContent(contentData);
              if(contentData == null){
                setError(true)
              }
              else{
                 setLoading(false)

              }
              //console.log('content data: ',parsedData)
              setContentList(parsedData);
        });
     
   
 }, []);
 if(error){
  return <Error />
 }
 if(loading){
   return <Loading />
 }
        const deleteRoom = (item) => {
            console.log(item.name);
            Alert.alert(
                "Are your sure?",
                "Are you sure you want to remove this beautiful box?",
                [
                  // The "Yes" button
                
                  // The "No" button
                  // Does nothing but dismiss the dialog when tapped
                  {
                    text: "No",
                  }, {
                    text: "Yes",
                    onPress: () => {
                     let userRef = database().ref('rooms/' + item.id);
                    userRef.remove()
                    },
                  },
                ]
              );
           
        };
// zaferrosh@gmail.com

const renderItem = ({ item }) => (
<RoomCard 
deleteRoom={()=>{deleteRoom(item)}}
toNavigateRoomHandler={()=> props.navigation.navigate('InsideRoom',{roomName:item.name})} 
item={item} />
  );


const createRoomHandler = () =>{
  refRBSheet.current.close() 
    setButtonShown(!isButtonShown)
    const userMail= auth().currentUser.email;
    const contentObj={
        name:text,
        creator: userMail.split('@')[0],
        date: new Date().toISOString(),
    };
   // console.log(contentObj);
    database().ref('rooms/').push(contentObj);
    onChangeText('');

}
const cancelTaskHandler = () =>{
  refRBSheet.current.close() 
  setButtonShown(!isButtonShown)
}

 const renderHeader =() =>(
   <Text>Oda ekle</Text>
 )
return(

<SafeAreaView style={styles.container}>
      
        
  <View style = {styles.roomContainer}>

      <FlatList 
            data={contentList}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns='2'
        />
</View>
 <View style={styles.innerContainer}>
    {isButtonShown && <TouchableOpacity onPress={()=> {refRBSheet.current.open() 
                                     setButtonShown(!isButtonShown)   }} style={styles.addRoom}>
        <Text style = {styles.plus}>+</Text>
    </TouchableOpacity>}
 
 

        
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
  <Input sendtext='Add' placeholder = 'Room name...' cancelTaskHandler={()=> cancelTaskHandler()} createRoomHandler ={()=>createRoomHandler()} desc={text} onChangeText={onChangeText}/>
      </RBSheet>
      {isButtonShown && <TouchableOpacity onPress={()=> {refRBSheet.current.open() 
                                     setButtonShown(!isButtonShown)   }} style={styles.addRoom}>
        <Text style = {styles.plus}>+</Text>
    </TouchableOpacity>}
 
    </SafeAreaView>

)
}
const styles = StyleSheet.create({
container: { backgroundColor:'white'},
innerContainer: {justifyContent:'flex-end',alignContent:'space-around',backgroundColor:'white'},
roomContainer:{backgroundColor:'white',alignSelf:'center',justifyContent:'flex-end'},
header: {fontWeight:'bold',color:'white',fontSize:24},

addRoom:{
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
inputDeneme:{justifyContent:'flex-end'},
})
export default Rooms;        
