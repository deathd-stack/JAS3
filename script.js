document.getElementById("fileInput").addEventListener("change", function (event) {

    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {

        const text = e.target.result;
        const lines = text.split("\n");

        const groupsDiv = document.getElementById("groups");
        groupsDiv.innerHTML = "";

        const groups = {};

        lines.forEach(line => {

            const parts = line.split(",");

            if (parts.length < 3) return;

            const groupName = parts[0].trim();
            const flight = parts[1].trim();
            const time = parts[2].trim();

            if (!groups[groupName]) {
                groups[groupName] = [];
            }

            groups[groupName].push({ flight, time });

        });

        for (let group in groups) {

            const title = document.createElement("div");
            title.className = "group-title";
            title.innerText = group;
            groupsDiv.appendChild(title);

            groups[group].forEach(item => {

                const card = document.createElement("div");
                card.className = "flight-card";
                card.innerHTML = `
                    <div><strong>${item.flight}</strong></div>
                    <div>${item.time}</div>
                `;

                card.addEventListener("click", function () {
                    card.classList.toggle("selected");
                });

                groupsDiv.appendChild(card);

            });
        }
    };

    reader.readAsText(file);
});
