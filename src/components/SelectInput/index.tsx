import React from 'react';
import Form from 'react-bootstrap/Form';

interface ISelectInputProps {
  options: {
    value: string | number;
    label: string | number;
  }[];
  type: string;
  onChange(event: React.ChangeEvent<HTMLSelectElement>): void | undefined;
  defaultValue?: string | number;
}

const SelectInput: React.FC<ISelectInputProps> = ({ options, onChange, defaultValue, type }) => (
  <Form>
    <Form.Group className="mb-1">
      <Form.Select aria-label="Default select example" name="price" onChange={onChange} defaultValue={defaultValue}>
        <option value={type}>{type === 'data' && 'Selecione a data'}</option>
        {options.map((item, index) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  </Form>
);

export default SelectInput;
