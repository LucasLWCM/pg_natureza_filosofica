import sys
from PIL import Image
import os

try:
    gif_path = 'oficial/hero-loop.gif'
    webp_path = 'oficial/hero-loop.webp'
    
    if os.path.exists(gif_path):
        img = Image.open(gif_path)
        img.save(webp_path, format='webp', save_all=True, optimize=True, quality=80)
        print("Optimized GIF to WebP successfully. New size:", os.path.getsize(webp_path))
    else:
        print("GIF not found")
except Exception as e:
    print(f"Error: {e}")
