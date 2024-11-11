import React, { useState } from 'react';

const skinTypes = ['Normal', 'Dry', 'Oily', 'Combination', 'Sensitive'];
const productTypes = ['Face Wash', 'Sunscreen', 'Moisturizer', 'Toner', 'Serum'];
const notableEffects = ['Pore-care', 'Brightening', 'Anti-aging', 'Acne-free', 'Oil-control', 'Moisturizing', 'Black-spots', 'Hydrating', 'UV-Protection'];

function InputForm({ onSubmit }) {
  const [skinType, setSkinType] = useState('');
  const [productType, setProductType] = useState('');
  const [majorSkinIssue, setMajorSkinIssue] = useState('');
  const [otherSkinIssues, setOtherSkinIssues] = useState([]);

  const handleOtherSkinIssuesChange = (effect) => {
    if (otherSkinIssues.includes(effect)) {
      setOtherSkinIssues(otherSkinIssues.filter(item => item !== effect));
    } else {
      setOtherSkinIssues([...otherSkinIssues, effect]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ skinType, productType, majorSkinIssue, otherSkinIssues });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Skin Type:</label>
        <select value={skinType} onChange={(e) => setSkinType(e.target.value)} required>
          <option value="">Select Skin Type</option>
          {skinTypes.map(type => <option key={type} value={type}>{type}</option>)}
        </select>
      </div>
      <div>
        <label>Product Type:</label>
        <select value={productType} onChange={(e) => setProductType(e.target.value)} required>
          <option value="">Select Product Type</option>
          {productTypes.map(type => <option key={type} value={type}>{type}</option>)}
        </select>
      </div>
      <div>
        <label>Major Skin Issue:</label>
        <select value={majorSkinIssue} onChange={(e) => setMajorSkinIssue(e.target.value)} required>
          <option value="">Select Major Skin Issue</option>
          {notableEffects.map(effect => <option key={effect} value={effect}>{effect}</option>)}
        </select>
      </div>
      <div>
        <label>Other Skin Issues:</label>
        {notableEffects.map(effect => (
          <label key={effect}>
            <input
              type="checkbox"
              checked={otherSkinIssues.includes(effect)}
              onChange={() => handleOtherSkinIssuesChange(effect)}
            />
            {effect}
          </label>
        ))}
      </div>
      <button type="submit">Get Recommendations</button>
    </form>
  );
}

export default InputForm;