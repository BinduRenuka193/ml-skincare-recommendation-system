import React, { useState } from 'react';
import InputForm from './components/InputForm';
import ProductList from './components/ProductList';

function App() {
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState(null); // Optional: State to handle errors

  const handleSubmit = async (inputs) => {
    try {
      const response = await fetch('http://localhost:5000/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputs),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const recommendations = await response.json();
      setRecommendations(recommendations);
      setError(null); // Reset error state if successful
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      setError('Failed to fetch recommendations. Please try again.'); // Set error state
    }
  };

  return (
    <div className="App">
      <h1>Skincare Recommendation System</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
      <InputForm onSubmit={handleSubmit} />
      <ProductList products={recommendations} />
    </div>
  );
}

export default App;
