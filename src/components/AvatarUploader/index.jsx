// Create a avatar uploader component with a preview
import React, { useEffect } from "react";

const AvatarUploader = ({
  name,
  value,
  handleChange,
  error,
  touched,
  preview,
}) => {
  return (
    <div className="flex flex-row items-center justify-center">
      <div className="flex flex-col justify-center">
        <label htmlFor="avatar" className="text-left font-bold text-black mt-4">
          Avatar
        </label>
        <input
          type="file"
          name="avatar"
          id="avatar"
          onChange={handleChange}
          value={value}
          className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        />
      </div>
      {preview && (
        <div className="ml-4 rounded-full border border-gray-300 p-2">
          <img src={preview} alt="avatar" className="w-32 h-32 rounded-full" />
        </div>
      )}
    </div>
  );
};

export default AvatarUploader;
