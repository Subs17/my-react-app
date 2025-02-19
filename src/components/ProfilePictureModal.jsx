import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ProfilePictureModal = ({ isOpen, onClose, currentImageUrl, onUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(currentImageUrl || '');

  useEffect(() => {
    if (isOpen) {
      setSelectedFile(null);
      setPreviewUrl(currentImageUrl || '');
    }
  }, [isOpen, currentImageUrl]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please select an image file first.");
      return;
    }
    await onUpload(selectedFile);
    onClose();
  };

  // Only render if isOpen = true
  if (!isOpen) return null;

  return (
    // 1) Same wrapper class as your EventForm
    <div className="modal">
      {/* 2) Same inner content class as your EventForm */}
      <div className="modal-content">
        <h2>Change Profile Picture</h2>
        
        {/* The form body */}
        <form onSubmit={handleSubmit}>
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <img
              src={previewUrl || "/src/assets/icons/default-profile.png"}
              alt="Profile Preview"
              style={{ 
                width: '100px', 
                height: '100px', 
                borderRadius: '50%', 
                objectFit: 'cover' 
              }}
            />
          </div>
          
          <input 
            type="file" 
            accept="image/*"
            onChange={handleFileChange}
            style={{ marginBottom: '1rem' }}
          />
          
          {/* Buttons, styled similarly to your event form buttons */}
          <div className="modal-buttons">
            <button type="submit" className="btn btn-primary">
              Upload
            </button>
            <button type="button" className="btn btn-cancel" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

ProfilePictureModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  currentImageUrl: PropTypes.string,
  onUpload: PropTypes.func.isRequired,
};

ProfilePictureModal.defaultProps = {
  currentImageUrl: '',
};

export default ProfilePictureModal;
