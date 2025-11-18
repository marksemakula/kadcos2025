// src/hooks/useCMSData.js
import { useState, useEffect } from 'react';

export const useCMSData = (key, defaultValue = []) => {
  const [data, setData] = useState(defaultValue);

  useEffect(() => {
    const saved = localStorage.getItem(`cms_${key}`);
    if (saved) {
      setData(JSON.parse(saved));
    }
  }, [key]);

  const updateData = (newData) => {
    setData(newData);
    localStorage.setItem(`cms_${key}`, JSON.stringify(newData));
  };

  return [data, updateData];
};