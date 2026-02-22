document.getElementById("fileInput").addEventListener("change", function(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function(e) {
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
      const groupDiv = document.createElement("div");
      groupDiv.className = "group";

      const title = document.createElement("h3");
      title.textContent = group;
      groupDiv.appendChild(title);

      groups[group].forEach(item => {
        const scheduleDiv = document.createElement("div");
        scheduleDiv.className = "schedule";
        scheduleDiv.textContent = item.flight + " / " + item.time;

        scheduleDiv.addEventListener("click", function() {
          scheduleDiv.classList.toggle("saved");
        });

        groupDiv.appendChild(scheduleDiv);
      });

      groupsDiv.appendChild(groupDiv);
    }
  };

  reader.readAsText(file);
});
