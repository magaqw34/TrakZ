
const form = document.getElementById('csvForm');
const fileInput = document.getElementById('csvFile');
const fileTable = document.getElementById('fileTable');
const showTableBtn = document.getElementById('showTableBtn');

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
            console.log('Data stored in arrays: ', { dates, workout, study, sleep });

        };

        reader.readAsText(file);
    } else {
        console.log('No file selected.');
    }
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

// form.addEventListener('submit',function(event){
//     event.preventDefault();

//     const file = fileInput.files[0];
//     if(file){
//         const reader = new FileReader();

//         reader.onload=function(e) {

//             let fileContent = e.target.result;

//             console.log(fileContent);
//             console.log(typeof fileContent);

//             const rows = fileContent.split("\n");
//             fileTable.innerHTML = '';

//             rows.forEach((row,rowIndex)=>{
//                 const rowElement = document.createElement('tr');
//                 const columns = row.split(",");

//                 columns.forEach((column, colIndex) => {
//                     const cellElement = document.createElement(rowIndex === 0 ? 'th' : 'td'); // First row as header
//                     cellElement.textContent = column.trim(); // Remove any extra whitespace
//                     rowElement.appendChild(cellElement); // Append cell to the row
//                 });

//                 fileTable.appendChild(rowElement); // Append row to the table


//             });
//         };
//         reader.readAsText(file);
//     }else {
//         fileContent.textContent = 'No file selected.';
//     }
// }); 
