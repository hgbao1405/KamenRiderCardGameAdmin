import React, { useState, useRef, useEffect, RefCallback } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { HtmlStyle } from './AttributeEditor';

interface attr {
  Type: 'text' | 'img';
  Value: string;
}

interface CardProps {
  frontImage: string;
  backImage: string;
  Attrs: HtmlStyle[];
  onDrop: (style: HtmlStyle[]) => void;
}


const DraggableElement: React.FC<{
  index: number;
  style: HtmlStyle;
  onDrag: (index: number, left: number, top: number) => void;
}> = ({ index, style, onDrag }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'element',
    item: { index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [index]);

  const elementStyle: React.CSSProperties = {
    position: 'absolute',
    left: style.left ? `${style.left}px`: 0,
    top: style.top ? `${style.top}px`: 0,
    width: style.width ? `${style.width}px`: style.widthPercent ? `${style.widthPercent}%` : undefined,
    height: style.height ? `${style.height}px` : style.heightPercent ? `${style.heightPercent}%` : undefined,
    color: style.color ? style.color : '#ffffff',
    fontSize: style.fontSize? style.fontSize : 20,
    textAlign: style.isCenter ? 'center' : undefined,
    opacity: isDragging ? 0.5 : 1,
    zIndex: index
  };

  return (
    <div ref={drag} style={elementStyle} id={`${index}`}>
      {style.attr.Type === 'text' && <div className='font-bold'>{style.attr.Value}</div>}
      {style.attr.Type === 'img' && <img className='w-full h-full object-cover' src={style.attr.Value} alt="Element" />}
    </div>
  );
};

const DraggableFlippableCard: React.FC<CardProps> = ({ frontImage, backImage, Attrs, onDrop }) => {
  const [isFront, setIsFront] = useState(true);
  const [cardAttr, setCardAttr] = useState<HtmlStyle[]>(Attrs);
  
  const toggleCard = () => setIsFront(!isFront);
  
  useEffect(() => {
    setCardAttr(Attrs);
  }, [Attrs]);

  const handleDrag = (index: number, left: number, top: number) => {
    setCardAttr(prev => {
      const newAttrs = prev.map((attr, i) => 
        i === index ? { ...attr, left, top } : attr
      );
      onDrop(newAttrs);
      return newAttrs;
    });
  };

  const [, drop] = useDrop(() => ({
    accept: 'element',
    drop: (item: { index: number }, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      if (delta) {
        var { left, top, width, height, widthPercent, heightPercent } = cardAttr[item.index];
        let width2=widthPercent?300*(widthPercent/100):width;
        let height2=heightPercent?400*(heightPercent/100):height;
        const left2 = Math.round((left || 0) + delta.x);
        const top2 = Math.round((top || 0) + delta.y);
        handleDrag(item.index, Math.min(Math.max(left2, 0),width2?300-width2:300),
          Math.min(Math.max(top2, 0),height2?400-height2:400));
      }
    },
  }), [cardAttr,handleDrag]);

  const [cardrefCurent, setCardrefCurrent] = useState<HTMLDivElement | null>(null);
  const setRefs: RefCallback<HTMLDivElement> = (node) => {
    setCardrefCurrent(node);
    drop(node);
  };

  useEffect(() => {
    const handleResize = () => {
      if (cardrefCurent) {
        const { width, height } = cardrefCurent.getBoundingClientRect();
        setCardAttr(prev => {
          const newAttrs = prev.map(attr => ({
            ...attr,
            left: Math.min(attr.left || 0, width - 10),
            top: Math.min(attr.top || 0, height - 10),
          }));
          onDrop(newAttrs);
          return newAttrs;
        });
      }
    };
  
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    <div 
      ref={setRefs}
      onClick={toggleCard} 
      className="cursor-pointer [perspective:1000px]"
      style={{ width: `${300}px`, height: `${400}px` }}
    >
      <div 
        className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
          isFront ? 'rotate-y-0' : 'rotate-y-180'
        }`}
      >
        <div className="absolute w-full h-full [backface-visibility:hidden]">
          <img src={frontImage} alt="Front" className="w-full h-full object-cover" />
          {cardAttr.map((attr, index) => {
            return(
            <DraggableElement
              key={index}
              index={index}
              style={attr}
              onDrag={handleDrag}
            />
          )})}
        </div>
        <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <img src={backImage} alt="Back" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default function DraggableFlippableCardWrapper(props: CardProps) {
  return (
    <DndProvider backend={HTML5Backend}>
      <DraggableFlippableCard {...props} />
    </DndProvider>
  );
}