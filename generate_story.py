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

# Generate a new story using GPT-3.5-turbo
def generate_story():
    prompt = f"""
    Write a high-quality bedtime story featuring:
    - Main character: 4-year-old girl named Sage.
    - Supporting characters: Three Mastador dogs (Emika, Buster, Freya), white bicolored male cat (Doobie), Sage's grey cat (Snowpaws), and family members (Aunty Cece, Uncle Froggy, Dad, Pops, Nina (Sage's 12-year-old cousin), Dez (Sage's 8-year-old cousin), and Sage's two brothers: 7-year-old Grayson and 3-year-old Jasper).
    - Themes: Mermaids and/or unicorns. Include occasional Minecraft adventures.
    - Lesson: Emphasize kindness and the importance of listening.
    Ensure the tone is warm, magical, and imaginative.
    """

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
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
