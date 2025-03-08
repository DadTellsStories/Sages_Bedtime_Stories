
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

            logDebug("Story array contents: " + JSON.stringify(data.stories));

            // Helper function to format content by converting newlines to <p> tags
            function formatContent(content) {
                return content.split('\n').map(line => line.trim() ? `<p>${line}</p>` : '').join('');
            }

            // Iterate over stories array in reverse and display each story with proper formatting
            data.stories.slice().reverse().forEach(story => {
                if (story.title && story.date && story.content) {
                    let listItem = document.createElement("li");
                    listItem.innerHTML = `
                        <h2>${story.title}</h2>
                        <p><strong>Date:</strong> ${story.date}</p>
                        ${formatContent(story.content)}
                        <hr>
                    `;
                    storyList.appendChild(listItem);
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
