import React from 'react';
import './index.css';

type DownloadLLMFileProps = {
  rawFileLink: string;
  filename: string;
};

export const DownloadLLMFile = ({rawFileLink, filename}: DownloadLLMFileProps) => {
  const handleDownload = async () => {
    try {
      const response = await fetch(rawFileLink);
      const content = await response.text();

      const blob = new Blob([content], {type: 'text/plain'});
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download file:', error);
    }
  };

  return (
    <div className="download-card">
      <div className="download-card-filename cnvs-sys-type-body-small">
        <code>📁 {filename}</code>
      </div>
      <div className="download-card-actions">
        <a href={rawFileLink} className="download-card-link">
          <span>See raw file</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            focusable="false"
            role="presentation"
            viewBox="0 0 24 24"
          >
            <path d="M9.502 5c.283 0 .498.226.498.505v.99c0 .291-.222.505-.495.505H7v10h10v-2.505c0-.28.226-.495.505-.495h.99c.291 0 .505.223.505.498v4.004a.493.493 0 0 1-.498.498H5.498A.496.496 0 0 1 5 18.502V5.498C5 5.22 5.223 5 5.498 5Zm8.996 0c.139 0 .265.053.356.143.091.1.147.225.147.36v5.994a.497.497 0 0 1-.504.503h-.99a.51.51 0 0 1-.506-.503V8.503l-5.23 5.23a.496.496 0 0 1-.712 0l-.7-.701a.503.503 0 0 1-.002-.713L15.677 7h-3.172A.497.497 0 0 1 12 6.495v-.99c0-.279.233-.505.504-.505z"></path>
          </svg>
        </a>
        <button className="download-card-button" onClick={handleDownload}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            focusable="false"
            role="presentation"
            viewBox="0 0 24 24"
          >
            <path d="M19.504 18c.274 0 .496.214.496.505v.99a.503.503 0 0 1-.496.505H4.496A.493.493 0 0 1 4 19.495v-.99c0-.279.226-.505.496-.505zm-5.078-7.31a.49.49 0 0 1 .704.01l.7.7a.503.503 0 0 1 .01.705l-3.536 3.536a.505.505 0 0 1-.72 0L8.05 12.105a.49.49 0 0 1 .01-.705l.7-.7a.503.503 0 0 1 .704-.01l1.595 1.595V4.506c0-.28.214-.506.505-.506h.99c.28 0 .505.227.505.506v7.552z"></path>
          </svg>
          <span>Download LLM File</span>
        </button>
      </div>
    </div>
  );
};
