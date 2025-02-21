import json
import random
from datetime import datetime

# Story elements
characters = ["Sage", "Mira the Mermaid", "Snowpaws the cat", "Doobie the cat", "Emika, Buster, and Freya the Mastadors"]
settings = ["a magical underwater kingdom", "a glowing enchanted forest", "a castle made of clouds", "a hidden cave of treasures"]
conflicts = ["a lost magical pearl", "a riddle from a wise old turtle", "a spell that needs breaking", "a storm that separates them"]
lessons = ["the power of kindness", "why listening is important", "how to be brave even when scared", "why teamwork makes everything better"]

# Generate a full bedtime story
def generate_story():
    character = random.choice(characters)
    setting = random.choice(settings)
    conflict = random.choice(conflicts)
    lesson = random.choice(lessons)

    story = f"""One evening, {character} found themselves in {setting}. As they explored, they discovered {conflict}. 
    With courage and the help of their friends, they worked together to find a solution. Along the way, they learned {lesson}.
    By the end of their adventure, they had grown wiser and felt proud of what they had accomplished. And so, as the stars twinkled above, {character} drifted off to sleep, dreaming of the next great adventure."""

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

print("New detailed bedtime story generated and saved.")
