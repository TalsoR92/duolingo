from selenium import webdriver
import time
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup
import json

def download_all_vocab_html(url, filename):
    '''
    Opens a web page on a website and waits for the user to connect.
    Then, when decided, initiates the loop to load words.

    Objective:
        The goal is to download all the vocabulary already seen in Duolingo.
    '''
    driver = webdriver.Firefox()
    driver.get(url)  # Open the web page
    time.sleep(5)  # Wait a few seconds for the page to load

    # Wait for user to connect
    input("Press Enter to continue")  # Wait for the user to press Enter
    time.sleep(5)

    # Initiate the loop to load words
    image_source = 'https://d35aaqx5ub95lt.cloudfront.net/images/practiceHub/5d6e001cb745302aecc569f09fb7d669.svg'
    cpt = 0
    nb_sec = 5
    while True:
        try:
            # Click the button with the specified src
            driver.find_element(By.XPATH, f'//img[@src="{image_source}"]').click()
            t = 0.1
            time.sleep(t)
            cpt = 0
        except:
            cpt += t
            if cpt >= nb_sec:
                print("No more button to click")
                break

    # Save the HTML content of the specified element to a file
    with open(filename, 'w', encoding='utf-8') as file:
        content = driver.find_element(By.XPATH, '/html/body/div[1]/div[2]/div/div[2]/div/div[2]/div/section[2]/ul').get_attribute('outerHTML')
        file.write(content)

# download_all_vocab_html('https://www.duolingo.com/?isLoggingIn=true', 'words_en-fr_v2.html')

def create_json_vocab_list(filename, filename_json):
    '''
    Reads the HTML file and extracts the vocabulary to create a JSON file.

    Objective:
        The goal is to extract the vocabulary from the HTML file and create a JSON file.
    '''
    # Read the HTML file
    with open(filename, 'r', encoding='utf-8') as file:
        html_content = file.read()

    # Initialize dictionary to store vocabulary
    vocab_dict = {}

    # Parse HTML content using BeautifulSoup
    soup = BeautifulSoup(html_content, 'html.parser')

    # Find all <li> tags with class "_1NxpR"
    word_blocks = soup.find_all('li', class_='_2g-qq')
    
    # Extract vocabulary from each word block
    for word_block in word_blocks:
        # Find the h3 tag containing the English word
        h3_tag = word_block.find('h3')
        english_word = h3_tag.text.strip() if h3_tag else None

        # Find the <p> tags containing the French translations
        p_tags = word_block.find_all('p')
        french_translations = [p.text.strip() for p in p_tags]

        # Add English word and French translations to the dictionary
        if english_word and french_translations:
            vocab_dict[english_word] = french_translations
        else:
            print(f"Skipping word block: {word_block}")

    # Save the vocabulary in a JSON file
    with open(filename_json, 'w', encoding='utf-8') as file:
        json.dump(vocab_dict, file, indent=4, ensure_ascii=False)

    

# create_json_vocab_list('../HTML/words_en-fr_v2.html', '../JSON/words_en-fr_v2.json')
