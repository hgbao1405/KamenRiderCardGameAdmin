import React, { useState } from 'react';
import Draggable  from 'react-draggable';
import { Resizable } from 'react-resizable';

interface CardProps {
  frontImage: string;
  backImage: string;
  avatar: string|null;  
  stats?: { [key: string]: number };
}
interface avatarProps {
    width: number;
    height: number;
    minConstraints?: [number, number];
    maxConstraints?: [number, number];
}

const Card: React.FC<CardProps> = ({ frontImage, backImage, avatar, stats }) => {
  const [isFront, setIsFront] = useState(true);
  const [avatarProps, setAvatarProps] = useState<avatarProps | null>({
    width:180,
    height:180,
    minConstraints:[100, 100],
    maxConstraints:[300, 300],
  });
  const toggleCard = () => setIsFront(!isFront);

  return (
    <div onClick={toggleCard} style={{ width: '300px', height: '450px', position: 'relative', cursor: 'pointer' }}>
      {isFront ? (
        <>
          <img src={frontImage} alt="Front" style={{ width: '100%', height: '100%' }} />
          {avatar && (
            <Draggable>
            <Resizable 
              width={180}
              height={180}
              minConstraints={[100, 100]}
              maxConstraints={[300, 300]}
              handle={<span className="resize-handle" style={{ cursor: 'se-resize', position: 'absolute', left:'50%', bottom: 0, width: '10px', height: '10px', backgroundColor: 'red', transform: 'transform(50%)' }} />}
            >
              <img
                src={avatar}
                alt="Avatar"
                style={{ width: '100%', height: '100%', position: 'absolute', top: '0', left: '0' }}
              />
            </Resizable >
          </Draggable>
          )}
          {stats && (   
            <div style={{ position: 'absolute', bottom: '20px', left: '30px', color: 'white', fontWeight: 'bold' }}>
              {Object.entries(stats).map(([key, value]) => (
                <div key={key}>
                  {key}: {value}
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <img src={backImage} alt="Back" style={{ width: '100%', height: '100%' }} />
      )}
    </div>
  );
};

export default Card;
