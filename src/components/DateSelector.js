import React from 'react';

const DateSelector = ({ onSelectDate }) => {
  return (
    <div>
      <label>Select Date</label>
      <input type="date" onChange={(e) => onSelectDate(e?.target?.value)} />
    </div>
  );
};

export default DateSelector;
