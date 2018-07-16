from django.db import models

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
    extract_request = models.ForeignKey(ExtractRequest, verbose_name="ExtractRequest", name="extract_request", on_delete="CASCADE", default=None, blank=True)

    # This field specifies reference to ocr representation of Document
    ocr_output = models.FileField(verbose_name="OCR Output", name="ocr_output", default=None, blank=True)


    # Status of Document
    STATUS_CREATED = 'CREATED'
    STATUS_PROCESSED = 'PROCESSED'

    STATUS_CHOICES = [
        (STATUS_CREATED, 'created'),
        (STATUS_PROCESSED, 'processed'),
    ]

    status = models.CharField(max_length=32, default=STATUS_CREATED, choices=STATUS_CHOICES)

