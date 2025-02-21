document.addEventListener("DOMContentLoaded", function() {
    fetch("stories.json")
        .then(response => response.json())
        .then(data => {
            const storyList = document.getElementById("story-list");
            Object.keys(data).reverse().forEach(date => {
                let listItem = document.createElement("li");
                listItem.innerHTML = `<a href="#" onclick="loadStory('${date}')">${date}: ${data[date].title}</a>`;
                storyList.appendChild(listItem);
            });
        })
        .catch(error => console.error("Error loading archive:", error));
});

function loadStory(date) {
    fetch("stories.json")
        .then(response => response.json())
        .then(data => {
            const story = data[date] || { title: "No Story Available", content: "No story found for this date." };
            document.body.innerHTML = `<h1>${story.title}</h1><p>${story.content}</p><button onclick="window.location.href='archive.html'">Back to Archive</button>`;
        })
        .catch(error => console.error("Error loading story:", error));
}
