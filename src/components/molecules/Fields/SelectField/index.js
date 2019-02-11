import React from 'react';
import InputSelect from '../../../atoms/Inputs/InputSelect';


const select = ({ label, ...others }) => {

  return (
    <div>
      <InputSelect {...others}></InputSelect>
    </div>
  );
}

export default select;