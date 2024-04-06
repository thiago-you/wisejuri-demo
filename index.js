const express = require('express');

const bodyParser = require('body-parser')
const path = require('path') ; 
const app = express();

app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.engine('html', require('ejs').renderFile);

const PORT = 3000;

updatePrevision(data)

// environment external host
var host = process.argv[2] || ''

if (!host.includes('http')) {
    host = ''
}

app.get('/', (req, res) => {
    res.render(__dirname + '/src/index.html', { host: host });
});

app.get('/login', (req, res) => {
    res.render('/login.html', { host: host });
});

app.get('/dashboard', (req, res) => {
    res.render(__dirname + '/src/dashboard.html', { host: host });
});

app.get("/image/favicon.ico", (req, res) => {
    return res.sendFile(path.join(__dirname + "/src/assets/image/favicon.ico"));
});

app.get("/image/header-bg.png", (req, res) => {
    return res.sendFile(path.join(__dirname + "/src/assets/image/header-bg.png"));
});

app.get("/image/image-1.jpg", (req, res) => {
    return res.sendFile(path.join(__dirname + "/src/assets/image/image-1.jpg"));
});

app.get("/image/login-form-bg.jpg", (req, res) => {
    return res.sendFile(path.join(__dirname + "/src/assets/image/login-form-bg.jpg"));
});

app.get("/image/ui-bg_gloss-wave_55_5c9ccc_500x100.png", (req, res) => {
    return res.sendFile(path.join(__dirname + "/src/assets/image/ui-bg_gloss-wave_55_5c9ccc_500x100.png"));
});

app.get("/image/ui-icons_469bdd_256x240.png", (req, res) => {
    return res.sendFile(path.join(__dirname + "/src/assets/image/ui-icons_469bdd_256x240.png"));
});

app.get("/image/ui-bg_glass_85_dfeffc_1x400.png", (req, res) => {
    return res.sendFile(path.join(__dirname + "/src/assets/image/ui-bg_glass_85_dfeffc_1x400.png"));
});

app.get("/image/wisejuri-icon.svg", (req, res) => {
    return res.sendFile(path.join(__dirname + "/src/assets/image/wisejuri-icon.svg"));
});

app.get("/css/custom.css", (req, res) => {
    return res.sendFile(path.join(__dirname + "/src/assets/style/custom.css"));
});

app.get("/css/reset.css", (req, res) => {
    return res.sendFile(path.join(__dirname + "/src/assets/style/reset.css"));
});

app.get("/css/general.css", (req, res) => {
    return res.sendFile(path.join(__dirname + "/src/assets/style/general.css"));
});

app.get("/css/ui.css", (req, res) => {
    return res.sendFile(path.join(__dirname + "/src/assets/style/ui.css"));
});

app.get("/css/forms.css", (req, res) => {
    return res.sendFile(path.join(__dirname + "/src/assets/style/forms.css"));
});

app.get("/css/table_ui.css", (req, res) => {
    return res.sendFile(path.join(__dirname + "/src/assets/style/table_ui.css"));
});

app.get("/css/jquery-ui-1.8.7.custom.css", (req, res) => {
    return res.sendFile(path.join(__dirname + "/src/assets/style/jquery-ui-1.8.7.custom.css"));
});

app.get("/js/main.js", (req, res) => {
    return res.sendFile(path.join(__dirname + "/src/assets/script/main.js"));
});

app.get("/rentalcompany/commissions", (req, res) => {
    res.send(JSON.stringify(data));
})

app.put("/rentalcompany/commissions", (req, res) => {
    updatePrevision(req.body)
    res.send();
})

app.get("/rentalcompany/commissions/prevision", (req, res) => {
    res.send(JSON.stringify(prevision));
})

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});

app.get("/css/wisejuri-index.css", (req, res) => {
    return res.sendFile(path.join(__dirname + "/src/assets/style/wisejuri-index.css"));
});

app.get("/css/wisejuri-index.css", (req, res) => {
    return res.sendFile(path.join(__dirname + "/src/assets/style/wisejuri-index.css"));
});

function updatePrevision(data) {
    data.forEach(element => {
        let item = prevision.filter(it => it.rental_company == element.rental_company && it.country == element.country)[0];    

        if (item != null && item != undefined) {
            if (item._manual == undefined) {
                item._manual = item.manual
            }
            if (item._automatic == undefined) {
                item._automatic = item.automatic
            }

            item.manual = item._manual - Math.ceil(element.current_commission * 1.7)
            item.automatic = item._automatic - Math.ceil(element.suggestion_commission * 1.7)
        }
    });
}

// export the Express API
module.exports = app