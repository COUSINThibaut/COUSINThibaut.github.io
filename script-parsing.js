document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    
    // Specify the path to your fixed file
    const filePath = './dispo.txt';

    // Fetch and parse the fixed file
    fetch(filePath)
        .then(response => response.text())
        .then(content => {
            parseAndDisplayContent(content);
        })
        .catch(error => {
            console.error('Error fetching file', error);
            alert('Error fetching file');
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
