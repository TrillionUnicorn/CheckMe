"""
Users API Routes
"""

from fastapi import APIRouter, Depends
from pydantic import BaseModel
from typing import Optional
from .auth import get_current_user

router = APIRouter()

# Schemas
class UserUpdate(BaseModel):
    name: Optional[str] = None
    company: Optional[str] = None

class UsageStats(BaseModel):
    total_verifications: int
    this_month: int
    success_rate: float
    avg_response_time: float

# Routes
@router.get("/me")
async def get_current_user_profile(current_user: dict = Depends(get_current_user)):
    """Get current user profile"""
    return {
        "id": current_user["id"],
        "name": current_user["name"],
        "email": current_user["email"],
        "plan": current_user["plan"],
        "created_at": current_user["created_at"]
    }

@router.patch("/me")
async def update_user_profile(
    update: UserUpdate,
    current_user: dict = Depends(get_current_user)
):
    """Update user profile"""
    if update.name:
        current_user["name"] = update.name
    if update.company:
        current_user["company"] = update.company
    
    return {
        "id": current_user["id"],
        "name": current_user["name"],
        "email": current_user["email"],
        "plan": current_user["plan"]
    }

@router.get("/usage", response_model=UsageStats)
async def get_usage_stats(current_user: dict = Depends(get_current_user)):
    """Get user usage statistics"""
    # Mock data for demo
    return UsageStats(
        total_verifications=1247,
        this_month=342,
        success_rate=98.5,
        avg_response_time=1.8
    )

