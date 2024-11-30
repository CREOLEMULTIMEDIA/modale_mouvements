import React, { useState } from 'react';
import { MovementForm } from './components/MovementForm';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleSubmit = (data: any) => {
    console.log('Form submitted:', data);
    // Ici, vous pouvez ajouter la logique pour envoyer les données à votre API
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {isModalOpen && (
        <MovementForm 
          onClose={() => setIsModalOpen(false)} 
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

export default App;