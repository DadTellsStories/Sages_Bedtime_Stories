function loadStory() {
    fetch("stories.json")
        .then(response => response.json())
        .then(data => {
            const today = new Date().toISOString().split('T')[0];

            // Find today's story from the array
            const story = data.stories.find(story => story.date === today) || 
                { title: "No Story Available", content: "Check back later for a new bedtime story!" };

            document.getElementById("story-container").innerHTML = 
                `<h2>${story.title}</h2><p>${story.content}</p>`;
        })
        .catch(error => console.error("Error loading story:", error));
}