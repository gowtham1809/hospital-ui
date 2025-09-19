
import React, { useState, useEffect } from "react";
import "./FormModal.scss";

const FormModal = ({ visible, onClose, onSubmit, fields, initialData }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData(initialData || {});
  }, [initialData]);

  if (!visible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2 className="modal-title">Form</h2>

        <div className="modal-body">
          {fields.map((field, i) => (
            <div key={i} className="form-group">
              <label>{field.label}</label>
              {field.type === "select" ? (
                <select
                  value={formData[field.name] || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, [field.name]: e.target.value })
                  }
                >
                  <option value="">Select {field.label}</option>
                  {field.options?.map((opt, idx) => (
                    <option key={idx} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type || "text"}
                  value={formData[field.name] || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, [field.name]: e.target.value })
                  }
                />
              )}
            </div>
          ))}
        </div>

        <div className="modal-footer">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="save-btn" onClick={() => onSubmit(formData)}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormModal;
