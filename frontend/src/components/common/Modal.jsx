import "./modal.css";

export default function Modal({ title, onClose, children }) {
  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <h2>{title}</h2>
        {children}
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
