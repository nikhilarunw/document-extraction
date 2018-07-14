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
    file = models.FileField(verbose_name="File", name="file")
    extract_request = models.ForeignKey(ExtractRequest, verbose_name="Extract Request", name="Extract Request", on_delete="CASCADE")