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

      // 7C 또는 HL 항공편 찾기
      const flightMatch = line.match(/(7C\d{3,4}|HL\d{3,4})/g);
      
      // 시간 찾기 (00:00 형식)
      const timeMatch = line.match(/\b\d{2}:\d{2}\b/g);

      if (!flightMatch || !timeMatch) return;

      // 조 번호 찾기 (숫자 + 조)
      let groupMatch = line.match(/\d+조/);
      let groupName = groupMatch ? groupMatch[0] : "기타";

      if (!groups[groupName]) {
        groups[groupName] = [];
      }

      flightMatch.forEach((flight, index) => {
        let time = timeMatch[index] || timeMatch[0];
        groups[groupName].push({ flight, time });
      });

    });

    // 화면에 출력
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

        scheduleDiv.addEventListener("click", function () {
          scheduleDiv.classList.toggle("saved");
        });

        groupDiv.appendChild(scheduleDiv);
      });

      groupsDiv.appendChild(groupDiv);
    }

  };

  reader.readAsText(file);
});
