import json
from datetime import datetime
import random

# List of bedtime story prompts
prompts = [
    "Sage and Mira discover a hidden underwater kingdom.",
    "A magical unicorn grants Sage three wishes.",
    "Sage and her pets go on an adventure to find a lost treasure.",
    "Sage meets a talking dolphin who needs help solving a mystery.",
    "A glowing butterfly leads Sage to an enchanted forest."
]

# Function to generate a new story
def generate_story():
    prompt = random.choice(prompts)
    story = f"""Once upon a time, {prompt} Sage used her kindness and courage to overcome challenges, learning an important lesson along the way. And so, another adventure came to a happy end."""
    return story

# Load existing stories
try:
    with open("stories.json", "r") as file:
        stories = json.load(file)
except FileNotFoundError:
    stories = {}

# Add new story with today's date
today = datetime.now().strftime("%Y-%m-%d")
stories[today] = {
    "title": f"Bedtime Story for {today}",
    "content": generate_story()
}

# Save updated stories.json
with open("stories.json", "w") as file:
    json.dump(stories, file, indent=4)

print("New bedtime story generated and saved.")
