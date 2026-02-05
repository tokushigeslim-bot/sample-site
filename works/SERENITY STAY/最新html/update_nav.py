import os
import re

files = [
    'index.html', 'rooms.html', 'room-detail.html', 'dining.html', 
    'spa.html', 'gallery.html', 'access.html', 'about.html'
]

new_nav = """        <nav>
            <ul>
                <li><a href="about.html">Concept</a></li>
                <li><a href="rooms.html">Rooms</a></li>
                <li><a href="dining.html">Dining</a></li>
                <li><a href="spa.html">Spa</a></li>
                <li><a href="gallery.html">Gallery</a></li>
                <li><a href="access.html">Access</a></li>
                <li><a href="reservation.html" class="reserve-btn">Reserve</a></li>
            </ul>
        </nav>"""

# Regex for logo: strictly matching the existing static div
logo_pattern = r'<div class="logo">SERENITY STAY</div>'
logo_replacement = '<div class="logo"><a href="index.html">SERENITY STAY</a></div>'

# Regex for nav: matches <nav>...<ul>...</ul>...</nav> across lines
nav_pattern = r'<nav>\s*<ul>.*?</ul>\s*</nav>'

for f in files:
    if os.path.exists(f):
        with open(f, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # Replace Logo if it's not already a link
        if '<div class="logo"><a href="index.html">' not in content:
            content = re.sub(logo_pattern, logo_replacement, content)
        
        # Replace Nav
        content = re.sub(nav_pattern, new_nav, content, flags=re.DOTALL)
        
        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)
        print(f"Updated {f}")
    else:
        print(f"Skipped {f} (not found)")
