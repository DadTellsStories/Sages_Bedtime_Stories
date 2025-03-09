function loadStory() {
    fetch("stories.json")
        .then(response => response.json())
        .then(data => {
            const today = new Date().toISOString().split('T')[0];
            console.log("Today's date:", today);
            console.log("Loaded stories:", data.stories);

            // Find today's story
            const story = data.stories.find(story => story.date === today);

            if (story) {
                console.log("Story found:", story);
                document.getElementById("story-container").innerHTML = 
                    `<h2>${story.title}</h2><p>${story.content}</p>`;
            } else {
                console.warn("No story found for today.");
                document.getElementById("story-container").innerHTML = 
                    `<h2>No Story Available</h2><p>Check back later for a new bedtime story!</p>`;
            }
        })
        .catch(error => console.error("Error loading story:", error));
}
