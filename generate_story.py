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

# OpenAI API setup (new client-based method)
client = openai.Client(api_key=os.getenv("OPENAI_API_KEY"))

# Generate a new story and a creative title using GPT-3.5-turbo
def generate_story_and_title():
    prompt = f"""
    Write a high-quality bedtime story featuring:
    - Main character: 4-year-old girl named Sage.
    - Supporting characters: Three Mastador dogs (Emika, Buster, Freya), white bicolored male cat (Doobie), Sage's grey female cat (Snowpaws),Aunty Cece’s Grey Fluffy female cat (Shadow), and family members (Aunty Cece, Uncle Froggy, Dad, Pops, Nina (Sage's 12-year-old cousin, a girl), Dez (Sage's 8-year-old cousin, a girl), and Sage's two brothers: 7-year-old Grayson and 3-year-old Jasper).
    - Themes: Mermaids and/or unicorns. Include occasional Minecraft adventures.
    - Lessons: Choose from these important life lessons—kindness, listening, patience, courage, teamwork, honesty, responsibility, friendship, gratitude, and perseverance.
Ensure the tone is warm, magical, and imaginative.

    First, provide only a creative, engaging story title (without including the date). Then, provide the complete story.
    Ensure the title reflects the unique adventure in a fun and descriptive way.
    """

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a creative and imaginative storyteller."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=1800
    )

    output = response.choices[0].message.content.strip()
    title, story_content = output.split("\n", 1)
    return title.strip(), story_content.strip()

# Create a new story entry with a descriptive title
title, content = generate_story_and_title()
new_story = {
    "title": title,
    "date": str(datetime.date.today()),
    "content": content
}

# Add the new story and save the updated stories.json
stories_data["stories"].append(new_story)

with open('stories.json', 'w') as file:
    json.dump(stories_data, file, indent=4)

print(f"New story generated: {title}")
print("Story added successfully.")
