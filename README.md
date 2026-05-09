# Diabetes Prediction Model API

A complete Machine Learning application that predicts the likelihood of diabetes based on medical predictor variables. It includes a pre-trained Random Forest model, a FastAPI backend, a web-based user interface, Docker containerization, Kubernetes deployment configurations, and a full CI/CD pipeline using GitHub Actions.

## Project Structure
- `train.py`: Script to train the Random Forest model and generate `diabetes_model.pkl`.
- `main.py`: FastAPI application serving the model via REST API and static frontend files.
- `static/`: Contains the frontend UI (`index.html`, `style.css`, `script.js`).
- `test_main.py`: Unit tests using `pytest` to validate the API endpoints.
- `Dockerfile`: Instructions for containerizing the application.
- `k8s-deploy.yml`: Kubernetes manifests for deploying the application (Deployment & LoadBalancer Service).
- `.github/workflows/ci.yml`: CI/CD pipeline for automated testing, Docker builds, and Kubernetes deployment.

## Running Locally

### 1. Install Dependencies
Make sure you have Python 3.10+ installed.
```bash
pip install -r requirements.txt
```

### 2. Train the Model
The model artifact is not stored in version control. You must generate it first:
```bash
python train.py
```

### 3. Run the API
Start the FastAPI server:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```
The application UI will be available at `http://localhost:8000`.
You can view the interactive API docs at `http://localhost:8000/docs`.

### 4. Running Tests
Install testing dependencies and run `pytest`:
```bash
pip install pytest httpx
pytest test_main.py -v
```

## Docker Container

### Build the Image
```bash
docker build -t dulshanchamika/diapredict-model:latest .
```

### Run the Container
```bash
docker run -p 8000:8000 dulshanchamika/diapredict-model:latest
```

## Kubernetes Deployment
Deploy the containerized application to your Kubernetes cluster:
```bash
kubectl apply -f k8s-deploy.yml
```
This provisions a Deployment with 2 replicas and a LoadBalancer Service exposing port 80.

## CI/CD Pipeline Setup (GitHub Actions)

This repository includes a Continuous Integration & Continuous Deployment (CI/CD) pipeline that automates testing and deployment. Every push to the `main` branch will:
1. Setup Python & install dependencies.
2. Generate the ML model (`train.py`).
3. Run unit tests (`pytest`).
4. Build a Docker image and push it to Docker Hub.
5. Deploy the updated image to Kubernetes.

### Required GitHub Secrets
To make the pipeline work, you **must** configure the following Repository Secrets in GitHub (`Settings > Secrets and variables > Actions > New repository secret`):

1. **`DOCKER_USERNAME`**
   - **What it is**: Your Docker Hub username (e.g., `dulshanchamika`).
   
2. **`DOCKER_PASSWORD`**
   - **What it is**: A Docker Hub Access Token.
   - **How to get it**: Go to Docker Hub -> Account Settings -> Security -> New Access Token.

3. **`KUBECONFIG`** *(Optional but required for K8s deployment)*
   - **What it is**: The credentials to access your Kubernetes cluster.
   - **How to get it**: Copy the entire contents of your `~/.kube/config` file and paste it as the secret value.
