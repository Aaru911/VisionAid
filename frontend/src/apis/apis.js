import axios from 'axios';

const fetchData = async () => {
    try {
        const res = await axios.get(process.env.REACT_APP_SERVER_API);
        return res;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const sendFile= async (formData) =>{
    try{
        await axios.post(process.env.REACT_APP_SERVER_API+'/upload',formData);
    }catch(error){
        console.log(error);
    }

}

export default {fetchData,sendFile};
