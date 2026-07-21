from fastapi import APIRouter, UploadFile, File
import os
import shutil

router = APIRouter()


UPLOAD_DIR = "../../frontend/public/documents/cv"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload/cv/main")
async def postPdfCvMain(file: UploadFile = File()) :
    file_location = f"{UPLOAD_DIR}/{"cv.pdf"}"
    
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {
        "message": "file upload"
    }
