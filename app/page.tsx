"use client";

import { useEffect, useState } from "react";
import UploadForm from "./components/UploadForm";
import { Photo } from "./types";
import Photos from "./components/Photos";
import Header from "./components/Header";

const Home: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const storedPhotos = localStorage.getItem("photos");
    if (storedPhotos) setPhotos(JSON.parse(storedPhotos));
  }, []);

  const addPhoto = async (name: string) => {
    const response = await fetch(`http://localhost:3000/uploads/${name}`);
    const blob = await response.blob();

    const formData = new FormData();
    formData.append("file", blob, "image.jpg");

    const res = await fetch("http://localhost:8000/predict/", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    localStorage.setItem(
      "photos",
      JSON.stringify([...photos, { name, class: data.prediction }])
    );
    setPhotos(prev => [...prev, { name, class: data.prediction }]);
  };

  return (
    <>
      <Header />
      <UploadForm addPhoto={addPhoto} />
      <Photos photos={photos} />
    </>
  );
};

export default Home;
