import os
import shutil

def upload_file(folder, file, location):
            BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
                
            UPLOAD_DIR = os.path.abspath(
                os.path.join(BASE_DIR, location)
            )
            os.makedirs(UPLOAD_DIR, exist_ok=True)

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