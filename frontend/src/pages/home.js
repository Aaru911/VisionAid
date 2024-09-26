import * as React from 'react';
import "../styles.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'
import apis from '../apis/apis'
import axios from 'axios';
//UI & Icons
import { Button } from "@mui/material";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

//code
const home = () => {
  const [title, setTitle] = useState('')
  //basic function
  const loadTitle = async () => {
    const data = await apis.fetchData();
    setTitle(data.data.title)
  };

  const sendFile=(e)=>{
    if(e.target.files[0].type=='image/heic'||e.target.files[0].type=='image/jpeg'||e.target.files[0].type=='image/png'||e.target.files[0].type=="application/pdf"){
      const formData = new FormData();
      formData.append('file',e.target.files[0]);
      apis.sendFile(formData);
    }
    else{
      alert("Please Upload PDF Other Types Are Not supported")
      console.log(e.target.files[0].type)
    }
  }
  
  useEffect(() => {
    loadTitle()
  }, []);



  return (
    <div className="App">
      <Link to='/welcome'><h1>{title}</h1></Link>
      <h2 className="info">Start Learning New Things With AI Tools</h2>
      <h3 className="mob_info">Mobile View</h3>
      <br />
      <br />
     <div className='body'>
     <Button
        component="label"
        variant="outlined"
        size='large'
        startIcon={<CloudUploadIcon />}
      >
        Upload
        <VisuallyHiddenInput
          type="file"
          onChange={sendFile}
          single
        />
      </Button>
     </div>
    </div>
  );

}

export default home;