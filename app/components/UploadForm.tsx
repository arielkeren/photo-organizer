"use client";

import { useState, ChangeEvent, FormEvent } from "react";

type Props = {
  addPhoto: (name: string) => Promise<void>;
};

const UploadForm: React.FC<Props> = ({ addPhoto }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (res.ok) await addPhoto(file.name);
    else alert("Upload failed.");
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 w-72 p-5 drop-shadow-lg flex flex-col gap-2 items-center rounded"
      >
        <label
          htmlFor="file"
          className="cursor-pointer underline-offset-4 hover:underline"
        >
          {file ? file.name : "Choose File"}
        </label>
        <input
          type="file"
          id="file"
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          type="submit"
          className="uppercase bg-gray-900 text-white px-14 py-2 rounded transition-colors cursor-pointer hover:bg-gray-800"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default UploadForm;
