
import json
import openai
import os
import datetime

# Load existing stories.json (or initialize if missing)
try:
    with open('stories.json', 'r') as file:
        stories_data = json.load(file)
except FileNotFoundError:
    stories_data = {"stories": []}

# OpenAI API setup
openai.api_key = os.getenv("OPENAI_API_KEY")

# Generate a new story using the updated OpenAI API
def generate_story():
    prompt = f"""
    Write a high-quality bedtime story featuring:
    - Main character: 4-year-old girl named Sage
    - Supporting characters: Three Mastador dogs (Emika, Buster, Freya), white bicolored cat (Doobie), Sage's grey cat (Snowpaws), and family members (Aunty Cece, Uncle Froggy, Pops, Grayson, Jasper, Nina, Dez).
    - Themes: Mermaids and/or unicorns. Include occasional Minecraft adventures.
    - Lesson: Emphasize kindness and the importance of listening.
    Ensure the tone is warm, magical, and imaginative.
    """

    response = openai.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a creative and imaginative storyteller."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=1500
    )

    story_content = response.choices[0].message.content.strip()
    return story_content

# Create new story entry
new_story = {
    "title": f"Sage's Magical Adventure - {datetime.date.today()}",
    "date": str(datetime.date.today()),
    "content": generate_story()
}

# Add the new story and save the updated stories.json
stories_data["stories"].append(new_story)

with open('stories.json', 'w') as file:
    json.dump(stories_data, file, indent=4)

print("New story generated and added successfully.")
