import re
with open('oficial/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace png and jpg
html = html.replace('.png', '.webp').replace('.jpg', '.webp')

# Wait, the <source> tags for the picture element might have something like:
# <source srcset="./assets/rafa_foto.webp" type="image/webp">
# <img src="./assets/rafa_foto.png" ...>
# If we replace .png with .webp, the img src will also be webp. That is actually fine, all modern browsers support webp anyway.

with open('oficial/index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('HTML updated!')
