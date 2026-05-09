import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200

def test_predict_endpoint():
    response = client.post("/predict", json={
        "Pregnancies": 2,
        "Glucose": 120,
        "BloodPressure": 70,
        "BMI": 25.5,
        "Age": 30
    })
    assert response.status_code == 200
    data = response.json()
    assert "diabetic" in data
    assert isinstance(data["diabetic"], bool)

def test_predict_high_risk():
    response = client.post("/predict", json={
        "Pregnancies": 8,
        "Glucose": 180,
        "BloodPressure": 90,
        "BMI": 35.5,
        "Age": 55
    })
    assert response.status_code == 200
    data = response.json()
    assert "diabetic" in data
