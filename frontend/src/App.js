import React from 'react';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div>
      {/* Đây có thể là layout chính */}
      <Outlet />
    </div>
  );
}

export default App;
