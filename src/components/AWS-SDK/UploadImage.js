import React , {useState} from 'react';
import { uploadFile } from 'react-s3';
import {S3_BUCKET, REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY} from './s3env'
import axios from 'axios'



const config = {
    bucketName: S3_BUCKET,
    region: REGION,
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
}

const UploadImage = () => {

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const handleUpload = async (file) => {
        uploadFile(file, config)
            .then(data => {
                showToast()
                console.log(data)
                //put axios call here using the response to insert url into items table
                axios.post()
            })
            .catch(err => console.error(err))
    }

    const showToast = () => {
        // Get the snackbar DIV
        var x = document.getElementById("added-image");
      
        // Add the "show" class to DIV
        x.className = "show";
      
        // After 3 seconds, remove the show class from DIV
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }

    return (
    <div>
        <div>Select file</div>
        <input type="file" onChange={handleFileInput}/>
        <button onClick={() => handleUpload(selectedFile)}>Upload Image</button>
        <div id="added-image">Successfully added the image. Feel free to select/upload another.</div>
    </div>
    )
}

export default UploadImage;