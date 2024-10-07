import { useState } from "react";
import UploadWidget from "./UploadWidget.component";
import Card from "../Card/Card.component";
import { Cloudinary } from '@cloudinary/url-gen';

const CardCreator: React.FC = () => {
    const cld = new Cloudinary({ cloud: { cloudName: 'dqnqa1sjb' } });

    // Trạng thái cho các ảnh
    const [frontImage, setFrontImage] = useState<string | null>(null);
    const [backImage, setBackImage] = useState<string | null>(null);
    const [avatar, setAvatar] = useState<string | null>(null);
    const cardStats = { Power: 90, Speed: 75, Intelligence: 85 }; // Các chỉ số mẫu

    return (
        <div className="flex justify-between">
            <div>
                <h1>Card Creator</h1>
                
                <h2>Upload Front Image:</h2>
                <UploadWidget setImageURL={setFrontImage} />
                
                <h2>Upload Back Image:</h2>
                <UploadWidget setImageURL={setBackImage} />
                
                <h2>Upload Avatar Image (Optional):</h2>
                <UploadWidget setImageURL={setAvatar} />
                
            </div>
            <div>
                <h2>Sample Image from Cloudinary:</h2>
                <Card frontImage={frontImage?frontImage:cld.image('cld-sample-5').toURL()} 
                backImage={backImage?backImage:cld.image('cld-sample-4').toURL()} 
                avatar={avatar?avatar:cld.image('cld-sample-5').toURL()} stats={cardStats} />
            </div>
        </div>
    );
};

export default CardCreator;
