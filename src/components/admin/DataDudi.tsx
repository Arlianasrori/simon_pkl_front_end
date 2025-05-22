// components/Card.tsx
import React from 'react';

interface CardProps {
  code: string;
  number: string;
}

const Card: React.FC<CardProps> = ({ code, number }) => {
  return (
    <div className="flex justify-between items-center bg-gray-300 p-4 rounded-lg shadow-md mb-4">
      <div>
        <h2 className="text-lg font-semibold">PT Tech Tawar Apps</h2>
        <p>Code : {code}</p>
        <p>No Dudi : {number}</p>
      </div>
      <div className="flex items-center">
        <button className="text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Card;
        