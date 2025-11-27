/* Make SVG buildings clickable */
const svgBuildings = document.querySelectorAll(".map-building");

if (svgBuildings) {
    svgBuildings.forEach(building => {
        building.addEventListener("click", () => {
            const buildingName = building.dataset.building;

            // Store in localStorage for plan.html
            localStorage.setItem("selectedBuilding", buildingName);

            // Redirect user to plan page
            window.location.href = "plan.html";
        });
    });
}



/* Save the selected building from index.html */
const buildingButtons = document.querySelectorAll(".building-btn");

if (buildingButtons) {
    buildingButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Store building in localStorage
            localStorage.setItem("selectedBuilding", btn.dataset.building);

            // Redirect to planning page
            window.location.href = "plan.html";
        });
    });
}

/* ROOM LISTS FOR EACH BUILDING */
const roomDirectory = {
    "Moore Library": ["Room xxx", "Room xxx", "Room xxx"],
    "Fine Arts Center": ["Room xxx", "Music Hall xxx", "Auditorium"],
    "Science Hall": ["Lab xxx", "Room xxx", "Hallnxxx"],
    "Bart Luedeke Center": ["Cavalla Room", "Conference Room"]
};

/* PLAN PAGE LOGIC */
if (window.location.pathname.includes("plan.html")) {
    const buildingInput = document.getElementById("building");
    const roomSelect = document.getElementById("room");

    const storedBuilding = localStorage.getItem("selectedBuilding");
    if (storedBuilding) {
        buildingInput.value = storedBuilding;

        // Populate rooms based on building
        roomDirectory[storedBuilding].forEach(room => {
            const opt = document.createElement("option");
            opt.value = room;
            opt.textContent = room;
            roomSelect.appendChild(opt);
        });
    }

    /* Character counter */
    const notes = document.getElementById("notes");
    const counter = document.getElementById("charCounter");

    notes.addEventListener("input", () => {
        counter.textContent = `${notes.value.length} / 200`;
    });

    /* FORM VALIDATION */
    document.getElementById("planForm").addEventListener("submit", (e) => {
        e.preventDefault();

        const title = document.getElementById("title").value.trim();
        const datetime = document.getElementById("datetime").value;

        let valid = true;

        document.getElementById("titleError").textContent = "";
        document.getElementById("dateError").textContent = "";

        if (!title) {
            document.getElementById("titleError").textContent = "Title is required.";
            valid = false;
        }

        const selectedDate = new Date(datetime);
        if (selectedDate <= new Date()) {
            document.getElementById("dateError").textContent = "Date must be in the future.";
            valid = false;
        }

        if (!valid) return;

        // Save all details for summary
        const reservation = {
            building: storedBuilding,
            room: document.getElementById("room").value,
            title,
            datetime,
            notes: notes.value
        };

        localStorage.setItem("reservationData", JSON.stringify(reservation));

        // Redirect to summary
        window.location.href = "summary.html";
    });
}

/* SUMMARY PAGE */
if (window.location.pathname.includes("summary.html")) {
    const summaryDiv = document.getElementById("summaryContent");
    const data = JSON.parse(localStorage.getItem("reservationData"));

    if (!data) {
        summaryDiv.innerHTML = "<p>No reservation found.</p>";
    } else {
        summaryDiv.innerHTML = 
            <h3>${data.title}</h3>
            <p><strong>Building:</strong> ${data.building}</p>
            <p><strong>Room:</strong> ${data.room}</p>
            <p><strong>Date & Time:</strong> ${new Date(data.datetime).toLocaleString()}</p>
            <p><strong>Notes:</strong> ${data.notes}</p>
            <p style="color:green;font-weight:bold;">Reservation Complete!</p>
         ;
    }
}

/* DARK/LIGHT THEME */
const toggle = document.getElementById("themeToggle");
if (toggle) {
    toggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");
    });
}

<footer>
<p>&copy; 2025 El,Nasir and Dhruv All rights reserved.</p>
</footer>
