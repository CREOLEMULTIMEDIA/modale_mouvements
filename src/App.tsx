import React, { useState } from 'react';
import { MovementForm } from './components/MovementForm';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100">
      {isModalOpen && <MovementForm onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

export default App;