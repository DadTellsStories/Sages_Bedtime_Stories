console.log("✅ script.js is loaded!");
document.getElementById("debug-output").innerHTML = "<p>✅ script.js is connected!</p>";
function loadStory() {
    fetch("stories.json")
        .then(response => response.json())
        .then(data => {
            const today = new Date().toISOString().split('T')[0];
            const debugOutput = document.getElementById("debug-output");

            // Display today's date and total stories on the page
            debugOutput.innerHTML = `<p><strong>Today's Date:</strong> ${today}</p>`;
            debugOutput.innerHTML += `<p><strong>Total Stories Loaded:</strong> ${data.stories.length}</p>`;

            // Find today's story
            const story = data.stories.find(story => story.date === today);

            if (story) {
                debugOutput.innerHTML += `<p><strong>Story Found:</strong> Yes</p>`;
                document.getElementById("story-container").innerHTML = 
                    `<h2>${story.title}</h2><p>${story.content}</p>`;
            } else {
                debugOutput.innerHTML += `<p><strong>Story Found:</strong> No</p>`;
                document.getElementById("story-container").innerHTML = 
                    `<h2>No Story Available</h2><p>Check back later for a new bedtime story!</p>`;
            }
        })
        .catch(error => {
            console.error("Error loading story:", error);
            document.getElementById("debug-output").innerHTML += 
                `<p><strong>Error:</strong> ${error.message}</p>`;
        });
}
