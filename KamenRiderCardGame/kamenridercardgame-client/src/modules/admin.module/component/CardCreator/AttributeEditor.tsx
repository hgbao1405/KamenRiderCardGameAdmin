import React, { useState, useEffect, useCallback } from 'react';

export interface HtmlStyle {
  attr: attr;
  isCenter?: boolean;
  top?: number;
  left?: number;
  width?: number;
  height?: number;
  widthPercent?: number;
  heightPercent?: number;
  color?: string;
  fontSize?: string;
}

interface attr {
  Type: 'text' | 'img';
  Value: string;
}

type UnitType = 'px' | 'percent';

interface AttributeEditorProps {
  initialStyle: HtmlStyle;
  onSave: (style: HtmlStyle) => void;
  isOpen:boolean;
}

export default function AttributeEditor({ initialStyle, onSave, isOpen}: AttributeEditorProps) {
  const [style, setStyle] = useState<HtmlStyle>(initialStyle);
  const [units, setUnits] = useState<Record<string, UnitType>>({
    top: 'px',
    left: 'px',
    width: 'px',
    height: 'px',
  });
 
  useEffect(() => {
    setStyle(initialStyle);
    setUnits({
      width: initialStyle.widthPercent !== undefined ? 'percent' : 'px',
      height: initialStyle.heightPercent !== undefined ? 'percent' : 'px',
    });
  }, [initialStyle]);

  const handleChange = useCallback((key: keyof HtmlStyle, value: any) => {
    if (key === 'color') {
      console.log(value);
    }
    setStyle(prev => ({ ...prev, [key]: value }));
  }, []);

  const handleUnitChange = useCallback((key: string, unit: UnitType) => {
    setUnits(prev => ({ ...prev, [key]: unit }));
    const pxValue = style[key as keyof HtmlStyle] as number | undefined;
    const percentValue = style[`${key}Percent` as keyof HtmlStyle] as number | undefined;
    
    if (unit === 'percent') {
      if (pxValue !== undefined) {
        handleChange(`${key}Percent` as keyof HtmlStyle, pxValue);
        handleChange(key as keyof HtmlStyle, undefined);
      }
    } else {
      if (percentValue !== undefined) {
        handleChange(key as keyof HtmlStyle, percentValue);
        handleChange(`${key}Percent` as keyof HtmlStyle, undefined);
      }
    }
  }, [style, handleChange]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const cleanedStyle = Object.fromEntries(
      Object.entries(style).filter(([_, value]) => value !== undefined && value !== '')
    ) as HtmlStyle;
    onSave(cleanedStyle);
  }, [style, onSave]);

  const renderInput = useCallback((key: keyof HtmlStyle, label: string, type: string = 'text',isReq?: boolean) => {
    const isUnitSelectable = ['width', 'height'].includes(key);
    const unit = units[key];
    const value = unit === 'percent' ? style[`${key}Percent` as keyof HtmlStyle] : style[key];
    const { width, height } = style;
    const MaxValue= unit === 'percent' ? 100 :
      (key === 'width') ? 300 :
      (key === 'left') ? (width?300-width:300) :
      (key === 'height') ? (400) : 
      (key === 'top') ? (height?400-height:400) : 
      undefined;

    return (
      <div key={key} className="mb-4">
        <label htmlFor={key} className="block mb-2 text-sm font-bold">{label}</label>
        <div className="flex items-center">
          <input
            type={type}
            id={key}
            value={value === undefined || value === null ? '' : String(value)}
            onChange={(e) => {
              const newValue = type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value;
              if(type==='number'){
                  if (unit === 'percent') {
                  handleChange(`${key}Percent` as keyof HtmlStyle, newValue);
                } else {
                  handleChange(key, newValue);
                }
              }
              else{
                handleChange(key, newValue);
              }
            }}
            className="mr-2 px-3 py-2 border rounded-md w-full h-[41.3px]"
            max={MaxValue}
            min={0}
            required={isReq} />
          {isUnitSelectable && (
            <select 
              value={unit} 
              onChange={(e) => handleUnitChange(key, e.target.value as UnitType)}
              className="px-3 py-2 border rounded-md h-[41.3px]"
            >
              <option value="px">px</option>
              <option value="percent">%</option>
            </select>
          )}
        </div>
      </div>
    );
  }, [style, units, handleChange, handleUnitChange]);

  return (
    <div className="cursor-pointer ml-[20px] w-[600px]">
      {!isOpen && 
        <div className="space-y-4">
            <span className='w-full'>
              {
                style.attr?.Type==="text"?`Text:${style.attr.Value}`:
                (<img className='h-[20px] object-cover' src={style.attr.Value} alt="Element" />)
              }
            </span>
        </div>}
      {isOpen && (
        <form onSubmit={handleSubmit} className="space-y-4 bg-slate-400 rounded">
        <div className='w-full'>
          <label htmlFor="attrType" className="block mb-2 text-sm font-bold">Type</label>
          <select 
            id="attrType"
            value={style.attr.Type} 
            onChange={(e) => handleChange('attr', { ...style.attr, Type: e.target.value as 'text' | 'img' })}
            className="px-3 py-2 border rounded-md w-full">
            <option value="text">Text</option>
            <option value="img">Image</option>
          </select>
        </div>
        <div className='w-full'>
          <label htmlFor="attrValue" className="block mb-2 text-sm font-bold">Value</label>
          <input
            type="text"
            id="attrValue"
            value={style.attr.Value}
            onChange={(e) => handleChange('attr', { ...style.attr, Value: e.target.value })}
            className="px-3 py-2 border rounded-md w-full"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 w-full">
          {renderInput('top', 'Top', 'number',true)}
          {renderInput('left', 'Left', 'number',true)}
          {renderInput('width', 'Width', 'number')}
          {renderInput('height', 'Height', 'number')}
          {style.attr.Type === 'text' && renderInput('color', 'Color', 'color')}
          {style.attr.Type === 'text' && renderInput('fontSize', 'Font Size')}
        </div>
        {style.attr.Type === 'text' && (<div className="flex items-center space-x-2 w-full">
          <label htmlFor="isCenter" className="text-sm font-bold">Center</label>
          <input
            type="checkbox"
            id="isCenter"
            checked={style.isCenter || false}
            onChange={(e) => handleChange('isCenter', e.target.checked)}
            className="form-checkbox h-5 w-5"
          />
        </div>)}
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Save Changes</button>
      </form>
      )}
      
    </div>
    
  );
}