document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    
    document.getElementById('fileInput').addEventListener('change', function(event) {
        const file = event.target.files[0];
        
        if (file) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                const content = e.target.result;
                parseAndDisplayContent(content);
            };
            
            reader.onerror = function(e) {
                console.error("Error reading file", e);
                alert("Error reading file");
            };
            
            reader.readAsText(file);
        } else {
            alert('No file selected');
        }
    });
});

function parseAndDisplayContent(content) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = ''; // Clear previous content

    const lines = content.split('\n');
    let currentYear = '';
    let currentMonth = '';
    let yearDiv = null;
    let monthDiv = null;

    lines.forEach(line => {
        line = line.trim();
        if (!line) return;

        if (line.match(/^\d{4}$/)) {
            // Year
            currentYear = line;
            
            // Create a new div for the year
            yearDiv = document.createElement('div');
            yearDiv.classList.add('year');
            yearDiv.innerHTML = `<h2>${currentYear}</h2>`;
            contentDiv.appendChild(yearDiv);
        } else if (line.match(/^[a-zA-Z]{3}$/)) {
            // Month
            currentMonth = line;
            
            // Create a new div for the month
            monthDiv = document.createElement('div');
            monthDiv.classList.add('month');
            monthDiv.innerHTML = `<h3>${currentMonth}</h3>`;
            yearDiv.appendChild(monthDiv);
        } else if (line.match(/^\d{1,2} [*|-]$/)) {
            // Day and availability
            const dayParts = line.split(' ');
            const day = dayParts[0];
            const availability = dayParts[1];

            const dayDiv = document.createElement('div');
            dayDiv.classList.add('day');
            dayDiv.classList.add(availability === '*' ? 'occupied' : 'available');
            dayDiv.textContent = day;
            monthDiv.appendChild(dayDiv);
        }
    });
}
