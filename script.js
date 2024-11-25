// Data
const bootcampData = {
    title: "Bootcamp Desarrollo Web",
    weeks: 24,
    stack: [
        {
            type: "Tema",
            name: "Intro al desarrollo web",
            start: 1,
            end: 1,
        },
        {
            type: "Course",
            name: "Desarrollo web principiantes : Microsoft",
            start: 1,
            end: 1,
        },
        {
            type: "Tema",
            name: "Maquetación",
            start: 2,
            end: 4,
        },
        {
            type: "Course",
            name: "html y css: Insignia Digital Google",
            start: 2,
            end: 2,  
        },
        {
            type: "Tema",
            name: "Control de versiones",
            start: 3,
            end: 5,
        },
        {
            type: "Course",
            name: "Certificado: Github",
            start: 3,
            end: 3,  
        },
        {
            type: "Tema",
            name: "Bases de Programación",
            start: 4,
            end: 7,
        },
        {
            type: "Course",
            name: "JS: cisco y JsInstitute",
            start: 4,
            end: 7,
        },
        {
            type: "Tema",
            name: "Peticiones a servidores",
            start: 7,
            end: 10,
        },
        {
            type: "Tema",
            name: "Especialización Frontend",
            start: 11,
            end: 15,
        },
        {
            type: "Course",
            name: "React: Microsoft",
            start:11,
            end: 11,
        },
        {
            type: "Tema",
            name: "Especialización Backend",
            start: 16,
            end: 20,
        },
        {
            type: "Course",
            name: " node:Linuxfundation",
            start:16,
            end: 16,
        },
        {
            type: "Course",
            name: " Express",
            start:17,
            end: 19,
        },
        {
            type: "Proyecto",
            name: "proyecto pedagógico",
            start: 21,
            end: 24,
        },
      
    ]
}

const { weeks, stack } = bootcampData;

//Generate the roadmap on page load
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Generate the roadmap on page load
    generateGantt();
});

// Generate table depending on the number of weeks
function setWeeksValue(weeksNumber) {
    const weeksInput = document.getElementById("weeks");
    weeksInput.setAttribute("value", weeksNumber); 
}

//Generate title
 function setTitle(title) {
    const titleElement = document.getElementById("nav-title");
    const titleDocument = document.querySelector("title");
    titleElement.textContent = title;
    titleDocument.textContent = title;
 }

//Generate the Gantt chart
function generateGantt() {
    setTitle(bootcampData.title);
    setWeeksValue(bootcampData.weeks);
    const weeks = document.getElementById("weeks").value;
    const table = document.getElementById("gantt-table");
    table.innerHTML = ""; 

    let monthHeaderRow = "<tr><th>Meses</th>";
    for (let i = 1; i <= weeks; i += 4) {
        const month = Math.ceil(i / 4);
        let colspan = Math.min(4, weeks - i + 1); 
        monthHeaderRow += `<th colspan="${colspan}">Mes ${month}</th>`;
    }
    monthHeaderRow += "</tr>";
    table.innerHTML += monthHeaderRow;

    let weekHeaderRow = "<tr><th>Elemento</th>";
    for (let i = 1; i <= weeks; i++) {
        weekHeaderRow += `<th>${i}</th>`;
    }
    weekHeaderRow += "</tr>";
    table.innerHTML += weekHeaderRow;

    let lastEnd = 0;

    stack.forEach((item) => {
        let colorClass = "";
        let iconoProject = '<i class="bi bi-briefcase-fill"></i>';
        let iconoTema = '<i class="bi bi-book-fill"></i>';
        let iconoIntegracion = '<i class="bi bi-diagram-3-fill"></i>';
        let iconCertificate = '<i class="bi bi-arrow-return-right"></i><i class="bi bi-bookmark-check"></i>';
        let icon = '';

        if (item.type === "Proyecto") {
            colorClass = "proyecto";
            item.start = item.start ? item.start : lastEnd + 1;
            item.end = item.end ? item.end : item.start + 2;
            icon = iconoProject;
        } else if (item.type === "Tema") {
            colorClass = "tema";
            item.start = item.start ? item.start : lastEnd + 1;
            item.end = item.end ? item.end : item.start + 2;
            icon = iconoTema;
        } else if (item.type === "Transición") {
            colorClass = "transicion";
            item.start = item.start ? item.start : lastEnd + 1;
            item.end = item.end ? item.end : item.start + 2;
            icon = iconoIntegracion;

        }else if (item.type === "Course") {
            colorClass = "certificate-course";
            item.start = item.start ? item.start : lastEnd + 1;
            item.end = item.end ? item.end : item.start + 2;
            icon = iconCertificate;
        }

        lastEnd = item.end;

        let row = `<tr><td class="label ${colorClass}">${icon} ${item.name}</td>`;

        for (let i = 1; i <= weeks; i++) {
            if (i >= item.start && i <= item.end) {
                row += `<td class="block ${colorClass}"></td>`;
            } else {
                row += `<td class="empty"></td>`;
            }
        }

        row += "</tr>";
        table.innerHTML += row;
    });

    table.style.width = `${weeks * 30 + 260}px`; 
}
