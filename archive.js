
document.addEventListener("DOMContentLoaded", function() {
    const storyList = document.getElementById("story-list");
    const debugOutput = document.createElement("div");
    debugOutput.id = "debug-output";
    document.body.appendChild(debugOutput);

    function logDebug(message) {
        debugOutput.innerHTML += `<p>${message}</p>`;
    }

    logDebug("Loading archive...");

    fetch("stories.json")
        .then(response => {
            if (!response.ok) throw new Error("Failed to fetch stories.json");
            return response.json();
        })
        .then(data => {
            logDebug("Stories loaded successfully.");

            if (!data.stories || !Array.isArray(data.stories)) {
                logDebug("Error: Invalid stories format.");
                logDebug("Raw data: " + JSON.stringify(data));
                return;
            }

            // Helper to format content with paragraph breaks
            function formatContent(content) {
                return content.split('\n').map(line => line.trim() ? `<p>${line}</p>` : '').join('');
            }

            // Ensure each story is a clickable link
            data.stories.slice().reverse().forEach((story, index) => {
                if (story.title && story.date && story.content) {
                    logDebug(`Processing story: ${story.title}`);
                    const listItem = document.createElement("li");
                    const link = document.createElement("a");
                    link.href = "#";
                    link.textContent = `${story.date}: ${story.title}`;

                    // Set up the click event to load the story
                    link.addEventListener("click", () => loadStory(story.title, story.date, formatContent(story.content)));

                    listItem.appendChild(link);
                    storyList.appendChild(listItem);
                } else {
                    logDebug(`Skipping invalid story: ${JSON.stringify(story)}`);
                }
            });

            if (storyList.children.length === 0) {
                storyList.innerHTML = "<li>No stories available.</li>";
            }
        })
        .catch(error => {
            logDebug(`Error loading archive: ${error.message}`);
        });
});

// Function to load a story when clicked
function loadStory(title, date, content) {
    document.body.innerHTML = `
        <h1>${title}</h1>
        <p><strong>Date:</strong> ${date}</p>
        ${content}
        <button onclick="window.location.href='archive.html'">Back to Archive</button>
    `;
}
