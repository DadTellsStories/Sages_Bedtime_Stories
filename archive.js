
document.addEventListener("DOMContentLoaded", function() {
    console.log("Loading archive...");
    fetch("stories.json")
        .then(response => {
            if (!response.ok) throw new Error("Failed to fetch stories.json");
            return response.json();
        })
        .then(data => {
            console.log("Stories loaded:", data);
            const storyList = document.getElementById("story-list");

            if (!data.stories || !Array.isArray(data.stories)) {
                console.error("Invalid stories format:", data);
                alert("Error: Invalid stories format.");
                return;
            }

            // Iterate over stories array in reverse to show the latest stories first
            data.stories.slice().reverse().forEach(story => {
                if (story.title && story.date && story.content) {
                    let listItem = document.createElement("li");
                    listItem.innerHTML = `<a href="#" onclick="loadStory('${story.title}', '${story.date}', \`${story.content.replace(/`/g, '\`')}\`)">${story.date}: ${story.title}</a>`;
                    storyList.appendChild(listItem);
                } else {
                    console.warn("Skipping invalid story entry:", story);
                }
            });

            if (storyList.children.length === 0) {
                storyList.innerHTML = "<li>No stories available.</li>";
            }
        })
        .catch(error => {
            console.error("Error loading archive:", error);
            alert("Error loading archive. Check console for details.");
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
