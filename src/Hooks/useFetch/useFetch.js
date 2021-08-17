import React,{useState,useEffect} from 'react';
import axios from 'axios';



function useFetch(url) {
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState(false)
    const [data,setData] = useState([])

const fetchData= async ()=> {
 
 try {

    const response = await axios.get(url)
    setData(response.data);
    setLoading(false);
 } catch (error) { 
     setLoading(false);
     setError(true);
    
 }
  
    
};
useEffect(() => {
 fetchData()
},[]);

return{error,loading,data,}
}
export default useFetch;