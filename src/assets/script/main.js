const HOST = document.querySelector('body').dataset.host

var digital = new Date();
digital.setHours(10,44,54);

const windowOnload = window.onload = () => {
    clock();
    date();
    loadData();
    loadPrevision();
};

window.onload = windowOnload;

document.getElementById("btn-send-data").addEventListener('click', sendData);

function clock() {
    var hours = digital.getHours();
    var minutes = digital.getMinutes();
    var seconds = digital.getSeconds();

    digital.setSeconds(seconds + 1);

    if (minutes <= 9) minutes = "0" + minutes;
    if (seconds <= 9) seconds = "0" + seconds;

    dispTime = "Hor&aacute;rio Servidor: <a>" + hours + ":" + minutes + ":" + seconds + "</a>";
    document.getElementById("clock").innerHTML = dispTime;
    
    setTimeout("clock()", 1000);
}

function date() {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let hours = date.getHours();
    let minutes = date.getMinutes();

    if (day <= 9) day = "0" + day;
    if (month <= 9) month = "0" + month;

    let currentDate = `${day}/${month}/${year} ${hours}:${minutes}`;

    document.getElementById("date").innerHTML = currentDate;
}

function loadData() {
    axios.get(`${HOST}/rentalcompany/commissions`).then(function (response) {
        response.data.forEach(element => {
            buildTableItem(element)
        });
    })
    .catch(function (error) {
        console.log(error);
    });
}

function buildTableItem(element) {
    let table = document.getElementById('table-content');

    let row = table.insertRow();

    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);

    cell1.innerHTML = element.rental_company;
    cell2.innerHTML = element.country;

    cell3.innerHTML = `
        <input class="input-margem" type="text" name="input-margem" value="${element.current_commission}" data-sugestao="${element.suggestion_commission}"/>
        <br>
        <span>Comissão sugerida: ${element.suggestion_commission}%</span>
    `;

    if (element.is_automatic) {
        cell4.innerHTML = `<input class="input-automatico" type="checkbox" name="input-automatico" checked/>`
    } else {
        cell4.innerHTML = `<input class="input-automatico" type="checkbox" name="input-automatico"/>`
    }

    row.dataset.id = element.id;

    if ((table.rows.length % 2) == 0) {
        row.classList.add("odd");
    } else {
        row.classList.add("even");
    }
}

function sendData() {
    const button = document.getElementById("btn-send-data")

    let table = document.getElementById('table-content');

    if (table.rows.length == 0) {
        return
    }

    let data = []

    for (let item of table.rows) {
        let obj = {} 

        let cell1 = item.cells[0]
        let cell2 = item.cells[1]
        let cell3 = item.cells[2]
        let cell4 = item.cells[3]

        let input = cell3.querySelector('input')
        let checkbox = cell4.querySelector('input')

        obj.country = cell2.textContent
        obj.current_commission = input.value
        obj.id = item.dataset.id
        
        if (checkbox.checked) {
            obj.is_automatic = 1
        } else {
            obj.is_automatic = 0
        }

        obj.rental_company = cell1.textContent
        obj.suggestion_commission = input.dataset.sugestao

        data.push(obj)
    }

    button.disabled = true

    axios.put(`${HOST}/rentalcompany/commissions`, data).then(function (response) {
        // console.log(response)
    })
    .catch(function (error) {
        console.log(error);
    })
    .finally(function () {
        button.disabled = false

        var myToast = Toastify({
            text: "Alterações aplicadas com sucesso.",
            duration: 5000
        })

        myToast.showToast();

        loadPrevision()
    });
}

function loadPrevision() {
    axios.get(`${HOST}/rentalcompany/commissions/prevision`).then(function (response) {
        loadChart(response.data);
    })
    .catch(function (error) {
        console.log(error);
    });
}

function getValue(prevision, key) {
    let value = 300

    try {
        value = Math.ceil(prevision)
    } catch (e) {}

    if (isNaN(value)) {
        value = 300
    }
    if (value < 0) {
        value = 300
    }

    return value
}

function loadChart(data) {
    let seriesData = []
    let categoriesData = []

    let sugestao = []
    let margem = []
    
    data.forEach(function (element) {
        categoriesData.push(`${element.rental_company} - ${element.country}`)
        sugestao.push(getValue(element.automatic))
        margem.push(getValue(element.manual))
    });
    
    seriesData.push({
        name: "Automático",
        data: sugestao,
    })

    seriesData.push({
        name: "Manual",
        data: margem,
    })

    var chart = Highcharts.chart('grafico', {
        chart: {
            type: 'bar',
            animation: {
                duration: 500
            },
            marginRight: 50
        },
        title: {
            text: 'Conversão Listar/Configurar (Automático X Manual)',
            align: 'center'
        },
        legend: {
            enabled: false
        },
        xAxis: {
            categories: categoriesData,
        },
        yAxis: {
            opposite: true,
            tickPixelInterval: 150,
            title: {
                text: 'Quantidade de Reservas',
                align: 'high'
            },
        },
        plotOptions: {
            bar: {
                borderRadius: '10%',
                dataLabels: {
                    enabled: true
                },
                groupPadding: 0.1
            }
        },
        series: seriesData
    });
}