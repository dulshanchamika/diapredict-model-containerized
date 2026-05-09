from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
import joblib
import numpy as np
import pandas as pd
import os

app = FastAPI()

# Load model
model = joblib.load("diabetes_model.pkl")

# Mount static files
if not os.path.exists("static"):
    os.makedirs("static")
app.mount("/static", StaticFiles(directory="static"), name="static")

class DiabetesInput(BaseModel):
    Pregnancies: int
    Glucose: float
    BloodPressure: float
    BMI: float
    Age: int

@app.get("/")
def read_root():
    return FileResponse("static/index.html")

@app.post("/predict")
def predict(data: DiabetesInput):
    input_data = pd.DataFrame([{
        "Pregnancies": data.Pregnancies,
        "Glucose": data.Glucose,
        "BloodPressure": data.BloodPressure,
        "BMI": data.BMI,
        "Age": data.Age
    }])
    prediction = model.predict(input_data)[0]
    return {"diabetic": bool(prediction)}