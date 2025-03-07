
document.addEventListener("DOMContentLoaded", function() {
    fetch("stories.json")
        .then(response => response.json())
        .then(data => {
            const storyList = document.getElementById("story-list");

            // Iterate over stories array in reverse to show the latest stories first
            data.stories.slice().reverse().forEach(story => {
                let listItem = document.createElement("li");
                listItem.innerHTML = `<a href="#" onclick="loadStory('${story.title}', '${story.date}', \`${story.content.replace(/`/g, '\`')}\`)">${story.date}: ${story.title}</a>`;
                storyList.appendChild(listItem);
            });
        })
        .catch(error => console.error("Error loading archive:", error));
});

function loadStory(title, date, content) {
    document.body.innerHTML = `
        <h1>${title}</h1>
        <p><strong>Date:</strong> ${date}</p>
        <p>${content}</p>
        <button onclick="window.location.href='archive.html'">Back to Archive</button>
    `;
}
