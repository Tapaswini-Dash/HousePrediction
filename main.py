from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np

# Load the saved model from the notebook
model = joblib.load('model.pkl')

app = FastAPI(title="House Price Predictor")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://house-price-frontend-eta.vercel.ap", "http://127.0.0.1:5173 , "http://localhost:5173""],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# Define input format (matches California housing features)
class HouseData(BaseModel):
    MedInc: float      # Median income in block
    HouseAge: float    # Median house age in block
    AveRooms: float    # Average number of rooms
    AveBedrms: float   # Average number of bedrooms
    Population: float  # Block population
    AveOccup: float    # Average house occupancy
    Latitude: float    # Block latitude
    Longitude: float   # Block longitude

@app.post("/predict")
def predict_price(data: HouseData):
    try:
        # Validate inputs (e.g., positive values for most fields)
        if data.MedInc <= 0 or data.HouseAge < 0 or data.AveRooms <= 0 or data.AveBedrms < 0 or data.Population <= 0 or data.AveOccup <= 0:
            raise ValueError("All numeric fields must be positive.")
        # Convert input to array
        input_array = np.array([[data.MedInc, data.HouseAge, data.AveRooms, data.AveBedrms, data.Population, data.AveOccup, data.Latitude, data.Longitude]])
        prediction = model.predict(input_array)[0]
        # Ensure prediction is reasonable (e.g., positive price)
        if prediction < 0:
            raise ValueError("Prediction resulted in negative price—check inputs.")
        return {"predicted_price": round(prediction * 100000, 2)}
    except ValueError as e:
        return {"error": str(e)}
    except Exception as e:
        return {"error": "An unexpected error occurred. Please try again."}

@app.get("/")
def home():
    return {"message": "Welcome! Go to /docs to test the API."}