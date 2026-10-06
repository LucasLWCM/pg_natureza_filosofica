import re
import os

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

links = re.findall(r'(?:src|href)="([^"]+)"', html)
for l in links:
    if l.startswith('./oficial/'):
        path = l[2:] # remove ./
        if not os.path.exists(path):
            print('MISSING:', l, '-> expected at', path)
