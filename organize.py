#!/bin/env python3

# Please first download "Confirmed Demonetized Words" from https://docs.google.com/spreadsheets/d/1ozg1Cnm6SdtM4M5rATkANAi07xAzYWaKL7HKxyvoHzk/edit#gid=674179785 as words.csv
# This script takes the csv and extracts only the demonetized words into words.json
# 1st Column [0], 4-End Rows [3:]

import json

# Read file and split into list, by lines
with open("words.csv") as file:
    lines = file.read().splitlines()

extracted = []

# Split lines by commas and fill 'extracted' with comma-separated lines
for line in lines:
    extracted.append(line.split(","))

words = []

# Select the first columns from every row starting at 4 and append to words
# Note: Extracting words as lowercase, since that is how they are treated in the final JS
for row in extracted[3:]:
    words.append(row[0].lower())

# Dump json array of words to words.json
open("words.json", "w").write(json.dumps(words))