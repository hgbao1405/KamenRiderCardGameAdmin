import React, { useState, useCallback, useEffect } from "react";
import DraggableFlippableCard from "./DraggableFlippableCard.component";
import { Cloudinary } from '@cloudinary/url-gen';
import AttributeEditor, { HtmlStyle } from "./AttributeEditor";
import {MdOutlineMenu} from 'react-icons/md';

const createBasicAttr = (avatar: string, description: string, name: string): HtmlStyle[] => ([
  {
    attr: {
      Type: "text",
      Value: name,
    },
    color: "#ffffff",
    fontSize: "20px",
    widthPercent: 100,
    height: 30,
    top: 10,
    left: 0,
    isCenter: true,
  },
  {
    attr: {
      Type: "img",
      Value: avatar
    },
    width: 180,
    height: 180,
    top: 40,
    left: 60,
  },
  {
    attr: {
      Type: "text",
      Value: description,
    },
    widthPercent: 80,
    height: 160,
    top: 250,
    left: 30,
    color: "#000000",
    fontSize: "14px",
  }
]);
const CardCreator: React.FC = () => {
  const cld = new Cloudinary({ cloud: { cloudName: 'dqnqa1sjb' } });

  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [backImage, setBackImage] = useState<string | null>(null);
  const [attr, setAttr] = useState<HtmlStyle[]>(createBasicAttr(
    cld.image('cld-sample-3').toURL(),
    "This is a description of John Doe. You can drag and reposition this text.",
    "John Doe"
  ));

  const handleAttributeChange = useCallback((index: number, newStyle: HtmlStyle) => {
    setAttr(prev => prev.map((item, i) => i === index ? newStyle : item));
  }, []);

  const handleDrop = useCallback((newAttrs: HtmlStyle[]) => {
    setAttr(newAttrs);
  }, []);

  const [draggedItem, setDraggedItem] = useState<HtmlStyle | null>(null);

  const onDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    setDraggedItem(attr[index]);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.currentTarget.innerHTML);
    e.dataTransfer.setDragImage(e.currentTarget.parentElement!, 20, 20);
  }
  const onDragOver = (index: number) => {
    const draggedOverItem = attr[index];

    // if the item is dragged over itself, ignore
    if (draggedItem === draggedOverItem) {
      return;
    }

    if(draggedItem) {
        // filter out the currently dragged item
        let items = attr.filter(item => item !== draggedItem);
    
        // add the dragged item after the dragged over item
        items.splice(index, 0, draggedItem);
    
        setAttr(items);
    }
  }
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const OpenAttr = (index: number | null) => {
    if (openIndex === index) {
      setOpenIndex(null);
    }
    else setOpenIndex(index);
  }

  return (
    <div className="flex justify-between">
      <div>
        <h1>Card Creator</h1>
        <ul>
            {attr.map((style, index) => (
            <li key={index} className="flex bg-slate-400 p-4 m-4 rounded">
                <div className="drag"
                    draggable
                    onDragStart={(e)=>onDragStart(e,index)} onDragOver={() => onDragOver(index)}>
                        <img className="h-6 w-6" onClick={() => OpenAttr(index)} src="/hamburger.svg" alt="Open Editor" />
                </div>
                <AttributeEditor
                    initialStyle={style}
                    onSave={(newStyle) => handleAttributeChange(index, newStyle)}
                    isOpen={openIndex === index}/>
            </li>
            ))}
        </ul>
      </div>
      <div className="fixed right-[10px]">
        <h2>Sample Image from Cloudinary:</h2>
        <DraggableFlippableCard 
          frontImage={frontImage || cld.image('cld-sample-5').toURL()}
          backImage={backImage || cld.image('cld-sample-4').toURL()}
          onDrop={handleDrop}
          Attrs={attr}
        />
      </div>
    </div>
  );
};

export default CardCreator;