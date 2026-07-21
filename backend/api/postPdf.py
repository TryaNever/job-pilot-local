from fastapi import APIRouter, UploadFile, File,HTTPException
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
    try:
        if file.content_type != "application/pdf":
            raise HTTPException(
                status_code=400,
                detail="Only PDF files are allowed"
            )
        
        file_location = os.path.join(UPLOAD_DIR, "cv.pdf")

        with open(file_location, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        return {
            "message": "file upload",
            "filename": "cv.pdf"
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

    finally:
        await file.close()