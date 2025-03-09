// Ensure debug info is hidden on page load
document.addEventListener("DOMContentLoaded", () => {
    const debugSection = document.getElementById("debug-output");
    if (debugSection) debugSection.style.display = "none";
});
console.log("✅ script.js is loaded!");
document.getElementById("debug-output").innerHTML = "<p>✅ script.js is connected!</p>";
function toggleDebug() {
    const debugSection = document.getElementById("debug-output");
    debugSection.style.display = (debugSection.style.display === "none") ? "block" : "none";
}
function loadStory() {
    fetch("stories.json")
        .then(response => response.json())
        .then(data => {
            const today = new Date().toLocaleDateString('en-CA');;
            const debugOutput = document.getElementById("debug-output");

            // Debug Output
            debugOutput.innerHTML = `<p><strong>Today's Date:</strong> ${today}</p>`;
            debugOutput.innerHTML += `<p><strong>Total Stories Loaded:</strong> ${data.stories.length}</p>`;

            // Display all available story dates
            data.stories.forEach((story, index) => {
                debugOutput.innerHTML += `<p>Story ${index + 1} Date: ${story.date}</p>`;
            });

            // Find today's story
            const story = data.stories.find(story => story.date.trim() === today);

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
