import json

from document_extract_app.models import Document, ExtractionModel


def extract_document_data(document_id, extraction_model_id):
    """
    This method accepts document_id and extraction_model_id returns the result of extraction as dict
    :param document_id:
    :param extraction_model_id:
    :return:
    """

    document = Document.objects.get(id=document_id)
    extraction_model = ExtractionModel.objects.get(id=extraction_model_id)

    extraction_json = {}

    if extraction_model.model_type == ExtractionModel.MODEL_TYPE_SEARCH_AND_LAYOUT:
        extraction_json = extract_with_search_and_layout_model(document, extraction_model)

    return extraction_json


def extract_with_search_and_layout_model(document, extraction_model):
    ocr_json = document.ocr_json
    texts = ocr_json.get('texts', [])

    config_json = extraction_model.config_json
    annotated_json_string = config_json.get('annotatedJson', {})
    annotated_json = json.loads(annotated_json_string)

    texts_labels = annotated_json.get('texts_labels', [])
    texts_values = annotated_json.get('texts_values', [])

    texts_map = {}

    label_results = {}
    value_results = {}

    for text in texts:
        search_text = text.get('text')
        values = texts_map.get(search_text, [])
        values.append(text)
        texts_map[search_text] = values

    for key, text in texts_labels.items():
        search_text = text.get('text')
        results = texts_map.get(search_text, [])
        label_results[search_text] = results

    for key, text in texts_values.items():
        search_text = text.get('text')
        results = texts_map.get(search_text, [])
        value_results[search_text] = results

    return {
        'extracted_labels': label_results,
        'extracted_values': value_results
    }
