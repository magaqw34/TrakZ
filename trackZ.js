
const form = document.getElementById('csvForm');
const fileInput = document.getElementById('csvFile');
const fileTable = document.getElementById('fileTable');
const showTableBtn = document.getElementById('showTableBtn');
const showChartBtn = document.getElementById('showChartBtn');

// Arrays

let dates = [];
let workout = [];
let study = [];
let sleep = [];


form.addEventListener('submit',function(event){
    event.preventDefault();

    const file = fileInput.files[0];
    if(file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            let fileContent = e.target.result;
            const rows=fileContent.split("\n");

            // Clear existing arrays
            dates = [];
            workout = [];
            study = [];
            sleep = [];

            rows.forEach((row,rowIndex)=>{
                const columns = row.split(",");

                if(rowIndex===0) return;

                if (columns.length >= 4) {
                    dates.push(columns[0].trim());
                    workout.push(columns[1].trim());
                    study.push(columns[2].trim());
                    sleep.push(columns[3].trim());
                }
            });
            showTableBtn.style.display = 'inline';
            showChartBtn.style.display = 'inline';
            console.log('Data stored in arrays: ', { dates, workout, study, sleep });

        };

        reader.readAsText(file);
    } else {
        console.log('No file selected.');
    }
});

showTableBtn.addEventListener('click', function() {
    chatrSecn.style.display = 'block';
    createBarChart();
    createLineChart();
    createContributionGrid('workoutGrid', workout);
    createContributionGrid('studyGrid', study);
    createContributionGrid('sleepGrid', sleep);
});

showTableBtn.addEventListener('click',function(){
    fileTable.innerHTML = '';
    document.getElementById("showTableText").style.display = 'inline';
    const headerRow = document.createElement('tr');
    const headers = ['Date', 'Workout', 'Study', 'Sleep'];
    headers.forEach(header=>{
        const th = document.createElement('th');
        th.textContent=header;
        headerRow.appendChild(th);
    });
    fileTable.appendChild(headerRow);
    for(let i =0;i<dates.length;i++){
        const rowElement = document.createElement('tr');

        const dateCell = document.createElement('td');
        dateCell.textContent = dates[i];
        rowElement.appendChild(dateCell);

        const workoutCell = document.createElement('td');
        workoutCell.textContent = workout[i];
        rowElement.appendChild(workoutCell);

        const studyCell = document.createElement('td');
        studyCell.textContent = study[i];
        rowElement.appendChild(studyCell);

        const sleepCell = document.createElement('td');
        sleepCell.textContent = sleep[i];
        rowElement.appendChild(sleepCell);

        fileTable.appendChild(rowElement); // Add row to the table
    }
});
function createBarChart() {
    const ctx = document.getElementById('barChart').getContext('2d');
    const barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: dates, // x-axis (days)
            datasets: [
                {
                    label: 'Workout (hrs)',
                    data: workout,
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Study (hrs)',
                    data: study,
                    backgroundColor: 'rgba(153, 102, 255, 0.5)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Sleep (hrs)',
                    data: sleep,
                    backgroundColor: 'rgba(255, 159, 64, 0.5)',
                    borderColor: 'rgba(255, 159, 64, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Create a line chart for workout, study, and sleep
function createLineChart() {
    const ctx = document.getElementById('lineChart').getContext('2d');
    const lineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [
                {
                    label: 'Workout (hrs)',
                    data: workout,
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    fill: false
                },
                {
                    label: 'Study (hrs)',
                    data: study,
                    backgroundColor: 'rgba(153, 102, 255, 0.5)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    fill: false
                },
                {
                    label: 'Sleep (hrs)',
                    data: sleep,
                    backgroundColor: 'rgba(255, 159, 64, 0.5)',
                    borderColor: 'rgba(255, 159, 64, 1)',
                    fill: false
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Create a contribution grid for each activity
function createContributionGrid(gridId, data) {
    const grid = document.getElementById(gridId);
    grid.innerHTML = ''; // Clear existing grid

    const maxValue = Math.max(...data); // Get the max value to normalize colors

    data.forEach((value, index) => {
        const dayBox = document.createElement('div');
        
        // Set background color based on value intensity (light to dark green)
        const intensity = value / maxValue;
        dayBox.style.backgroundColor = `rgba(0, 128, 0, ${intensity})`;

        // Append box to grid
        grid.appendChild(dayBox);
    });
}
