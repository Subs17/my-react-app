import { useState, useEffect } from "react";
import HeroSection from "../components/HeroSection";
import UploadModal from "../components/UploadModal";
import CreateFolderModal from "../components/CreateFolderModal";
import PreviewModal from "../components/PreviewModal";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [previewItem, setPreviewItem] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch items whenever parentId or searchQuery changes
  useEffect(() => {
    fetchArchives();
  }, [parentId, searchQuery]);

  const fetchArchives = async () => {
    try {
      setLoading(true);
      // /api/v1/archives?parent_id=xxx&search=xxx
      const queryParams = new URLSearchParams();
      if (parentId) queryParams.append("parent_id", parentId);
      if (searchQuery) queryParams.append("search", searchQuery);

      const res = await fetch(`http://localhost:3000/api/v1/archives?${queryParams}`, {
        credentials: "include"
      });
      if (!res.ok) throw new Error("Failed to fetch archives");
      const data = await res.json();

      // Map childCount => hasChildren
      const mapped = data.map((item) => ({
        ...item,
        hasChildren: item.childCount > 0 // from server's subquery
      }));
      setItems(mapped);
    } catch (error) {
      console.error("Error fetching archives:", error);
    } finally {
      setLoading(false);
    }
  };

  // Called after creating folder or uploading file
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

  const handleDelete = async (item) => {
    // If it's a folder and has children
    if (item.is_folder && item.hasChildren) {
      // Prompt user
      if (!window.confirm("This folder has files. Delete everything?")) {
        return;
      }
      // user confirmed => recursive
      await deleteItem(item.id, true);
    } else {
      // normal delete
      await deleteItem(item.id, false);
    }
  };

  const deleteItem = async (id, recursive) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/v1/archives/${id}?recursive=${recursive}`,
        {
          method: "DELETE",
          credentials: "include"
        }
      );
      if (!res.ok) {
        const data = await res.json();
        if (data.error === "Folder not empty") {
          alert("Folder not empty. Please confirm recursive deletion.");
        } else {
          alert("Delete failed: " + data.error);
        }
        return;
      }
      // success => refresh
      await fetchArchives();
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item.");
    }
  };

  const handleRowClick = (item) => {
    if (item.is_folder) {
      setParentId(item.id);
    } else {
      // could preview automatically, but your code is manual
    }
  };

  const renderTableRows = () => {
    if (items.length === 0 && !loading) {
      return (
        <tr>
          <td colSpan="5" style={styles.tdCenter}>No items found.</td>
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
        <td style={styles.td}>
          {item.is_folder ? "Folder" : (item.file_type || "Unknown")}
        </td>
        <td style={styles.td}>
          {item.is_folder ? "--" : formatFileSize(item.file_size)}
        </td>
        <td style={styles.td}>
          {!item.is_folder && (
            <button
              className="btn btn-arch"
              style={{ marginRight: "8px" }}
              onClick={(e) => {
                e.stopPropagation();
                handlePreview(item);
              }}
            >
              Preview
            </button>
          )}
          <button
            className="btn btn-delete"
            onClick={(e) => {
              e.stopPropagation();
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
