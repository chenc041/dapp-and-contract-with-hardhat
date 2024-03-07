import React from 'react';
import { Outlet } from 'react-router-dom';

export const BasicLayout = () => {
  return (
    <div className='text-3xl font-bold underline'>
      <Outlet />
    </div>
  );
};
