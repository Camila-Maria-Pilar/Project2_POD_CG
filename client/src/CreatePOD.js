
import React, { useState } from 'react';
import QrCodeGenerator from './QrCodeGenerator';

const CreatePOD = () => {
  const [podData, setPodData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    setPodData({
      date: e.target.elements.date.value,
      client: e.target.elements.client.value,
      description: e.target.elements.description.value
    });
  };

  return (
    <div>
      <h1>Create a POD</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input type="date" id="date" name="date" required />
        </div>
        <div className="form-group">
          <label htmlFor="client">Client:</label>
          <input type="text" id="client" name="client" required />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" rows="3" required></textarea>
        </div>
        <button type="submit">Create</button>
      </form>

      <QrCodeGenerator podData={podData} />
    </div>
  );
};

export default CreatePOD;
