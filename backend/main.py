from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pymongo import MongoClient
from bson import ObjectId
import os, bcrypt, datetime

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB Atlas connection — replace with your Atlas URI
MONGO_URI = os.getenv("MONGO_URI", "mongodb+srv://fa23bcs038_db_user:9GTeTUsMZ47oGEX7@cluster0.dsiojk4.mongodb.net/?appName=Cluster0")
client = MongoClient(MONGO_URI)
db = client["socialapp"]
users = db["users"]
posts = db["posts"]

# ── Models ──────────────────────────────────────────
class UserIn(BaseModel):
    username: str
    password: str

class PostIn(BaseModel):
    username: str
    content: str

# ── Routes ──────────────────────────────────────────
@app.post("/signup")
def signup(data: UserIn):
    if users.find_one({"username": data.username}):
        raise HTTPException(400, "Username already taken")
    hashed = bcrypt.hashpw(data.password.encode(), bcrypt.gensalt())
    users.insert_one({"username": data.username, "password": hashed})
    return {"message": "Account created"}

@app.post("/login")
def login(data: UserIn):
    user = users.find_one({"username": data.username})
    if not user or not bcrypt.checkpw(data.password.encode(), user["password"]):
        raise HTTPException(401, "Invalid credentials")
    return {"message": "Login successful", "username": data.username}

@app.post("/posts")
def create_post(data: PostIn):
    post = {
        "username": data.username,
        "content": data.content,
        "created_at": datetime.datetime.utcnow().isoformat()
    }
    posts.insert_one(post)
    return {"message": "Post created"}

@app.get("/posts")
def get_posts():
    result = []
    for p in posts.find().sort("created_at", -1).limit(50):
        result.append({
            "id": str(p["_id"]),
            "username": p["username"],
            "content": p["content"],
            "created_at": p["created_at"]
        })
    return result