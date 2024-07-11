import json
import textdistance
import random
import unidecode

from tools import *

# -*- coding: utf-8 -*-

def play_test():
    '''
    Play a test game with nb_questions questions.
    nb_repeat is the number of times a question is repeated.
    nb_repeat_wrong is the number of times a question is repeated if it is wrong.

    It ask to the user:
        - the language : english or ukranian -> to load the right file
        - the sens of the translation : en-uk or uk-en
        - the number of questions
        - the number of repeat for each question
        - the number of repeat for each question if it is wrong

        - Then it ask nb_questions questions to the user.
    '''
    print("Welcome to the Duolinguo game!")
    print("Please choose the language you want to play with:") # the two files are vocab_en-fr.json and vocab_uk-en.json
    print("1. English")
    print("2. Ukrainian")
    language = input("Enter the number of the language you want to play with: ")
    language = "en" if language == "1" else "uk"

    # load the right file : vocab_en-fr.json or vocab_uk-en.json
    if language == "en":
        with open("../JSON/words_en-fr_v3.json", "r") as f:
            vocab = json.load(f)
        print("Please choose the sense of the translation:")
        print("1. English to French")
        print("2. French to English")
        sense = input("Enter the number of the sense of the translation: ")
        normal_sense = True if sense == "1" else False

    else:
        with open("../JSON/vocab_uk-en.json", "r") as f:
            vocab = json.load(f)
        print("The only sense of the translation is Ukrainian to English")
        normal_sense = True

    nb_questions = int(input("Enter the number of questions you want to answer: "))
    nb_repeat = int(input("Enter the number of repeat for each question: "))
    nb_repeat_wrong = int(input("Enter the number of repeat for each question if it is wrong: "))
    print("Let's start the game!\n")

    vocab = dict(vocab) # convert the vocab to a dict
    if normal_sense:
        start_game(vocab, nb_questions, nb_repeat, nb_repeat_wrong)
    else:
        start_game_reverse(vocab, nb_questions, nb_repeat, nb_repeat_wrong)


def start_game(vocab, nb_words, nb_repeat, nb_repeat_wrong):
    '''
    Start the game with the given parameters.
    use my levenstein function to compare the answer with the correct answer.

    if i < nb_words:
        choose a random question in the vocab and add the question to the map list_words with question as a key and answer as a value
        and add to a second one score_words with question as a key and nb_repeat as a value
        if the user answer is correct:
            decrement the score of the question in score_words
        else:
            put it to nb_repeat_wrong
    else:
        choose a random question in list_words and ask the question to the user
        if the user answer is correct:
            do the same as before
            if the score of the question is 0:
                add it to the map old_words
    '''
    words_map = {}
    score_words = {}
    old_word = {}
    i = 0
    while i < nb_words:
        # choose a random question in the vocab list 
        
        word = random.choice(list(vocab.keys()))
        
        words_map[word] = vocab[word]
        score_words[word] = nb_repeat
        i += 1
        del vocab[word] # delete the question from the vocab list

        
    
    while words_map:
        word = random.choice(list(words_map.keys()))
        answer = words_map[word]
        print(f"\nHow do you translate: {word}")
        user_answer = input("Answer: ")
        # print(f"my levenstein: {my_levenstein(user_answer, answer)}")
        if my_levenstein(user_answer, answer) > 0.80:
            score_words[word] -= 1
            if score_words[word] == 0:
                old_word[word] = answer
                del words_map[word]
            print("\nCorrect!\n")
            # if only one ":" in answer print nothing else print the answer
            if answer.count(":") >= 1 or my_levenstein(user_answer, answer) != 1:
                print(f"These are all the answers:\n{answer.encode('utf-8').decode('utf-8')}\n")
        else:
            score_words[word] = nb_repeat_wrong
            print(f"\nWrong! The corrects answers are: {answer.encode('utf-8').decode('utf-8')}")

def start_game_reverse(vocab, nb_words, nb_repeat, nb_repeat_wrong):

    '''
    Start the game with the given parameters.
    use my levenstein function to compare the answer with the correct answer.

    if i < nb_words:
        choose a random question in the vocab and add the question to the map list_words with question as a key and answer as a value
        and add to a second one score_words with question as a key and nb_repeat as a value
        if the user answer is correct:
            decrement the score of the question in score_words
        else:
            put it to nb_repeat_wrong
    else:
        choose a random question in list_words and ask the question to the user
        if the user answer is correct:
            do the same as before
            if the score of the question is 0:
                add it to the map old_words
    '''
    list_words = {}
    score_words = {}
    old_word = {}
    i = 0
    while i < nb_words:
        word = random.choice(list(vocab.keys()))
        if question not in list_words:
            list_words[word] = vocab[word]
            score_words[word] = nb_repeat
            i += 1
    
    while list_words:
        word = random.choice(list(list_words.keys()))
        answer = list_words[word]
        print(f"Question: {answer}")
        user_answer = input("Answer: ")
        if my_levenstein(user_answer, word):
            score_words[word] -= 1
            if score_words[word] == 0:
                old_word[word] = answer
                del list_words[word]
        else:
            score_words[word] = nb_repeat_wrong


play_test()



