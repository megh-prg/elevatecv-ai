import io
from fastapi import UploadFile
from docx import Document
from pypdf import PdfReader

from app.core.logger import logger


async def extract_text_from_file(uploaded_file: UploadFile) -> str:
    content = await uploaded_file.read()
    filename = uploaded_file.filename.lower()

    if filename.endswith(".pdf") or uploaded_file.content_type == "application/pdf":
        try:
            pdf_reader = PdfReader(io.BytesIO(content))
            text = "\n".join(page.extract_text() for page in pdf_reader.pages)
            return text.strip()
        except Exception as exc:
            logger.exception("PDF parsing failed")
            raise ValueError("Could not parse PDF file.")

    if filename.endswith(".docx") or uploaded_file.content_type in (
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/msword",
    ):
        try:
            document = Document(io.BytesIO(content))
            text = "\n".join(paragraph.text for paragraph in document.paragraphs if paragraph.text)
            return text.strip()
        except Exception as exc:
            logger.exception("DOCX parsing failed")
            raise ValueError("Could not parse DOCX file.")

    raise ValueError("Unsupported file type. Upload a PDF or DOCX resume.")
