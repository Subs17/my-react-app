import { useState } from "react";
import PropTypes from "prop-types";

function CreateFolderModal({ parentId, onSuccess, onClose }) {
  const [folderName, setFolderName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!folderName) return;
  
    try {
      const res = await fetch("http://localhost:3000/api/v1/archives", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parentId,
          name: folderName,
          is_folder: "true" // important: "true" as a string if your backend checks for === 'true'
        })
      });
      if (!res.ok) throw new Error("Folder creation failed");
      await res.json();
      onSuccess();
    } catch (error) {
      console.error("Error creating folder:", error);
      alert("Failed to create folder.");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Create Folder</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Folder Name"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
          />
          <div style={{ marginTop: "10px" }}>
            <button type="submit">Create</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

CreateFolderModal.propTypes = {
    parentId: PropTypes.number,
    onSuccess: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
  };
  
  CreateFolderModal.defaultProps = {
    parentId: null
  };

export default CreateFolderModal;
