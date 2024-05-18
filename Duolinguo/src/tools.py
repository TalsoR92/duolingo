import json
import json
import textdistance
import random
import unidecode


def change_json_format(old_json, new_json):
    '''
    I want all valuee to be a string a not an list of one string
    use utf-8 encoding
    '''
    with open(old_json, "r", encoding="utf-8") as f:
        vocab = json.load(f)
    new_vocab = {}
    for key in vocab:
        new_vocab[key] = vocab[key][0]
    with open(new_json, "w", encoding="utf-8") as f:
        json.dump(new_vocab, f, indent=4, ensure_ascii=False)

# change_json_format("../JSON/words_en-fr_v2.json", "../JSON/words_en-fr_v3.json")


def egal_with_one_switch_max(s1, s2):
    '''
    This function checks if two strings s1 and s2 are equal or can be made equal by swapping at most one pair of characters in s1.
    '''
    if s1 == s2:
        return True
    if len(s1) != len(s2):
        return False
    i = 0
    while i < len(s1) - 1:
        if s1[i] != s2[i]:
            if s1[i] != s2[i + 1] or s1[i + 1] != s2[i]:
                return False
            i += 2
        else:
            i += 1
    

def my_levenstein(s1, s2):
    '''
    met en minuscule les deux chaines
    fait une liste en séparant le s2 par des ","
    supprime les espaces au début et à la fin de chaque élément de la liste
    '''
    s1 = unidecode.unidecode(s1.lower())
    s2 = s2.lower()
    list_s2 = s2.split(",")
    list_s2 = [unidecode.unidecode(x.strip()) for x in list_s2]
    
    for elt in list_s2:
        if egal_with_one_switch_max(s1, elt):
            return True

    # trouve le levenstein le plus petit entre s1 et chaque élément de list_s2
    return max([textdistance.levenshtein.normalized_similarity(s1, x) for x in list_s2])
