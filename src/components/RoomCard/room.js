import React from 'react'
import { 
    TouchableOpacity ,Text } from 'react-native';
import styles from './room.style';

const RoomCard= (props) => {

  return( 
     
      <TouchableOpacity style={styles.room} onLongPress={props.deleteRoom} onPress={props.toNavigateRoomHandler}>
        <Text style={styles.roomText}>{props.item.name}</Text>
      </TouchableOpacity>

     
   
       )
    
}
 
       export default RoomCard;