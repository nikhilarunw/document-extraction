"""
This file defines the interface which should be implemented specialized file type extractors.
"""

class BaseExtractor(object):

    # input file is reference to file that is to be extracted
    input_file = None

    def __init__(self, input_file):
        self.input_file = input_file


    def extract_data(self):
        """
        This method defines implementation to extract data for specific file formats.
        :return:
        """
        raise NotImplementedError("extract_data method should be implemented.")

