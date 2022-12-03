import React from 'react';
import './datalist.css';
import DatalistInput, { useComboboxControls } from 'react-datalist-input';



const Datalist = () => (
    <DatalistInput
      placeholder="Chocolate"
      label="Filtro de palabras"
      onSelect={(item) => console.log(item.value)}
      items={[
        { id: 'Chocolate', value: 'Chocolate' },
        { id: 'Coconut', value: 'Coconut' },
        { id: 'Mint', value: 'Mint' },
        { id: 'Strawberry', value: 'Strawberry' },
        { id: 'Vanilla', value: 'Vanilla' },
      ]}
    />
  );

export default Datalist;