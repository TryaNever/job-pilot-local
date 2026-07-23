from fastapi import APIRouter, UploadFile, File, HTTPException
import os
import shutil

router = APIRouter()

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

UPLOAD_DIR = os.path.abspath(
    os.path.join(BASE_DIR, "./frontend/public/documents")
)

os.makedirs(UPLOAD_DIR, exist_ok=True)


def create_route_upload_pdf(folder: str):

    async def upload_pdf(file: UploadFile = File(...)):

        try:
            if file.content_type != "application/pdf":
                raise HTTPException(
                    status_code=400,
                    detail="Only PDF files are allowed"
                )

            folder_path = os.path.join(
                UPLOAD_DIR,
                folder
            )

            os.makedirs(folder_path, exist_ok=True)

            file_location = os.path.join(
                folder_path,
                f"{folder}.pdf"
            )

            with open(file_location, "wb") as buffer:
                shutil.copyfileobj(file.file, buffer)

            return {
                "message": "file uploaded",
                "filename": f"{folder}.pdf"
            }

        finally:
            await file.close()

    return upload_pdf

folders = [
    "cv",
    "lettre-motivation"
]


for folder in folders:
    router.post(
        f"/upload/{folder}/main",
        name=f"upload_{folder}"
    )(create_route_upload_pdf(folder))