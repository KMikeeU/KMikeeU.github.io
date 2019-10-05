import json

with open("words.csv", "r") as file:
    csv_data = file.read().splitlines()

word_list = []

for line in csv_data:
    word_list.append(line.split(",")[0].lower())

with open("words.json", "w+") as file:
    file.write(json.dumps(word_list))