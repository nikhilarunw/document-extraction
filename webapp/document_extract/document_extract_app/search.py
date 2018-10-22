from datetime import datetime
from elasticsearch_dsl import Document, Date, Integer, Keyword, Text, Object, Search
from elasticsearch_dsl.connections import connections

# Define a default Elasticsearch client
connections.create_connection(hosts=['localhost'])

class DocumentIndex(Document):
    ocr_json = Object()

    class Index:
        name = 'document-index'

    def save(self, ** kwargs):
        return super(DocumentIndex, self).save(** kwargs)


from elasticsearch.helpers import bulk
from elasticsearch import Elasticsearch
from . import models
...
...
def bulk_indexing():
    DocumentIndex.init()
    es = Elasticsearch()
    bulk(client=es, actions=(b.indexing() for b in models.Document.objects.all().iterator()))

def search(ocr_json):
    s = Search().filter('term', ocr_json=ocr_json)
    response = s.execute()
    return response

def run():
    # create the mappings in elasticsearch
    DocumentIndex.init()

    # create and save and document
    document = DocumentIndex(meta={id:42})
    document.ocr_json = {'hello':'ok'}
    document.save()

    document = DocumentIndex.get(id=42)

    #print(document.ocr_json)

    # Display cluster health
    print(connections.get_connection().cluster.health())
