import os
from PIL import Image
import glob

# Find all png and jpg images in oficial/ and oficial/assets/
files = []
for ext in ('*.png', '*.jpg', '*.jpeg'):
    files.extend(glob.glob('oficial/' + ext))
    files.extend(glob.glob('oficial/assets/' + ext))

for f in files:
    try:
        if 'rafa_foto.png' in f or 'rafa_oferta.png' in f:
            # We already have webp versions for these in HTML <source>, but let's just make sure they are webp for the <img> tag too if we want
            pass
        
        img = Image.open(f)
        # Convert to RGB if necessary (for JPEG or if it has no alpha)
        if img.mode in ("RGBA", "P"):
            # WebP supports RGBA
            pass
        
        webp_path = os.path.splitext(f)[0] + '.webp'
        img.save(webp_path, 'webp', quality=80, method=6)
        print(f"Converted {f} to {webp_path}")
    except Exception as e:
        print(f"Failed to convert {f}: {e}")
