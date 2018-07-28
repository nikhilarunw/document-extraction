import logging
import os
from subprocess import run

from lxml import etree

from extraction.base.BaseExtractor import BaseExtractor

logger = logging.getLogger(__name__)


class PDFExtractor(BaseExtractor):
    """
    This class helps to extract data from pdf file format
    """

    def extract_data(self):
        print("PDF Data Extracted")
        output_files = self.extract_file(self.input_file)
        text_boxes = self.read_text_boxes_from_xml(output_files['output_xml_file_path'])
        return text_boxes

    def extract_file(self, pdf_file_path):
        """
            This method extracts texts from pdf files.
        """
        try:

            # Output directory prefix
            OUTPUT_DIR = 'temp/'

            # Extract the name pdf file from file_path
            pdf_file_name = os.path.basename(pdf_file_path)
            logger.debug('pdf_file_name : {}'.format(pdf_file_name))

            # Create temporary output directory
            output_directory_name = os.path.splitext(pdf_file_name)[0]
            logger.debug('output_directory_name : {}'.format(output_directory_name))

            output_path = os.path.join(OUTPUT_DIR, output_directory_name)
            logger.debug('output_path : {}'.format(output_path))

            os.makedirs(output_path, exist_ok=True)

            output_xml_file_path = os.path.join(output_path, pdf_file_name + '.xml')
            output_txt_file_path = os.path.join(output_path, pdf_file_name + '.txt')
            output_image_file_path = os.path.join(output_path, pdf_file_name + '')

            logger.debug('output_xml_file_path : {}'.format(output_xml_file_path))
            logger.debug('output_txt_file_path : {}'.format(output_txt_file_path))

            # Convert PDF to HTML using poppler
            run(['pdftohtml', pdf_file_path, '-c', '-hidden', '-xml', '-s', '-nomerge', output_xml_file_path])

            # Convert PDF to Text using poppler
            run(['pdftotext', pdf_file_path, output_txt_file_path])

            # Convert PDF to Image using poppler
            run(['pdftoppm', '-rx', '300', '-ry', '300', '-tiff', pdf_file_path, output_image_file_path])

            # Return generated output file paths

            return {
                'output_xml_file_path': output_xml_file_path,
                'output_txt_file_path': output_txt_file_path,
                'output_image_file_path': output_image_file_path
            }
        except:
            logger.exception()

    def read_text_boxes_from_xml(self, xml_file_path):

        xml_tree = etree.parse(xml_file_path)

        xml_root = xml_tree.getroot()

        # Read the XML root tag
        logger.debug("Root Tag {}".format(xml_root.tag))

        # Read the children tags
        children = [page for page in xml_root]

        # Filter Page tags
        pages = list(filter(lambda child: child.tag == 'page', children))
        logger.debug("Pages : {}".format(pages))

        # iterate each page to extract all text boxes in each page

        text_boxes = []

        # fontspec_map stores id to font info dict
        fontspec_map = {}

        for page in pages:
            children = [child for child in page]

            # Filter FontSpec tags
            fontspec_tags = list(filter(lambda child: child.tag == 'fontspec', children))

            for fontspec in fontspec_tags:
                fontspec_info = {
                    'id': fontspec.get('id'),
                    'size': fontspec.get('size'),
                    'family': fontspec.get('family'),
                    'color': fontspec.get('color')
                }

                fontspec_map[fontspec.get('id')] = fontspec_info

            # Filter Text tags
            text_tags = list(filter(lambda child: child.tag == 'text', children))

            for text_tag in text_tags:

                logger.debug("Text: {}\n".format(text_tag.text))
                text_content = str(text_tag.text if text_tag.text else '')

                for child_tag in text_tag:
                    text_content = text_content + str(child_tag.text if child_tag.text else '')
                    logger.debug("Children : {}\n".format(child_tag.text))

                fontspec = fontspec_map.get(text_tag.get('font'), {})

                text_info = {
                    'text': text_content,
                    'top': text_tag.get('top'),
                    'left': text_tag.get('left'),
                    'width': text_tag.get('width'),
                    'height': text_tag.get('height'),
                    'pageNumber': page.get('number'),
                    'pageWidth': page.get('width'),
                    'pageHeight': page.get('height'),
                    'fontSize': fontspec.get('size'),
                    'fontFamily': fontspec.get('family'),
                    'fontColor': fontspec.get('color'),
                }

                logger.debug("Text Info : {}\n".format(text_info))

                text_boxes.append(text_info)
        return text_boxes
