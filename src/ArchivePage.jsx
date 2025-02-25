import { useState, useEffect } from "react";
import HeroSection from "./components/HeroSection";
import UploadModal from "./components/UploadModal";
import CreateFolderModal from "./components/CreateFolderModal";
import PreviewModal from "./components/PreviewModal";

// Utility function for file size
function formatFileSize(bytes) {
    if (!bytes || bytes <= 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }

function ArchivesPage() {
  const [parentId, setParentId] = useState(null);
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");        // <-- for the search bar
  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [previewItem, setPreviewItem] = useState(null);      // <-- holds file/folder for preview
  const [loading, setLoading] = useState(false);

  // Fetch items whenever parentId or searchQuery changes
  useEffect(() => {
    fetchArchives();
  }, [parentId, searchQuery]);

  const fetchArchives = async () => {
    try {
      setLoading(true);
      // Example endpoint: /api/v1/archives?parent_id=xxx&search=xxx
      const queryParams = new URLSearchParams();
      if (parentId) queryParams.append("parent_id", parentId);
      if (searchQuery) queryParams.append("search", searchQuery);

      const res = await fetch(`http://localhost:3000/api/v1/archives?${queryParams}`, {
        credentials: "include"
      });
      if (!res.ok) throw new Error("Failed to fetch archives");
      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching archives:", error);
    } finally {
      setLoading(false);
    }
  };

  // Called after creating a folder or uploading a file
  const reFetchItems = () => {
    setShowCreateFolderModal(false);
    setShowUploadModal(false);
    fetchArchives();
  };

  
  const handleCreateFolder = () => setShowCreateFolderModal(true);
  
  const handleUploadDocument = () => setShowUploadModal(true);

  const handlePreview = (item) => {
    setPreviewItem(item);
  };

  // 4. Delete item
  const handleDelete = async (item) => {
    if (!window.confirm(`Are you sure you want to delete "${item.name}"?`)) {
      return;
    }
    try {
      const res = await fetch(`http://localhost:3000/api/v1/archives/${item.id}`, {
        method: "DELETE",
        credentials: "include"
      });
      if (!res.ok) throw new Error("Failed to delete item.");
      // re-fetch
      fetchArchives();
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item.");
    }
  };

  const handleRowClick = (item) => {
    if (item.is_folder) {
      setParentId(item.id);
    } else {
      // optional: also preview if it's a file
      // handlePreview(item);
    }
  };

  // Render table rows
  const renderTableRows = () => {
    if (items.length === 0 && !loading) {
      return (
        <tr>
          <td colSpan="5" style={styles.tdCenter}>
            No items found.
          </td>
        </tr>
      );
    }

    return items.map((item, idx) => (
      <tr
        key={item.id}
        style={{
          cursor: item.is_folder ? "pointer" : "default",
          background: idx % 2 === 0 ? "#fff" : "#f9f9f9"
        }}
        onClick={() => handleRowClick(item)}
      >
        <td style={styles.td}>
          {item.is_folder ? "📁" : "📄"} {item.name}
        </td>
        <td style={styles.td}>{item.dateModified || "N/A"}</td>
        <td style={styles.td}>{item.file_type || (item.is_folder ? "Folder" : "Unknown")}</td>
        <td style={styles.td}>{formatFileSize(item.file_size) || (item.is_folder ? "--" : "N/A")}</td>
        <td style={styles.td}>
          {!item.is_folder && (
            <button className='btn btn-arch'
              style={{ marginRight: "8px" }}
              onClick={(e) => {
                e.stopPropagation(); // prevent row click
                handlePreview(item);
              }}
            >
              Preview
            </button>
          )}
          <button className='btn btn-delete'
            onClick={(e) => {
              e.stopPropagation(); // prevent row click
              handleDelete(item);
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="archives-page">
      {/* Reuse HeroSection for title + subtitle */}
      <HeroSection
        title="Archives"
        subtitle="Upload your documents and keep them organized here!"
        showProfile={false}
        bgColor="#6c757d"
      />

      <div style={{ padding: "20px" }}>
        <div className="search-container">
            <input 
                type="text"
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
            />
    
            {parentId && (
                <button
                onClick={() => setParentId(null)}
                className="btn btn-arch"
                >
                Root
                </button>
            )}
            
            <button 
                onClick={handleCreateFolder} 
                className="btn btn-arch"
            >
                Create Folder
            </button>
            
            <button 
                onClick={handleUploadDocument} 
                className="btn btn-arch"
            >
                Upload Document
            </button>
        </div>

        {/* Table Layout */}
        <div className="archives-table-container" style={{ marginTop: "30px" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
            }}
          >
            <thead style={{ background: "#f2f2f2" }}>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Date Modified</th>
                <th style={styles.th}>File Type</th>
                <th style={styles.th}>File Size</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" style={styles.tdCenter}>Loading...</td>
                </tr>
              ) : (
                renderTableRows()
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Folder Modal */}
      {showCreateFolderModal && (
        <CreateFolderModal
          parentId={parentId}
          onClose={() => setShowCreateFolderModal(false)}
          onSuccess={reFetchItems}
        />
      )}

      {/* Upload Document Modal */}
      {showUploadModal && (
        <UploadModal
          parentId={parentId}
          onClose={() => setShowUploadModal(false)}
          onSuccess={reFetchItems}
        />
      )}

      {/* Preview Modal */}
      {previewItem && (
        <PreviewModal
          item={previewItem}
          onClose={() => setPreviewItem(null)}
        />
      )}
    </div>
  );
}

const styles = {
  th: {
    padding: "12px",
    textAlign: "left",
    borderBottom: "1px solid #ccc"
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #eee"
  },
  tdCenter: {
    padding: "12px",
    textAlign: "center",
    borderBottom: "1px solid #eee"
  }
};

export default ArchivesPage;
