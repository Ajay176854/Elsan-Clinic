from fastapi.testclient import TestClient
from main import app
import traceback

client = TestClient(app)

try:
    response = client.get("/api/v1/doctors/public")
    print("STATUS:", response.status_code)
    print("BODY:", response.text)
except Exception as e:
    traceback.print_exc()
