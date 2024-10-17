import React, { ReactNode, useEffect, useState } from 'react'
import {Progress, Tag} from 'antd';
import e from 'express';
import MessageService from '../../service/message.service';
export const CharacterProgressBar: React.FC<{ value: number; maxValue: number; donvi?:string }> = ({ value, maxValue, donvi }) => {
  const hpPercentage = (value / maxValue) * 100;

  return (
    <div>
      <Progress percent={hpPercentage} status="active" format={() => `${value} ${donvi?donvi:""}`} />
    </div>
  );
};  
const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'danger' }> = ({ 
    children, 
    variant = 'primary', 
    className = '', 
    ...props 
  }) => {
    return (
      <button className={`button button-${variant} ${className}`} {...props}>
        {children}
      </button>
    )
  }
  
  interface CardProps {
    children: ReactNode;
    className?: string;
  }
  
  export const Card: React.FC<CardProps> = ({ children, className = '' }) => (
    <div className={`bg-white shadow-md rounded-lg ${className}`}>
      {children}
    </div>
  )
  
  export const CardHeader: React.FC<CardProps> = ({ children, className = '' }) => (
    <div className={`px-6 py-4 border-b border-gray-200 ${className}`}>
      {children}
    </div>
  )
  
  export const CardTitle: React.FC<CardProps> = ({ children, className = '' }) => (
    <h2 className={`text-xl font-semibold ${className}`}>
      {children}
    </h2>
  )
  
  export const CardDescription: React.FC<CardProps> = ({ children, className = '' }) => (
    <p className={`mt-1 text-sm text-gray-600 ${className}`}>
      {children}
    </p>
  )
  
  export const CardContent: React.FC<CardProps> = ({ children, className = '' }) => (
    <div className={`px-6 py-4 ${className}`}>
      {children}
    </div>
  )
  
  export const CardFooter: React.FC<CardProps> = ({ children, className = '' }) => (
    <div className={`px-6 py-4 border-t border-gray-200 ${className}`}>
      {children}
    </div>
  )
  export { Button }


interface TagInputProps {
  onChange: (tags: string[]) => void;
  keyword: string|null;
  disable: boolean;
}

const Tag2:React.FC<{tag:string, removeTag?: () => void,clasName?:string,disabled?:boolean}>=(props)=>{
  return (
        <div className={props.clasName} style={{ 
          display: 'inline-block', 
          padding: '5px', margin: '2px', 
          backgroundColor: '#e0e0e0', 
          borderRadius: '5px' }}>
          <span className='max-w-[90%]'>{props.tag}</span>
          {
            props.removeTag && 
            <span onClick={props.removeTag} 
            style={{ marginLeft: '5px', cursor: 'pointer', color: 'red',display: props.disabled===true?'none':'inline-block'}}>
              x
            </span>
          }
        </div>
  );
}

export { Tag2 }
const TagInput: React.FC<TagInputProps> = ({ onChange, keyword, disable}) => {
  const [tags, setTags] = useState<string[]>(
    !(keyword===null||keyword==='') ? keyword.split(',').map((tag) => tag.trim().toLowerCase()):[]
  );

  const [inputValue, setInputValue] = useState('');

  // Thêm tag khi nhấn Enter hoặc dấu phẩy
  const addTag = () => {
    var inputValue2 = inputValue.trim().toLowerCase();
    if(inputValue2!==''){
      if (!tags.includes(inputValue2)) {
        const newTags = [...tags, inputValue2];
        setTags(newTags);
        setInputValue('');
        console.log(newTags);
        onChange(newTags);
      }
      else{
        MessageService.error("Keyword name '"+inputValue2+"' has already exists");
      }
    }
  };

  // Xoá tag
  const removeTag = (indexToRemove: number) => {
    const newTags = tags.filter((_, index) => index !== indexToRemove);
    setTags(newTags);
    onChange(newTags); // Gọi hàm callback khi thay đổi
  };

  // Xử lý sự kiện khi nhập vào
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Xử lý sự kiện nhấn phím
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="tag-input-container" style={{ border: '1px solid #ccc', padding: '5px', borderRadius: '5px' }}>
      {tags.map((tag, index) => (
        <Tag2 key={index} tag={tag} removeTag={() => removeTag(index)} disabled={disable}/>
      ))}
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Enter a tag..."
        style={{ border: 'none', outline: 'none', marginLeft: '5px', width: '100%' }}
        maxLength={40}
        minLength={1}
        disabled={disable}
      />
    </div>
  );
};

export default TagInput;
