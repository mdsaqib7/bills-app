import React, { useState } from 'react';
import './Form.css'; // Import custom CSS file for Form component
import { Bill } from "@/utils/forms";
import Link from 'next/link';
import { toBase64 } from '@/utils';


const Form = ({ onSubmit }: {onSubmit: (bill: Bill) => void}) => {
  const [patientName, setPatientName] = useState('');
  const [address, setAddress] = useState('');
  const [hospitalName, setHospitalName] = useState('');
  const [dateOfService, setDateOfService] = useState('');
  const [billAmount, setBillAmount] = useState(0);
  const [picture, setPicture] = useState<string>('');
  const [showSummary, setShowSummary] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSummary(true);
  };

  const handleEditForm = () => {
    setShowSummary(false);
  };

  const handleFinalizeAndSubmit = () => {
    const formData = {
      patientName,
      address,
      hospitalName,
      dateOfService,
      billAmount,
      picture,
    };
    onSubmit(formData);
  };

  const handleBillAmountChange = (e) => {
    const input = e.target.value;
    const numericInput = input.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    setBillAmount(numericInput);
  };

  return (
    <div>
      {!showSummary ? (
        <div className="form-container">
          <h1 className="form-title">Record New Bill Details</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label>Patient Name:</label>
              <input
                className="form-input"
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                required
              />
            </div>
            <div className="form-field">
              <label>Address:</label>
              <input
                className="form-input"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="form-field">
              <label>Hospital Name:</label>
              <input
                className="form-input"
                type="text"
                value={hospitalName}
                onChange={(e) => setHospitalName(e.target.value)}
                required
              />
            </div>
            <div className="form-field">
              <label>Date of Service:</label>
              <input
                className="form-input"
                type="date"
                value={dateOfService}
                onChange={(e) => setDateOfService(e.target.value)}
                required
              />
            </div>
            <div className="form-field">
              <label>Bill Amount:</label>
              <input
                className="form-input"
                type="text"
                value={billAmount}
                onChange={handleBillAmountChange}
                pattern="[0-9]*"
                required
              />
            </div>
            <div className="form-field">
              <label>Picture of the Bill:</label>
              <input
                className="form-input"
                type="file"
                onChange={async (e) => setPicture(await toBase64(e.target.files[0]!))}
              />
            </div>
            <div className="form-field">
              <button className="form-button" type="submit">Submit</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="summary-container">
          <h1 className="summary-title">Review Details</h1>
          <p><strong>Patient Name:</strong> {patientName}</p>
          <p><strong>Address:</strong> {address}</p>
          <p><strong>Hospital Name:</strong> {hospitalName}</p>
          <p><strong>Date of Service:</strong> {dateOfService}</p>
          <p><strong>Bill Amount:</strong> {billAmount}</p>
          {picture && (
            <div className="form-field">
              <img src={picture} alt="Bill" className="summary-image" />
            </div>
          )}
          <div className="form-field">
            <Link href="/">
              <button className="summary-button" onClick={handleFinalizeAndSubmit}>Finalize and Submit</button>
            </Link>
            <button className="summary-button" onClick={handleEditForm}>Edit Form</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
