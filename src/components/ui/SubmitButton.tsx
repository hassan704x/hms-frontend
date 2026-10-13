import React from 'react';
import { Button } from './button';
import Image from 'next/image';

interface ButtonProps {
    isLoading?: boolean; // Made optional with default value
    className?: string;
    children: React.ReactNode;
    disabled?: boolean; // Added disabled prop for better control
}

const SubmitButton = ({
    isLoading = false, // Default value if undefined
    className = 'bg-green-500 text-white !important w-full cursor-pointer',
    children,
    disabled = false,
    ...props // Capture any other Button props
}: ButtonProps) => {
  const isButtonDisabled = disabled || isLoading;
  
  return (
    <Button 
      type="submit" 
      disabled={isButtonDisabled} 
      className={className}
      {...props} // Spread any additional props
    >
      {isLoading ? (
        <div className="flex items-center gap-4">
          <Image
            src="/assets/icons/loader.svg"
            alt="loader"
            width={24}
            height={24}
            className="animate-spin"
          />
          Loading...
        </div>
      ) : children}
    </Button>
  );
};

export default SubmitButton;