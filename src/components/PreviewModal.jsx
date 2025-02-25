import PropTypes from "prop-types";

function PreviewModal({ item, onClose }) {
  if (!item) return null;

  // Basic extension check
  const extension = (item.file_path || "").split(".").pop().toLowerCase();
  const isImage = ["png", "jpg", "jpeg", "gif", "webp"].includes(extension);
  const isPdf = extension === "pdf";

  const fileUrl = `http://localhost:3000${item.file_path}`; // or use your proxy

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Preview: {item.name}</h2>

        {isImage ? (
          <img
            src={fileUrl}
            alt={item.name}
            style={{ maxWidth: "100%", maxHeight: "400px" }}
          />
        ) : isPdf ? (
          <iframe
            src={fileUrl}
            width="500"
            height="600"
            title="PDF Preview"
          />
        ) : (
          <div>
            No direct preview available. <br />
            <a href={fileUrl} download={item.name}>
              Download {item.name}
            </a>
          </div>
        )}

        <div style={{ marginTop: "20px" }}>
          <button className='btn btn-arch' onClick={onClose}>Close</button>
          {!isImage && !isPdf && (
            <button style={{ marginLeft: "10px" }}>
              <a
                href={fileUrl}
                download={item.name}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Download
              </a>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

PreviewModal.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    file_path: PropTypes.string,
    is_folder: PropTypes.bool
  }),
  onClose: PropTypes.func.isRequired
};

PreviewModal.defaultProps = {
  item: null
};

export default PreviewModal;
