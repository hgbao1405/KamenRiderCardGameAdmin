import { useState } from "react";
import UploadWidget from "./UploadWidget.component";
import DraggableFlippableCard from "../Card/DraggableFlippableCard.component";
import { Cloudinary } from '@cloudinary/url-gen';

const CardCreator: React.FC = () => {
    const cld = new Cloudinary({ cloud: { cloudName: 'dqnqa1sjb' } });

    // Trạng thái cho các ảnh
    const [frontImage, setFrontImage] = useState<string | null>(null);
    const [backImage, setBackImage] = useState<string | null>(null);
    const [avatar, setAvatar] = useState<string | null>(null);

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
                <DraggableFlippableCard
                    frontImage={frontImage?frontImage:cld.image('cld-sample-5').toURL()} 
                    backImage={backImage?backImage:cld.image('cld-sample-4').toURL()}
                    name="John Doe"
                    avatar={avatar?avatar:cld.image('cld-sample-5').toURL()}
                    description="This is a description of John Doe. You can drag and reposition this text."
                />
            </div>
        </div>
    );
};

export default CardCreator;
