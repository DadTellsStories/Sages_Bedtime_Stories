
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

            // Helper function to format content by converting newlines to <p> tags
            function formatContent(content) {
                return content.split('\n').map(line => line.trim() ? `<p>${line}</p>` : '').join('');
            }

            // Ensure links load properly by using dataset attributes and an event listener
            data.stories.slice().reverse().forEach((story, index) => {
                if (story.title && story.date && story.content) {
                    let listItem = document.createElement("li");
                    listItem.innerHTML = `<a href="#" id="story-${index}">${story.date}: ${story.title}</a>`;
                    storyList.appendChild(listItem);

                    // Attach click event to each story link
                    document.getElementById(`story-${index}`).addEventListener("click", () => {
                        loadStory(story.title, story.date, formatContent(story.content));
                    });
                } else {
                    logDebug(`Skipping invalid story entry: ${JSON.stringify(story)}`);
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

// Load story content when a link is clicked
function loadStory(title, date, content) {
    document.body.innerHTML = `
        <h1>${title}</h1>
        <p><strong>Date:</strong> ${date}</p>
        ${content}
        <button onclick="window.location.href='archive.html'">Back to Archive</button>
    `;
}
