
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

            // Iterate over stories array in reverse to show the latest stories first
            data.stories.slice().reverse().forEach(story => {
                if (story.title && story.date && story.content) {
                    let listItem = document.createElement("li");
                    listItem.innerHTML = `<a href="#" onclick="loadStory('${story.title}', '${story.date}', \`${story.content.replace(/`/g, '\`')}\`)">${story.date}: ${story.title}</a>`;
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

function loadStory(title, date, content) {
    document.body.innerHTML = `
        <h1>${title}</h1>
        <p><strong>Date:</strong> ${date}</p>
        <p>${content}</p>
        <button onclick="window.location.href='archive.html'">Back to Archive</button>
    `;
}
