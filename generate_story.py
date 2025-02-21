import json
import random
from datetime import datetime

# Story elements
characters = ["Sage", "Mira the Mermaid", "Grayson", "Jasper", "Dez", "Nina", 
              "Aunty Cece", "Uncle Froggy", "Grandpa Pops", 
              "Snowpaws the cat", "Shadow the cat", "Doobie the cat", 
              "Emika the Mastador", "Buster the Mastador", "Freya the Mastador", 
              "Belle the dog", "Rocko the dog", "Taco the Chihuahua"]

settings = ["a magical underwater kingdom", "a glowing enchanted forest", 
            "a castle made of clouds", "a hidden cave of treasures", 
            "a floating island in the sky", "a ship sailing across the stars"]

conflicts = ["a lost magical pearl", "a riddle from a wise old turtle", 
             "a spell that needs breaking", "a storm that separates them", 
             "a treasure map with missing pieces", "a mischievous fairy causing trouble"]

lessons = ["the power of kindness", "why listening is important", 
           "how to be brave even when scared", "why teamwork makes everything better", 
           "the magic of believing in yourself", "how patience can lead to great rewards"]

def generate_story():
    # Select random elements
    main_character = "Sage"
    friends = random.sample(characters, 3)  # Pick 3 random companions
    setting = random.choice(settings)
    conflict = random.choice(conflicts)
    lesson = random.choice(lessons)

    # Create a detailed story
    story = f"""One evening, Sage and her friends {', '.join(friends)} found themselves in {setting}. 
    The air was filled with magic as they explored the wonders around them. But just as they were marveling at the beauty, they discovered {conflict}. 
    
    "We have to work together!" Sage exclaimed. Her friends nodded, each bringing their own special skills to help solve the problem.
    
    As they ventured deeper, they met a wise old owl who gave them a clue, a playful dolphin who guided them through the currents, and a sparkling fairy who gifted them a magical key.
    Through teamwork, courage, and determination, they unraveled the mystery and discovered {lesson}.
    
    As the adventure came to an end, Sage and her friends laughed, knowing that they had grown wiser and stronger. With hearts full of joy, they returned home, ready for the next magical journey. 
    And so, under the twinkling stars, Sage drifted off to sleep, dreaming of even grander adventures to come."""

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
