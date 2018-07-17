from glob import glob

import os
import pandas as pd
from django.core.files.base import ContentFile
from django.core.management.base import BaseCommand, CommandError

from document_extract_app.models import Document, ExtractRequest
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

    def populate_data(self):

        extract_request = ExtractRequest()
        extract_request.save()

        document_files = glob('../../data/train/request_history/8ef79f79-1697-4710-b1b9-d004006a21ab/invoicefiles/*.pdf')

        for document_file_path in document_files:
            print('Document File Path {}'.format(document_file_path))
            pdf_file_name = os.path.basename(document_file_path)

            document = Document(extract_request=extract_request)
            document.save()


            # Save original document reference

            document_file = open(document_file_path, "rb")
            document.file.save('extract_requests/{}/{}/{}'.format(extract_request.pk, document.pk, pdf_file_name), ContentFile(document_file.read()))
            document_file.close()

            # Save extracted ocr reference
            pdf_extractor = PDFExtractor(document_file_path)
            text_boxes = pdf_extractor.extract_data()
            text_boxes_df = pd.DataFrame(text_boxes)

            ocr_json_file_name = str(pdf_file_name) + '.json'

            text_boxes_df.to_json('temp/'+ ocr_json_file_name, orient='values')

            ocr_file = open('temp/'+ ocr_json_file_name, "rb")
            document.ocr_output.save('extract_requests/{}/{}/{}'.format(extract_request.pk, document.pk, ocr_json_file_name), ContentFile(ocr_file.read()))
            ocr_file.close()

            document.save()





