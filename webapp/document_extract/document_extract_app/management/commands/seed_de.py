import json
import os
from glob import glob

import pandas as pd
from django.core.files.base import ContentFile
from django.core.management.base import BaseCommand

from document_extract_app.models import Document, ExtractRequest, ExtractionModel
from extraction.pdf.PDFExtractor import PDFExtractor


class Command(BaseCommand):
    help = 'Seeds database for document_extract_app'

    def handle(self, *args, **options):
        self.clear_data()
        self.stdout.write(self.style.SUCCESS('Successfully cleared document_extract_app data'))
        self.populate_data()
        self.stdout.write(self.style.SUCCESS('Successfully populated document_extract_app data'))

    def clear_data(self):
        Document.objects.all().delete()
        ExtractRequest.objects.all().delete()
        ExtractionModel.objects.all().delete()

    def populate_data(self):

        extract_requests = glob('../../data/train/request_history/*/')

        total = len(extract_requests)
        completed = 0
        for extract_request_directory in extract_requests:
            invoice_files_glob_path = os.path.join(extract_request_directory, 'invoicefiles/*.pdf')
            print('Invoice Files Glob : {}'.format(invoice_files_glob_path))
            self.create_extract_request(invoice_files_glob_path)
            completed = completed + 1

            print('Created {}/{}'.format(completed, total))

    def create_extract_request(self, invoice_files_glob_path):

        extract_request = ExtractRequest()
        extract_request.save()

        document_files = glob(invoice_files_glob_path)

        for document_file_path in document_files:
            print('Document File Path {}'.format(document_file_path))
            pdf_file_name = os.path.basename(document_file_path)

            document = Document(extract_request=extract_request)
            document.save()

            # Save original document reference

            document_file = open(document_file_path, "rb")
            document.file.save('extract_requests/{}/{}/{}'.format(extract_request.pk, document.pk, pdf_file_name),
                               ContentFile(document_file.read()))
            document_file.close()

            # Save extracted ocr reference
            pdf_extractor = PDFExtractor(document_file_path)
            text_boxes = pdf_extractor.extract_data()
            text_boxes_df = pd.DataFrame(text_boxes)

            ocr_json_file_name = str(pdf_file_name) + '.json'

            text_boxes_df.to_json('temp/' + ocr_json_file_name, orient='values')

            ocr_file = open('temp/' + ocr_json_file_name, "rb")

            texts_content = ocr_file.read()

            document.ocr_output.save(
                'extract_requests/{}/{}/{}'.format(extract_request.pk, document.pk, ocr_json_file_name),
                ContentFile(texts_content))
            ocr_file.close()

            ocr_file = open('temp/' + ocr_json_file_name, "r")

            texts_json = json.load(ocr_file)

            document.ocr_json = {'texts': texts_json}

            document.save()

        print("Created extract request for {}".format(invoice_files_glob_path))
