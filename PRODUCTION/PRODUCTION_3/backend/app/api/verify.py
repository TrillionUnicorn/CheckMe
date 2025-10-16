"""
Verification API Routes
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from typing import Literal, Optional
from datetime import datetime
import re
import uuid

router = APIRouter()

# In-memory storage
verifications_db = []

# Schemas
class VerificationRequest(BaseModel):
    type: Literal["email", "phone", "identity", "document"]
    value: str

class VerificationResponse(BaseModel):
    id: str
    type: str
    valid: bool
    risk_score: int
    details: dict
    timestamp: datetime

# Verification logic
def verify_email(email: str) -> dict:
    """Verify email address"""
    email_regex = r'^[^\s@]+@[^\s@]+\.[^\s@]+$'
    is_valid = bool(re.match(email_regex, email))
    
    risk_score = 100
    if 'test' in email.lower() or 'temp' in email.lower():
        risk_score -= 20
    if email.endswith('.ru') or email.endswith('.cn'):
        risk_score -= 10
    if not '.' in email:
        risk_score -= 30
    
    return {
        "valid": is_valid,
        "risk_score": max(0, min(100, risk_score)),
        "details": {
            "format": "valid" if is_valid else "invalid",
            "domain": email.split('@')[1] if '@' in email else "unknown",
            "disposable": "test" in email.lower() or "temp" in email.lower()
        }
    }

def verify_phone(phone: str) -> dict:
    """Verify phone number"""
    phone_clean = re.sub(r'[\s\-\(\)]', '', phone)
    phone_regex = r'^\+?[1-9]\d{1,14}$'
    is_valid = bool(re.match(phone_regex, phone_clean))
    
    risk_score = 85 if is_valid else 30
    
    return {
        "valid": is_valid,
        "risk_score": risk_score,
        "details": {
            "format": "valid" if is_valid else "invalid",
            "country": "US" if phone.startswith('+1') else "unknown",
            "type": "mobile" if is_valid else "unknown"
        }
    }

def verify_identity(name: str) -> dict:
    """Verify identity/name"""
    is_valid = len(name) >= 2 and bool(re.match(r'^[a-zA-Z\s]+$', name))
    
    risk_score = 75 if is_valid else 20
    
    return {
        "valid": is_valid,
        "risk_score": risk_score,
        "details": {
            "format": "valid" if is_valid else "invalid",
            "length": len(name),
            "parts": len(name.split()) if is_valid else 0
        }
    }

def verify_document(doc_number: str) -> dict:
    """Verify document number"""
    is_valid = len(doc_number) >= 5
    
    risk_score = 80 if is_valid else 25
    
    return {
        "valid": is_valid,
        "risk_score": risk_score,
        "details": {
            "format": "valid" if is_valid else "invalid",
            "length": len(doc_number),
            "type": "passport" if len(doc_number) >= 8 else "id"
        }
    }

# Routes
@router.post("/", response_model=VerificationResponse)
async def create_verification(request: VerificationRequest):
    """Create new verification"""
    
    # Perform verification based on type
    if request.type == "email":
        result = verify_email(request.value)
    elif request.type == "phone":
        result = verify_phone(request.value)
    elif request.type == "identity":
        result = verify_identity(request.value)
    elif request.type == "document":
        result = verify_document(request.value)
    else:
        raise HTTPException(status_code=400, detail="Invalid verification type")
    
    # Create verification record
    verification = {
        "id": str(uuid.uuid4()),
        "type": request.type,
        "value": request.value,
        "valid": result["valid"],
        "risk_score": result["risk_score"],
        "details": result["details"],
        "timestamp": datetime.utcnow()
    }
    
    verifications_db.append(verification)
    
    return VerificationResponse(**verification)

@router.get("/{verification_id}", response_model=VerificationResponse)
async def get_verification(verification_id: str):
    """Get verification by ID"""
    verification = next(
        (v for v in verifications_db if v["id"] == verification_id),
        None
    )
    
    if not verification:
        raise HTTPException(status_code=404, detail="Verification not found")
    
    return VerificationResponse(**verification)

@router.get("/", response_model=list[VerificationResponse])
async def list_verifications(limit: int = 10, offset: int = 0):
    """List verifications"""
    return [
        VerificationResponse(**v)
        for v in verifications_db[offset:offset + limit]
    ]

