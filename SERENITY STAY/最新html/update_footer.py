import os
import re

files = [
    'index.html', 'rooms.html', 'room-detail.html', 'dining.html', 
    'spa.html', 'gallery.html', 'access.html', 'about.html', 
    'reservation.html', 'contact.html', 'privacy.html'
]

# Pattern for the Footer Links section
# We are looking for: <div class="footer-links">...</div>
# And we want to replace it with:
# <div class="footer-links">
#    <a href="contact.html">Contact</a>
#    <a href="privacy.html">Privacy Policy</a>
#    <a href="#">Instagram</a>
# </div>

footer_pattern = r'<div class="footer-links">(.*?)</div>'
footer_replacement = """<div class="footer-links">
                <a href="contact.html">Contact</a>
                <a href="privacy.html">Privacy Policy</a>
                <a href="#">Instagram</a>
            </div>"""

for f in files:
    if os.path.exists(f):
        with open(f, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # Replace Footer Links
        # Use simple replacement if logic is simple, but regex is safer for multi-line variation
        content = re.sub(footer_pattern, footer_replacement, content, flags=re.DOTALL)
        
        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)
        print(f"Updated footer in {f}")
    else:
        print(f"Skipped {f} (not found)")
