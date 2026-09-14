const matchesButton = document.querySelector("#matches-button");
const standingsButton = document.querySelector("#standings-button");
const apiData = document.querySelector("#api-data");

const API_KEY = "76086c439596a6afbe6916248385dd6b";

const matchesURL =
    "https://v3.football.api-sports.io/fixtures?league=39&season=2024";

const standingsURL =
    "https://v3.football.api-sports.io/standings?league=39&season=2024";

matchesButton.addEventListener("click", () => {
    apiData.innerHTML = "<h2>Matches</h2><p>Loading matches...</p>";

// Fetch matches data from the API
    fetch(matchesURL, {
        method: "GET",
        headers: {
            "x-apisports-key": API_KEY
        }
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Matches request failed: ${response.status}`);
            }

            return response.json();
        })
        .then((data) => {
            if (!data.response || data.response.length === 0) {
                apiData.innerHTML =
                    "<h2>Matches</h2><p>No matches were found.</p>";
                return;
            }

            apiData.innerHTML = "<h2>Matches</h2>";

            data.response.forEach((match) => {
                const matchElement = document.createElement("p");

                matchElement.textContent =
                    `${match.teams.home.name} vs ${match.teams.away.name}`;

                apiData.appendChild(matchElement);
            });
        })
        .catch((error) => {
            console.error("Error fetching matches:", error);

            apiData.innerHTML =
                "<h2>Matches</h2><p>Unable to load matches. Please try again.</p>";
        });
});

// Standings button click event
standingsButton.addEventListener("click", () => {
    apiData.innerHTML =
        "<h2>Premier League Standings</h2><p>Loading standings...</p>";

    fetch(standingsURL, {
        method: "GET",
        headers: {
            "x-apisports-key": API_KEY
        }
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Standings request failed: ${response.status}`);
            }

            return response.json();
        })
        .then((data) => {
            if (
                !data.response ||
                data.response.length === 0 ||
                !data.response[0].league.standings
            ) {
                apiData.innerHTML =
                    "<h2>Premier League Standings</h2><p>No standings were found.</p>";
                return;
            }

            const standings = data.response[0].league.standings[0];

            apiData.innerHTML = "<h2>Premier League Standings</h2>";

            standings.forEach((team, index) => {
                const teamElement = document.createElement("p");

                teamElement.textContent =
                    `${index + 1}. ${team.team.name} - ${team.points} points`;

                apiData.appendChild(teamElement);
            });
        })
        .catch((error) => {
            console.error("Error fetching standings:", error);

            apiData.innerHTML =
                "<h2>Premier League Standings</h2><p>Unable to load standings. Please try again.</p>";
        });
});