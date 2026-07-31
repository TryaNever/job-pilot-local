from fastapi import APIRouter, UploadFile, File, HTTPException
from services.upload_file import upload_file

router = APIRouter()


def create_route_upload_pdf(folder: str):

    async def upload_pdf(file: UploadFile = File(...)):

        try:
            if file.content_type != "application/pdf":
                raise HTTPException(
                    status_code=400,
                    detail="Only PDF files are allowed"
                )

            upload_file(file=file, folder=folder,location="./frontend/public/documents")

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