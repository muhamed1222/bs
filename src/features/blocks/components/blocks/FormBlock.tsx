import React from 'react';
import { BlockComponentProps, FormBlock as FormBlockType } from '../../../../shared/types/block';

export const FormBlock: React.FC<BlockComponentProps> = ({ block, style }) => {
  const formBlock = block as FormBlockType;
  return (
    <form className="space-y-4" style={style}>
      {formBlock.fields.map((field, index) => (
        <input
          key={index}
          type={field.type}
          placeholder={field.placeholder}
          required={field.required}
          className="w-full px-4 py-2 border rounded"
        />
      ))}
      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-600 text-white rounded"
      >
        {formBlock.submitText || 'Отправить'}
      </button>
    </form>
  );
}; 