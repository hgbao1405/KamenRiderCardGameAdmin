import React, { useState } from 'react';
import CryptoJS from 'crypto-js'
import { Cloudinary } from '@cloudinary/url-gen';

interface UploadWidgetProps {
  setImageURL: (url: string) => void; // Thêm prop này
}

const UploadWidget: React.FC<UploadWidgetProps> = ({ setImageURL }) => {
  const [file, setFile] = useState<File | null>(null);
  const cld = new Cloudinary({ cloud: { cloudName: 'dqnqa1sjb' } });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    setFile(selectedFile);
  };
  const uploadImage = async (file: File) => {
    const apiKey = '945337453852381'; // Thay thế bằng API Key của bạn
    const apiSecret = 'OA1uMp-DSoXjjhCuvsGW4_5v_Zs'; // Thay thế bằng API Secret của bạn
    const timestamp = Math.floor(Date.now() / 1000); // Tạo timestamp
  

    // // Tạo chữ ký
    // const signature = generateSignature(file.name, timestamp, apiSecret, apiKey); // Hàm tạo chữ ký
  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ml_default');
    // formData.append('timestamp', timestamp.toString());
    // formData.append('api_key', apiKey);
    // formData.append('signature', signature);
  
    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/dqnqa1sjb/image/upload`, {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        if (response.ok) {
            console.log(data);
            setImageURL(data.secure_url); // Gọi hàm để cập nhật URL
        } else {
            console.error('Upload error:', data);
        }
    } catch (err) {
      console.error('Upload error:', err);
    }
  };
  
//   // Hàm để tạo chữ ký
//   const generateSignature = (fileName: string, timestamp: number, apiSecret: string, apiKey: string, uploadPreset: string = 'ml_default'): string => {
//     const stringToSign = `file=${fileName}&timestamp=${timestamp}&upload_preset=${uploadPreset}&api_key=${apiKey}`;
//     const signature = CryptoJS.HmacSHA1(stringToSign, apiSecret).toString(); // Sử dụng CryptoJS để tạo chữ ký
//     return signature;
//   };
  
  const handleUpload = () => {
    if (file) {
      uploadImage(file);
    }
  };
  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadWidget;
