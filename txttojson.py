import os, sys, json

# open the fims.txt file, and make a json object of numbers defining their index and the value the text
obj = []
with open('/Users/davidoduneye/projects/javascript/wtftw/films.txt', 'r') as f:
    lines = f.readlines()
    json_obj = {}
    for line in lines:
        obj.append({'name': line.strip()})


