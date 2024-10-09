import React, { useState, useRef, useEffect, RefCallback } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface HtmlStyle {
  isCenter?: boolean;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  topPercent?: number;
  leftPercent?: number;
  rightPercent?: number;
  bottomPercent?: number;
  width?: number;
  height?: number;
  widthPercent?: number;
  heightPercent?: number;
  color?: string;
  fontSize?: string;
  padding?: string;
  margin?: string;
}

interface CardAttrHtml {
  Name: HtmlStyle;
  Avatar: HtmlStyle;
  Description: HtmlStyle;
}

type CardAttrKey = keyof CardAttrHtml;

interface CardProps {
  frontImage: string;
  backImage: string;
  name: string;
  avatar: string;
  description: string;
}

const createBasicAttr = (): CardAttrHtml => ({
  Name: {
    color: "white",
    fontSize: "20px",
    widthPercent: 100,
    top: 10,
    left: 10,
    isCenter: true,
  },
  Avatar: {
    width: 180,
    height: 180,
    top: 40,
    left: 60,
  },
  Description: {
    widthPercent: 80,
    top: 250,
    left: 30,
    color: "white",
    fontSize: "14px",
  },
});

const DraggableElement: React.FC<{
  id: CardAttrKey;
  style: HtmlStyle;
  children: React.ReactNode;
  onDrag: (id: CardAttrKey, left: number, top: number) => void;
}> = ({ id, style, children, onDrag }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'element',
    item: { id },

    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [id]);

  const elementStyle: React.CSSProperties = {
    position: 'absolute',
    left: style.left,
    top: style.top,
    width: style.width ? `${style.width}px`: style.widthPercent ? `${style.widthPercent}%` : undefined,
    height: style.height ? `${style.height}px` : style.heightPercent ? `${style.heightPercent}%` : undefined,
    color: style.color,
    fontSize: style.fontSize,
    padding: style.padding,
    margin: style.margin,
    textAlign: style.isCenter ? 'center' : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={drag} style={elementStyle}>
      {children}
    </div>
  );
};

const DraggableFlippableCard: React.FC<CardProps> = ({ frontImage, backImage, name, avatar, description }) => {
  const [isFront, setIsFront] = useState(true);
  const [cardAttr, setCardAttr] = useState<CardAttrHtml>(createBasicAttr());
  
  const toggleCard = () => setIsFront(!isFront);

  const handleDrag = (id: CardAttrKey, left: number, top: number) => {
    setCardAttr(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        left,
        top,
        width: prev[id].width, // thêm dòng này để giữ nguyên width khi kéo theo chiều dọc
      },
    }));
  };

  const [, drop] = useDrop(() => ({
    accept: 'element',
    drop: (item: { id: CardAttrKey }, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      if (delta) {
        const left = Math.round((cardAttr[item.id].left || 0) + delta.x);
        const top = Math.round((cardAttr[item.id].top || 0) + delta.y);
        handleDrag(item.id, left, top);
      }
    },
  }), [cardAttr]);

  const [cardRefCurrent, setCardRefCurrent] = useState<HTMLDivElement | null>(null);
  
  useEffect(() => {
    const handleResize = () => {
      if (cardRefCurrent) {
        const { width, height } = cardRefCurrent.getBoundingClientRect();
        setCardAttr(prev => 
          Object.entries(prev).reduce((acc, [key, value]) => ({
            ...acc,
            [key]: {
              ...value,
              left: Math.min(value.left || 0, width - 10),
              top: Math.min(value.top || 0, height - 10),
            },
          }), {} as CardAttrHtml)
        );
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const setRefs: RefCallback<HTMLDivElement> = (node) => {
    setCardRefCurrent(node);
    drop(node);
  };

  return (
    <div 
      ref={setRefs}
      onClick={toggleCard} 
      className="w-[300px] h-[450px] cursor-pointer [perspective:1000px]"
    >
      <div 
        className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
          isFront ? 'rotate-y-0' : 'rotate-y-180'
        }`}
      >
        {/* Front side */}
        <div 
          className="absolute w-full h-full [backface-visibility:hidden]"
        >
          <img src={frontImage} alt="Front" className="w-full h-full object-cover" />
          <DraggableElement id="Name" style={cardAttr.Name} onDrag={handleDrag}>
            <div className="font-bold">{name}</div>
          </DraggableElement>
          <DraggableElement id="Avatar" style={cardAttr.Avatar} onDrag={handleDrag}>
            <img src={avatar} alt="Avatar" className="w-full h-full object-cover border-4 border-white" />
          </DraggableElement>
          <DraggableElement id="Description" style={cardAttr.Description} onDrag={handleDrag}>
            <div>{description}</div>
          </DraggableElement>
        </div>

        {/* Back side */}
        <div 
          className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)]"
        >
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