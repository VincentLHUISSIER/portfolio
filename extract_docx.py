from docx import Document
import sys
import os

def extract_text_from_docx(file_path):
    try:
        doc = Document(file_path)
        text = []
        for para in doc.paragraphs:
            if para.text.strip():
                text.append(para.text)
        return '\n'.join(text)
    except Exception as e:
        return f"Erreur lors de la lecture du fichier: {str(e)}"

if __name__ == "__main__":
    if len(sys.argv) > 1:
        file_path = sys.argv[1]
        if os.path.exists(file_path):
            print(extract_text_from_docx(file_path))
        else:
            print(f"Le fichier {file_path} n'existe pas.")
    else:
        print("Veuillez spécifier le chemin du fichier DOCX en argument.")
