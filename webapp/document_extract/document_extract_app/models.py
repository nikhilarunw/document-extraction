from django.contrib.postgres.fields import JSONField
from django.db import models

from document_extract_app.search import DocumentIndex


class ExtractRequest(models.Model):
    """
    This model represent the extraction request.
    """

    """
    Status of extraction request
    """
    STATUS_CREATED = 'CREATED'
    STATUS_COMPLETED = 'COMPLETED'

    STATUS_CHOICES = [
        (STATUS_CREATED, 'created'),
        (STATUS_COMPLETED, 'completed')
    ]

    status = models.CharField(max_length=32, default=STATUS_CREATED, choices=STATUS_CHOICES)


class Document(models.Model):
    """
    This model represent the document which would be a physical flat file.
    for example .pdf, .jpeg etc.
    """

    # This field specifies reference to physical file.
    file = models.FileField(verbose_name="File", name="file", default=None, blank=True)

    # This field specifies reference to extract request (parent) to which this Document belongs
    extract_request = models.ForeignKey(ExtractRequest, verbose_name="ExtractRequest", name="extract_request",
                                        on_delete="CASCADE", default=None, blank=True)

    # This field specifies reference to ocr representation of Document
    ocr_output = models.FileField(verbose_name="OCR Output", name="ocr_output", default=None, blank=True)

    # This field stores ocr data referenced by ocr_output file in as JSON Format (redundant for ease of use in app)
    ocr_json = JSONField(verbose_name="OCR JSON", name="ocr_json", default={}, blank=False)

    # This field stores annotated data for current document
    annotated_json = JSONField(verbose_name="Annotated JSON", name="annotated_json", default={}, blank=False)

    # This field stores extracted data for current document
    extracted_json = JSONField(verbose_name="Extracted JSON", name="extracted_json", default={}, blank=False)

    # Status of Document
    STATUS_CREATED = 'CREATED'
    STATUS_PROCESSED = 'PROCESSED'

    STATUS_CHOICES = [
        (STATUS_CREATED, 'created'),
        (STATUS_PROCESSED, 'processed'),
    ]

    status = models.CharField(max_length=32, default=STATUS_CREATED, choices=STATUS_CHOICES)

    # Add indexing method to DocumentIndex
    def indexing(self):
        obj = DocumentIndex(
            meta={'id': self.id},
            ocr_json=self.ocr_json
        )
        obj.save()
        return obj.to_dict(include_meta=True)

class ExtractionModel(models.Model):
    """
    This model represents the extraction logic which will used to extract information for related documents
    """
    config_json = JSONField(verbose_name="Config JSON", name="config_json", default={}, blank=False)

    # list of tags to attach to model
    tags = JSONField(verbose_name="Tags", name="tags", default=[], blank=False)

    # This field represent the type of model
    # Each model can have different processing logic and config_json format
    MODEL_TYPE_SEARCH_AND_LAYOUT = 'SEARCH_AND_LAYOUT'
    MODEL_TYPE_ZONAL = 'ZONAL'

    MODEL_TYPE_CHOICES = [('Search And Layout', MODEL_TYPE_SEARCH_AND_LAYOUT),
                          ('Zonal', MODEL_TYPE_ZONAL)]

    model_type = models.CharField(verbose_name="Model Type", name="model_type",
                                  max_length=100,
                                  default=None,
                                  blank=True,
                                  choices=MODEL_TYPE_CHOICES)
