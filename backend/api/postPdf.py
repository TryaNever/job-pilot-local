from fastapi import APIRouter, UploadFile, File
import os
import shutil

router = APIRouter()

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
UPLOAD_DIR = os.path.abspath(
    os.path.join(BASE_DIR, "../frontend/public/documents/cv")
)

os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload/cv/main")
async def postPdfCvMain(file: UploadFile = File(...)):
    file_location = os.path.join(UPLOAD_DIR, "cv.pdf")
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {
        "message": "file upload",
        "filename": "cv.pdf"
    }