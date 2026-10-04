import React from 'react';

interface ProcessingStatusProps {
  messages: { message: string }[];
}

const ProcessingStatus: React.FC<ProcessingStatusProps> = ({ messages }) => {
  return (
    <div className="flex flex-col gap-1 my-2">
      {messages.map((item, index) => (
        <p key={index} className="text-sm text-blue-600">
          {item.message}
        </p>
      ))}
    </div>
  );
};

export default ProcessingStatus;
