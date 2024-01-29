from django.shortcuts import render
from django.http import JsonResponse
from nltk import ngrams as nltk_ngrams
import json


# Create your views here.
def ngrams(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        data = json.loads(body_unicode)
        id1 = data.get('id1', '')
        id2 = data.get('id2', '')
        result = get_compare_ngrams(id1, id2)
        return JsonResponse({'ngrams_result':result}) 

def get_compare_ngrams(string1, string2, n=2):
    string1 = list(string1)
    string2 = list(string2)
    ngrams_id1 = set(nltk_ngrams(string1, n))
    print(ngrams_id1)
    ngrams_id2 = set(nltk_ngrams(string2, n))

    intersection = len(ngrams_id1.intersection(ngrams_id2))
    union = len(ngrams_id1.union(ngrams_id2))

    similarity_coefficient = intersection / union if union != 0 else 0

    return {
        'id1_ngrams': list(ngrams_id1),
        'id2_ngrams': list(ngrams_id2),
        'jaccard_similarity': similarity_coefficient
    }
