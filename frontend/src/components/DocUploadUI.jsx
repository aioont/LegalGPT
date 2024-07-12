import React, { useState } from 'react';
import axios from 'axios';

const DocUploadUI = ({ apiUri, afterUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("")
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const uploadFile = async (file) => {
    setIsUploading(true);
    setError("");
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post(`${apiUri}/doc-upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      afterUpload(file.name, response.data.result)
    } catch (error) {
      setError("Error uploading file. Please try again.")
      console.error('Error fetching response:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="top-0 left-0 w-full h-full bg-gray-200 opacity-75 flex items-center justify-center transition-all">
      <div className="bg-white rounded-lg shadow-lg  flex flex-col items-center px-80 py-40 transition-all">
        <svg className="w-16 h-16 text-gray-500 mb-6" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" clipRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          />
        </svg>
        <h2 className="text-2xl text-gray-800 font-bold mb-4 transition-all">Upload Your Document</h2>
        <p className="text-gray-600 text-base">Supported formats: PDF</p>
        <label htmlFor="documentUpload" className="transition-all cursor-pointer mt-4 inline-block py-3 px-6 border border-gray-300 rounded-lg hover:bg-gray-200 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          {selectedFile ? (
            <span className="text-gray-600">{selectedFile.name}</span>
          ) : (
            <>
              <span className="transition-all text-gray-600">Drag & Drop or</span>
              <span className="transition-all text-blue-500 font-bold"> Browse File</span>
            </>
          )}
          <input id="documentUpload" type="file" accept=".pdf,.docx,.jpg,.png" onChange={handleFileChange} className="hidden transition-all"/>
        </label>
        {selectedFile && (
          <>
            {isUploading ? (
              <div className="mt-[25px] mb-[20px] w-full h-5 bg-gray-200 rounded-2xl overflow-hidden transition-all">
                <div className="h-full bg-blue-500 rounded-lg animate-pulse" />
              </div>
            ) : (
              <button onClick={() => uploadFile(selectedFile)}
                className="transition-all mt-4 px-6 py-3 text-base font-semibold text-white bg-indigo-950 rounded-lg hover:bg-blue-900 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700">
                Upload
              </button>
            )}
          </>
        )}
        {error && <div className='fixed top-3/4'>
          <span className="text-red-800 mt-5 font-bold text-[1em] animate-pulse">{error}</span>
        </div>}
      </div>
    </div>
  );
};

export default DocUploadUI;
