import React from 'react';
import './Fridge.less'; // Подключаем стили

type Props = {
  children: React.ReactNode;
};

const Fridge: React.FC<Props> = ({ children }) => {


  return (
    <div className="fridge">
      
      <div className="door">
      <p className='mt-3 mb-2 text-center'>БИРЮСА</p>
        {children}
        <div className="handle"></div>
      </div>
      <div className="light"></div>
      <div className="shadow"></div>
    </div>
  );
};

export default Fridge;
