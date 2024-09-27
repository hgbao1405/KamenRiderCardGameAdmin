import React, { ReactNode } from 'react'

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
  
  const ProgressBar: React.FC<{ value: number,max?: number,className?: string; }> 
  = ({ value, max = 100, className = '' }) => {
        const percentage = (value / max) * 100;
        return (
            <div className={`progress-bar ${className}`}>
            <div 
                className="progress-bar-fill" 
                style={{ width: `${percentage}%` }}
            ></div>
            </div>
        );
    };

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
  export { Button, ProgressBar }