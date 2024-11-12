
function showPatientData(patientId) {
    const patients = document.querySelectorAll('.patient-data');
    patients.forEach(patient => {
        patient.classList.remove('active');
    });
    document.getElementById(patientId).classList.add('active');

    const tabs = document.querySelectorAll('.patient-tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    const activeTab = Array.from(tabs).find(tab => tab.textContent.trim().toLowerCase() === document.getElementById(patientId).querySelector('h2').textContent.trim().toLowerCase());
    activeTab.classList.add('active');
}


const items = document.querySelectorAll(".list-unstyled .patient-tab");

items.forEach(item => {
    item.addEventListener("click", () => {
        items.forEach(i => i.classList.remove("activeli", "bg-light"));

        item.classList.add("activeli");
    });
});




const items2 = document.querySelectorAll(".lab_list ul li");

items2.forEach(item => {
    item.addEventListener("click", () => {
        items2.forEach(i => i.classList.remove("greyLi", "bg-white"));

        item.classList.add("greyLi");
    });
});

const items3 = document.querySelectorAll(".nav_list ul li");

items3.forEach(item => {
    item.addEventListener("click", () => {
        items3.forEach(i => i.classList.remove("bg_green", "bg-white"));

        item.classList.add("bg_green");
    });
});








// ==========================================Fetching API =============================================================

const apiURL = 'https://fedskillstest.coalitiontechnologies.workers.dev';
const authString = btoa("coalition:skills-test");

let bloodPressureChart; 

async function fetchData() {
    try {
        const response = await fetch(apiURL, {
            headers: {
                'Authorization': `Basic ${authString}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const user = data[0];
        const diagnosisHistory = user.diagnosis_history;

        const marchData = diagnosisHistory.find(entry => entry.month === "March" && entry.year === 2024);
        const diagnosticList = user.diagnostic_list; 
        const labResults = user.lab_results; 

        const labResultsList = document.querySelector(" .lab_list ul"); 



        labResultsList.innerHTML = '';

        labResults.forEach((result) => {
            const listItem = document.createElement("li");
            const div = document.createElement("div");
            div.className = "li_info";

            const span = document.createElement("span");
            span.innerText = result;

            const button = document.createElement("button");
            const icon = document.createElement("i");
            icon.className = "fa-solid fa-download";

            button.appendChild(icon);
            div.appendChild(span);
            div.appendChild(button);
            listItem.appendChild(div);

            labResultsList.appendChild(listItem);
        });





        const profilePicture = user.profile_picture;
        const userName = user.name;
        const userGender = user.gender;
        const userAge = user.age;
        const phoneNumber = user.phone_number;
        const emergencyContact = user.emergency_contact;
        const insuranceType = user.insurance_type;
        const DOB = user.date_of_birth;

        const labels = diagnosisHistory.map(entry => `${entry.month}, ${entry.year}`);
        const systolicData = diagnosisHistory.map(entry => entry.blood_pressure.systolic.value);
        const systolicLevels = diagnosisHistory.map(entry => entry.blood_pressure.systolic.levels);

        const diastolicData = diagnosisHistory.map(entry => entry.blood_pressure.diastolic.value);
        const diastolicLevels = diagnosisHistory.map(entry => entry.blood_pressure.diastolic.levels);

        const singleSystoliValue = diagnosisHistory.map(entry => entry.blood_pressure.systolic.value);

        const diseaseNames = diagnosticList.map(diagnostic => diagnostic.name);
        const diseaseDescriptions = diagnosticList.map(diagnostic => diagnostic.description);
        const diseaseStatuses = diagnosticList.map(diagnostic => diagnostic.status);

        console.log(diseaseNames);
        console.log(diseaseDescriptions); 
        console.log(diseaseStatuses); 










        const SinglesystolicValue = marchData.blood_pressure.systolic.value;
        const SinglesystolicLevel = marchData.blood_pressure.systolic.levels;
        const SinglediastolicValue = marchData.blood_pressure.diastolic.value;
        const SinglediastolicLevel = marchData.blood_pressure.diastolic.levels;

        const SingleheartRate = marchData.heart_rate.value;
        const SingleheartLevels = marchData.heart_rate.levels;

        const SinglerespiratoryRate = marchData.respiratory_rate.value;
        const Singlerespiratorylevels = marchData.respiratory_rate.levels;

        const Singletemperature = marchData.temperature.value;
        const Singletemperaturelevels = marchData.temperature.levels;






        updateUI(profilePicture, userName, userGender, userAge, phoneNumber, emergencyContact, insuranceType, DOB, labels, systolicData, diastolicData, diastolicLevels, systolicLevels, Singletemperature, SinglerespiratoryRate, SingleheartRate, SinglediastolicLevel, SinglediastolicValue, SinglesystolicLevel, SinglesystolicValue, Singletemperaturelevels, Singlerespiratorylevels, SingleheartLevels, diseaseNames, diseaseDescriptions, diseaseStatuses);

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

fetchData();

function updateUI(profilePicture, userName, userGender, userAge, phoneNumber, emergencyContact, insuranceType, DOB, labels, systolicData, diastolicData, diastolicLevels, systolicLevels, Singletemperature, SinglerespiratoryRate, SingleheartRate, SinglediastolicLevel, SinglediastolicValue, SinglesystolicLevel, SinglesystolicValue, Singletemperaturelevels, Singlerespiratorylevels, SingleheartLevels, diseaseNames, diseaseDescriptions, diseaseStatuses) {
    const profileImages = document.querySelectorAll(".pt_Img");
    profileImages.forEach((img) => {
        img.src = profilePicture;
    });

    const nameElements = document.querySelectorAll(".pt_name ");
    nameElements.forEach((nameElement) => {
        nameElement.innerText = userName;
    });

    const gendersElements = document.querySelectorAll(".pt_gender ");
    gendersElements.forEach((gendersElements) => {
        gendersElements.innerText = userGender;
    });







    const ageElements = document.querySelectorAll(".pt_age ");
    ageElements.forEach((ageElements) => {
        ageElements.innerText = userAge;
    });

    const phoneNumberElements = document.querySelectorAll(".pt_phone ");
    phoneNumberElements.forEach((phoneNumberElements) => {
        phoneNumberElements.innerText = phoneNumber;
    });
    const emergencyContactElements = document.querySelectorAll(".pt_emergency_phone ");
    emergencyContactElements.forEach((emergencyContactElements) => {
        emergencyContactElements.innerText = emergencyContact;
    });

    const insuranceTypeElements = document.querySelectorAll(".pt_insurrance ");
    insuranceTypeElements.forEach((insuranceTypeElements) => {
        insuranceTypeElements.innerText = insuranceType;
    });
    const DOBElements = document.querySelectorAll(".pt_DOB ");
    DOBElements.forEach((DOBElements) => {
        DOBElements.innerText = DOB;
    });


    const systolicDataElements = document.querySelectorAll(".pt_systolicData ");
    systolicDataElements.forEach((systolicDataElements) => {
        systolicDataElements.innerText = SinglesystolicValue;
    });

    const diastolicDataElements = document.querySelectorAll(".pt_diastolicData ");
    diastolicDataElements.forEach((diastolicDataElements) => {
        diastolicDataElements.innerText = SinglediastolicValue;
    });

    const systolicLevelsElements = document.querySelectorAll(".pt_systolicLevels ");
    systolicLevelsElements.forEach((systolicLevelsElements) => {
        systolicLevelsElements.innerText = SinglesystolicLevel;
    });

    const diastolicLevelsElements = document.querySelectorAll(".pt_diastolicLevels ");
    diastolicLevelsElements.forEach((diastolicLevelsElements) => {
        diastolicLevelsElements.innerText = SinglediastolicLevel;
    });



    const SingleheartRateElements = document.querySelectorAll(".pt_SingleheartRate ");
    SingleheartRateElements.forEach((SingleheartRateElements) => {
        SingleheartRateElements.innerText = SingleheartRate;
    });


    const SingletemperatureElements = document.querySelectorAll(".pt_Singletemperature ");
    SingletemperatureElements.forEach((SingletemperatureElements) => {
        SingletemperatureElements.innerText = Singletemperature;
    });

    const SinglerespiratoryRateElements = document.querySelectorAll(".pt_SinglerespiratoryRate ");
    SinglerespiratoryRateElements.forEach((SinglerespiratoryRateElements) => {
        SinglerespiratoryRateElements.innerText = SinglerespiratoryRate;
    });

    const SingleheartLevelsElements = document.querySelectorAll(".pt_SingleheartLevels ");
    SingleheartLevelsElements.forEach((SingleheartLevelsElements) => {
        SingleheartLevelsElements.innerText = SingleheartLevels;
    });

    const SinglerespiratorylevelsElements = document.querySelectorAll(".pt_Singlerespiratorylevels ");
    SinglerespiratorylevelsElements.forEach((SinglerespiratorylevelsElements) => {
        SinglerespiratorylevelsElements.innerText = Singlerespiratorylevels;
    });


    const SingletemperaturelevelsElements = document.querySelectorAll(".pt_Singletemperaturelevels ");
    SingletemperaturelevelsElements.forEach((SingletemperaturelevelsElements) => {
        SingletemperaturelevelsElements.innerText = Singletemperaturelevels;
    });




    const labelsElements = document.querySelectorAll(".pt_labels ");
    labelsElements.forEach((labelsElements) => {
        labelsElements.innerText = labels;
    });



    const diseaseTableBody = document.querySelector(".pt_diseaseNamesTableBody");

    diseaseTableBody.innerHTML = '';

    diseaseNames.forEach((disease, index) => {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.innerText = disease; 
        const descriptionCell = document.createElement("td");
        descriptionCell.innerText = diseaseDescriptions[index]; 

        const statusCell = document.createElement("td");
        statusCell.innerText = diseaseStatuses[index]; 

        row.appendChild(nameCell);       
        row.appendChild(descriptionCell); 
        row.appendChild(statusCell);      
        diseaseTableBody.appendChild(row); 
    });










    const ctx = document.getElementById('bloodPressureChart').getContext('2d');

    if (bloodPressureChart) {
        bloodPressureChart.destroy(); 
    }

    bloodPressureChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Systolic',
                    data: systolicData,
                    borderColor: '#C980BE',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    fill: false,
                    tension: 0.4,
                    pointBackgroundColor: '#E66FD2',
                    borderWidth: 2,
                },
                {
                    label: 'Diastolic',
                    data: diastolicData,
                    borderColor: '#8B7BB4',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    fill: false,
                    tension: 0.4,
                    pointBackgroundColor: '#8C6FE6',
                    borderWidth: 2,
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                    ,
                    ticks: {
                        font: {
                            size: 10 
                        },

                    }
                },
                y: {
                    beginAtZero: false,
                    min: 60,
                    max: 180,
                    ticks: {
                        stepSize: 20,
                        font: {
                            size: 10 
                        },
                    }
                }
            }
        }
    });



}


