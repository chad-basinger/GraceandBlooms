import React , {useState} from 'react';
import { uploadFile } from 'react-s3';


const S3_BUCKET ='grace-and-blooms';
const REGION ='us-west-1';
const ACCESS_KEY ='AKIA4AVQSQ5PC3UACTW6';
const SECRET_ACCESS_KEY ='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';

const config = {
    bucketName: S3_BUCKET,
    region: REGION,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
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
        <div>React S3 File Upload</div>
        <input type="file" onChange={handleFileInput}/>
        <button onClick={() => handleUpload(selectedFile)}> Upload to S3</button>
    </div>
}

export default UploadImage;