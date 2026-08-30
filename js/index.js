const body = document.querySelector("body");

const footerElement = document.createElement("footer");

body.appendChild(footerElement);

const today = new Date();
const thisYear = today.getFullYear();

const footer = document.querySelector("footer");

const copyright = document.createElement("p");

copyright.innerHTML = `@ Sergio Ramirez ${thisYear}`;

footer.appendChild(copyright);

const skills = [
    "JavaScript",
    "HTML",
    "CSS",
    "GitHub",
    "Salesforce",
    "Tableau"
];

const skillsSection = document.querySelector("#skills");
const skillsList = skillsSection.querySelector("ul");

for (let i = 0; i < skills.length; i++) {
    const skill = document.createElement("li");
    skill.innerText = skills[i];
    skillsList.appendChild(skill);
}

fetch("https://api.github.com/users/sergiojramirez/repos")
    .then((response) => {
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        const repositories = data;
        console.log(repositories);

        const projectSection = document.querySelector("#projects");
        const projectList = projectSection.querySelector("ul");

        for (let i = 0; i < repositories.length; i++) {
            const project = document.createElement("li");
            project.innerText = repositories[i]["name"];
            projectList.appendChild(project);
        }
    })
    .catch((error) => {
        console.error("There was an error fetching the repositories:", error);

        const projectSection = document.querySelector("#projects");
        const errorMessage = document.createElement("p");

        errorMessage.innerText =
            "Sorry, we were unable to load the projects at this time.";

        projectSection.appendChild(errorMessage);
    });


const messageForm = document.querySelector('[name="leave_message"]');

messageForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const usersName = event.target.usersName.value;
    const usersEmail = event.target.usersEmail.value;
    const usersMessage = event.target.usersMessage.value;

    console.log(usersName, usersEmail, usersMessage);

    const messageSection = document.querySelector('#messages');
    const messageList = messageSection.querySelector('ul');

    const newMessage = document.createElement('li');

    newMessage.innerHTML = `<a href="mailto:${usersEmail}">${usersName}</a>: <span>${usersMessage}</span>`;

    const removeButton = document.createElement('button');

    removeButton.innerText = 'remove';

    removeButton.setAttribute('type', 'button');

    removeButton.addEventListener('click', function() {
        const entry = removeButton.parentNode;
        entry.remove();
    });

    newMessage.appendChild(removeButton);

    messageList.appendChild(newMessage);

    event.target.reset();
});