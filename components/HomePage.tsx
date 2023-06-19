"use client";

import React, { useState } from "react";
import "./HomePage.css"; // Import custom CSS file for HomePage component
import Link from "next/link";
import { Bill } from "@/utils/forms";
import { toBase64 } from "@/utils";

function EditForm({
  editedForm,
  handleInputChange,
  handleFileChange,
  handleSaveForm,
  handleCancelEdit,
}: {
  editedForm: Bill;
  handleInputChange: () => void;
  handleFileChange: () => Promise<void>;
  handleSaveForm: () => void;
  handleCancelEdit: () => void;
}) {
  return (
    <>
      <div className="homepage-field">
        <label className="homepage-label">Patient Name:</label>
        <input
          className="homepage-info-small"
          type="text"
          name="patientName"
          value={editedForm.patientName}
          onChange={handleInputChange}
        />
      </div>

      <div className="homepage-field">
        <label className="homepage-label">Address:</label>
        <input
          className="homepage-info-small"
          type="text"
          name="address"
          value={editedForm.address}
          onChange={handleInputChange}
        />
      </div>

      <div className="homepage-field">
        <label className="homepage-label">Hospital Name:</label>
        <input
          className="homepage-info-small"
          type="text"
          name="hospitalName"
          value={editedForm.hospitalName}
          onChange={handleInputChange}
        />
      </div>

      <div className="homepage-field">
        <label className="homepage-label">Date of Service:</label>
        <input
          className="homepage-info-small"
          type="text"
          name="dateOfService"
          value={editedForm.dateOfService}
          onChange={handleInputChange}
        />
      </div>

      <div className="homepage-field">
        <label className="homepage-label">Bill Amount:</label>
        <input
          className="homepage-info-small"
          type="text"
          name="billAmount"
          value={editedForm.billAmount}
          onChange={handleInputChange}
        />
      </div>

      <div className="homepage-field">
        <label className="homepage-label">Bill Picture:</label>
        <input
          className="homepage-info"
          type="file"
          name="billPicture"
          accept="image/*"
          onChange={handleFileChange}
        />
        {editedForm.picture && (
          <img src={editedForm.picture} alt="Bill" className="homepage-image" />
        )}
      </div>

      <hr className="homepage-hr" />

      <button
        className="homepage-button homepage-save-button"
        onClick={handleSaveForm}
      >
        Save
      </button>
      <button
        className="homepage-button homepage-cancel-button"
        onClick={handleCancelEdit}
      >
        Cancel
      </button>
    </>
  );
}

const HomePage = ({
  forms,
  setForms,
}: {
  forms: Bill[];
  setForms: (bills: Bill[]) => void;
}) => {
  const [selectedForms, setSelectedForms] = useState<number[]>([]);
  const [editingFormIndex, setEditingFormIndex] = useState(-1);

  const [editedForm, setEditedForm] = useState<Bill>({
    patientName: "",
    address: "",
    hospitalName: "",
    dateOfService: "",
    billAmount: 0,
    picture: undefined,
  });

  const handleFormSelection = (formIndex: number) => {
    const isSelected = selectedForms.includes(formIndex);
    if (isSelected) {
      setSelectedForms(selectedForms.filter((index) => index !== formIndex));
    } else {
      setSelectedForms([...selectedForms, formIndex]);
    }
  };

  const handleDeleteSelectedForms = () => {
    const filteredForms = forms.filter(
      (_, index) => !selectedForms.includes(index)
    );
    setForms([...filteredForms]);
    setSelectedForms([]);
  };

  const handleEditForm = (formIndex: number) => {
    const formToEdit = forms[formIndex];
    setEditingFormIndex(formIndex);
    setEditedForm(formToEdit);
  };

  const handleSaveForm = () => {
    console.log(`Updating form ${editingFormIndex} with ${JSON.stringify(editedForm)}`)
    const updatedForms = [...forms];
    updatedForms[editingFormIndex] = editedForm;
    setForms(updatedForms);
    setEditingFormIndex(-1);
    setEditedForm({
      patientName: "",
      address: "",
      hospitalName: "",
      dateOfService: "",
      billAmount: 0,
      picture: undefined,
    });
  };

  const handleCancelEdit = () => {
    setEditingFormIndex(-1);
    setEditedForm({
      patientName: "",
      address: "",
      hospitalName: "",
      dateOfService: "",
      billAmount: 0,
      picture: undefined,
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedForm({ ...editedForm, [name]: value });
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setEditedForm({ ...editedForm, picture: await toBase64(file) });
  };
  console.log(forms);

  return (
    <div className="homepage-container">
      <h1 className="homepage-title">Truffle Health</h1>
      {forms.length == 0 && <p className="homepage-title">No bills uploaded</p>}
      {forms.map((form, index) => {
        const isEditing = editingFormIndex === index;

        return (
          <div className="homepage-form" key={index}>
            <input
              className="homepage-checkbox"
              type="checkbox"
              checked={selectedForms.includes(index)}
              onChange={() => handleFormSelection(index)}
            />
            {isEditing ? (
              <EditForm
                editedForm={editedForm}
                handleFileChange={handleFileChange}
                handleInputChange={handleInputChange}
                handleCancelEdit={handleCancelEdit}
                handleSaveForm={handleSaveForm}
              />
            ) : (
              <>
                <p className="homepage-info">
                  <strong>Patient Name: </strong>
                  {form.patientName}
                </p>
                <p className="homepage-info">
                  <strong>Address: </strong>
                  {form.address}
                </p>
                <p className="homepage-info">
                  <strong>Hospital Name: </strong>
                  {form.hospitalName}
                </p>
                <p className="homepage-info">
                  <strong>Date of Service: </strong>
                  {form.dateOfService}
                </p>
                <p className="homepage-info">
                  <strong>Bill Amount: </strong>${form.billAmount}
                </p>
                {form.picture && (
                  <img
                    src={form.picture}
                    alt="Bill"
                    className="homepage-image"
                  />
                )}
                <hr className="homepage-hr" />
                <button
                  className="homepage-button homepage-edit-button"
                  onClick={() => handleEditForm(index)}
                >
                  Edit
                </button>
              </>
            )}
          </div>
        );
      })}

      {selectedForms.length > 0 && (
        <div>
          <button
            className="homepage-button homepage-delete-button"
            onClick={handleDeleteSelectedForms}
          >
            Delete Selected Forms
          </button>
        </div>
      )}

      <Link href="/create">
        <button className="homepage-add-button">+</button>
      </Link>
    </div>
  );
};

export default HomePage;
