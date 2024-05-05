import React, { useState, useEffect } from 'react';

const ImageUploader = () => {
  const [images, setImages] = useState([]);
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [newFolderName, setNewFolderName] = useState('');

  useEffect(() => {
    const storedImages = JSON.parse(localStorage.getItem('uploadedImages'));
    if (storedImages) {
      setImages(storedImages);
    }

    const storedFolders = JSON.parse(localStorage.getItem('folders'));
    if (storedFolders) {
      setFolders(storedFolders);
    }
  }, []);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);

    const uploadedImages = files.map((file) => ({
      url: URL.createObjectURL(file),
      file: file,
      name: file.name, // Store original file name
      folder: selectedFolder,
    }));

    const newImages = [...images, ...uploadedImages];
    setImages(newImages);
    localStorage.setItem('uploadedImages', JSON.stringify(newImages));
  };

  const handleUploadClick = () => {
    // Trigger file input click
    document.getElementById('fileInput').click();
  };

  const handleRename = (index, newName) => {
    const updatedImages = [...images];
    updatedImages[index].name = newName;
    setImages(updatedImages);
    localStorage.setItem('uploadedImages', JSON.stringify(updatedImages));
  };

  const removeImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
    localStorage.setItem('uploadedImages', JSON.stringify(updatedImages));
  };

  const handleFolderCreate = () => {
    if (newFolderName.trim() !== '') {
      const newFolder = {
        id: Date.now(),
        name: newFolderName.trim(),
      };
      const updatedFolders = [...folders, newFolder];
      setFolders(updatedFolders);
      localStorage.setItem('folders', JSON.stringify(updatedFolders));
      setNewFolderName('');
    }
  };

  const handleFolderSelect = (folderId) => {
    setSelectedFolder(folderId);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Uploaded Images</h2>
      <div className="flex mb-4">
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          multiple
          className="hidden"
        />
        <button
          onClick={handleUploadClick}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300 mr-4"
        >
          Upload Image
        </button>
        <input
          type="text"
          placeholder="New Folder Name"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
          className="border border-gray-300 rounded py-1 px-2 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleFolderCreate}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-green-300 ml-2"
        >
          Create Folder
        </button>
      </div>
      <div className="flex flex-wrap -mx-2 mb-4">
        {folders.map((folder) => (
          <div
            key={folder.id}
            onClick={() => handleFolderSelect(folder.id)}
            className={`bg-gray-200 py-1 px-3 rounded-lg cursor-pointer ${
              selectedFolder === folder.id ? 'bg-blue-300' : ''
            } mr-2 mb-2`}
          >
            {folder.name}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images
          .filter((image) => selectedFolder === null || image.folder === selectedFolder)
          .map((image, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-blue-500">
              <img src={image.url} alt={`Uploaded ${index + 1}`} className="w-full h-auto" />
              <div className="p-3">
                <input
                  type="text"
                  value={image.name}
                  onChange={(e) => handleRename(index, e.target.value)}
                  className="w-full border border-gray-300 rounded py-1 px-2 focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="mt-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded focus:outline-none focus:ring focus:ring-red-300"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ImageUploader;
