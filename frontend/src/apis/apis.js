import axios from 'axios';

const fetchData = async () => {
    try {
        const res = await axios.get(process.env.REACT_APP_SERVER_API,'');
        return res;
    } catch (error) {
        console.error(error);
    }
};

const sendFile= async (formData) =>{
    try{
        const res = await axios.post(process.env.REACT_APP_SERVER_API+'upload',formData);
        return res.data
    }catch(error){
        console.log(error);
    }

}

export default {fetchData,sendFile};
