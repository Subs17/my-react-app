import { useState } from "react";
import PropTypes from "prop-types";

function UploadModal({ parentId, onSuccess, onClose }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    try {
      // 1) Create FormData
      const formData = new FormData();
      // 2) The file field must match what your backend expects, e.g. 'archiveFile'
      formData.append("archiveFile", selectedFile);

      // 3) Add a name field, or your server might reject it if it requires 'name'
      formData.append("name", selectedFile.name);

      // 4) If your server checks is_folder === 'true' for folders, we want 'false' for a file
      formData.append("is_folder", "false");

      // 5) If you need parent_id
      if (parentId) {
        formData.append("parent_id", parentId);
      }

      const res = await fetch("http://localhost:3000/api/v1/archives", {
        method: "POST",
        credentials: "include",
        body: formData
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }
      await res.json();
      onSuccess(); // re-fetch items in the parent
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file.");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Upload File</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />
          <div style={{ marginTop: "10px" }}>
            <button type="submit">Upload</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

UploadModal.propTypes = {
    // parentId might be null or a number/string. 
    // If you always store folders as numbers, do number.
    parentId: PropTypes.number,
  
    // onSuccess is a required function
    onSuccess: PropTypes.func.isRequired,
  
    // onClose is a required function
    onClose: PropTypes.func.isRequired
  };
  
  UploadModal.defaultProps = {
    parentId: null
  };
  

export default UploadModal;
