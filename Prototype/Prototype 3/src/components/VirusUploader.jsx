import React, { useState } from 'react';

const VirusUploader = ({ onFileUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.name.endsWith('.fasta') || file.name.endsWith('.pdb')) {
        handleFile(file);
      } else {
        alert('Please upload only .FASTA or .PDB files');
      }
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.name.endsWith('.fasta') || file.name.endsWith('.pdb')) {
        handleFile(file);
      } else {
        alert('Please upload only .FASTA or .PDB files');
      }
    }
  };

  const handleFile = (file) => {
    setUploadedFile(file);
    onFileUpload({
      name: file.name,
      size: file.size,
      type: file.type
    });
  };

  return (
    <div className="virus-uploader">
      <div 
        className={`upload-box ${dragActive ? 'drag-active' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="upload-content">
          <div className="upload-icon">📁</div>
          <h3>Upload Virus File</h3>
          <p>Drag and drop your .FASTA or .PDB file here, or click to browse</p>
          <input
            type="file"
            accept=".fasta,.pdb"
            onChange={handleChange}
            className="file-input"
          />
          {uploadedFile && (
            <div className="uploaded-file">
              <span>✅ {uploadedFile.name}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VirusUploader;
