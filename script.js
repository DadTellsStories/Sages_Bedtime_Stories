function loadStory() {
    fetch("stories.json")
        .then(response => response.json())
        .then(data => {
            const today = new Date().toISOString().split('T')[0];
            console.log("Today's date:", today);
            console.log("Stories array:", data.stories);

            // Find today's story from the array
            const story = data.stories.find(story => story.date === today);

            if (story) {
                console.log("Found story:", story);
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
