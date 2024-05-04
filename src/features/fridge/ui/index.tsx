import React, { useState } from 'react';
import './Fridge.less'; // Подключаем стили

const Fridge: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleTooltipToggle = () => {
    setShowTooltip(!showTooltip);
  };

  return (
    <div className="fridge">
      <div className="door">
        <div className="handle"></div>
        <div
          className="tooltip"
          onMouseEnter={handleTooltipToggle}
          onMouseLeave={handleTooltipToggle}
        >
          <span className={`tooltip-text ${showTooltip ? 'visible' : ''}`}>
            Добавить новую заметку
          </span>
        </div>
      </div>
      <div className="light"></div>
      <div className="shadow"></div>
    </div>
  );
};

export default Fridge;
