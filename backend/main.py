from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import cv2
import joblib
from insightface.app import FaceAnalysis

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

face_app = FaceAnalysis(name="buffalo_l", providers=["CPUExecutionProvider"])
face_app.prepare(ctx_id=0)

model = joblib.load("model.pkl")


@app.post("/predict/")
async def predict_person(file: UploadFile = File(...)):
    contents = await file.read()
    nparr = np.frombuffer(contents, np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    faces = face_app.get(image)
    if not faces:
        return {"prediction": 5}

    embedding = faces[0].embedding.reshape(1, -1)
    prediction = model.predict(embedding)[0]
    return {"prediction": int(prediction.argmax(axis=0))}
