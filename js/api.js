const matchesButton = document.querySelector("#matches-button");
const standingsButton = document.querySelector("#standings-button");
const apiData = document.querySelector("#api-data");

const API_KEY = "76086c439596a6afbe6916248385dd6b";

const API_URL = "https://v3.football.api-sports.io/fixtures?league=39&season=2024";

matchesButton.addEventListener("click", () => {
    console.log("Matches button was clicked!");

    fetch(API_URL, {
        method: "GET",
        headers: {
            "x-apisports-key": API_KEY
        }
    })
        .then(response => {
            console.log("Status:", response.status);
            return response.json();
        })
        .then(data => {
            console.log("API Response:", data);
            console.log("Results:", data.results);
            console.log("Response:", data.response);
            console.log("Errors:", data.errors);

            apiData.innerHTML = "<h2>Matches</h2>";

            data.response.forEach(match => {
                const matchElement = document.createElement("p");

                matchElement.textContent =
                    `${match.teams.home.name} vs ${match.teams.away.name}`;

                apiData.appendChild(matchElement);
            });
        })
        .catch(error => {
            console.error("Error fetching matches:", error);
        });
});

standingsButton.addEventListener("click", () => {
    console.log("Standings button was clicked!");

    const standingsURL =
        "https://v3.football.api-sports.io/standings?league=39&season=2024";

    fetch(standingsURL, {
        method: "GET",
        headers: {
            "x-apisports-key": API_KEY
        }
    })
        .then(response => {
            console.log("Status:", response.status);
            return response.json();
        })
        .then(data => {
            console.log("Standings API Response:", data);

            apiData.innerHTML = "<h2>Premier League Standings</h2>";

            const standings = data.response[0].league.standings[0];

            standings.forEach((team, index) => {
                const teamElement = document.createElement("p");

                teamElement.textContent =
                    `${index + 1}. ${team.team.name} - ${team.points} points`;

                apiData.appendChild(teamElement);
            });
        })
        .catch(error => {
            console.error("Error fetching standings:", error);
        });
});