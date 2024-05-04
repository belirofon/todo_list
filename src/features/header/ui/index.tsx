import React from 'react';
import './Header.less'; // Подключаем стили

const Header: React.FC = () => {
  return (
    <div className="header">
      <div className="corner left"></div>
      <div className="center">Ваш Todo List</div>
      <div className="corner right"></div>
    </div>
  );
};

export default Header;