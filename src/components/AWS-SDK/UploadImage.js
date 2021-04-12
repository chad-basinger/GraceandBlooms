import React , {useState} from 'react';
import { uploadFile } from 'react-s3';
import {S3_BUCKET, REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY} from './s3env'



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
            .then(data => console.log(data))
            .catch(err => console.error(err))
    }

    return <div>
        <div>Select file</div>
        <input type="file" onChange={handleFileInput}/>
        <button onClick={() => handleUpload(selectedFile)}>Upload Image</button>
    </div>
}

export default UploadImage;