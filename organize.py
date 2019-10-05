import json
import requests
from bs4 import BeautifulSoup

print("Downloading spreadsheet...")
req = requests.get("https://docs.google.com/spreadsheets/d/1ozg1Cnm6SdtM4M5rATkANAi07xAzYWaKL7HKxyvoHzk/htmlview?sle=true")

print("Spreadsheet downloaded, gathering data...")

soup = BeautifulSoup(req.text, "html.parser")
matches = soup.find_all("td", {"class": "s2"})

word_list = []

for match in matches:
    word_list.append(match.getText().lower())

print("Saving output")

with open("words.json", "w+") as file:
    file.write(json.dumps(word_list))

print("Done!")