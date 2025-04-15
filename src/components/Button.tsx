import React from 'react';

interface ButtonProps {
  title: string;
  onClick?: () => void;
  textColor?: string;
  bg?: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onClick,
  textColor = 'text-white',
  bg = 'bg-blue-600',
  className = '',
  type = 'button',
  disabled = false,
  icon,
}) => {
  const baseClasses = 'px-4 py-2 rounded-md font-medium transition-all duration-200 flex items-center justify-center gap-2';
  const hoverClasses = disabled ? '' : 'hover:opacity-90 hover:shadow-md';
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${textColor} ${bg} ${hoverClasses} ${disabledClasses} ${className}`}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {title}
    </button>
  );
};

export default Button;