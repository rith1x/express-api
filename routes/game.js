import express from 'express';
import fs, { write } from 'fs';

const router = express.Router();

router.use(express.json());
function generateNewId() {
    const data = parseData();
    const ids = Object.keys(data);
    let chars = '0123456789';
    // console.log(ids)
    let newId = 'GX'
    while (newId.length < 8 && !ids.includes(newId)) {
        newId += chars[Math.floor(Math.random() * chars.length)]
    }
    return newId
}


function parseData() {
    try {
        const data = fs.readFileSync('./routes/playerData.json', 'utf8');
        return JSON.parse(data);
    } catch (e) {
        return {};
    }
}



function writeData(id, data) {
    try {
        let parsed = parseData();
        console.log("Parsed Data before writing:", parsed); // Log current data

        parsed[id] = data; // Add new data
        console.log("Parsed Data after adding new entry:", parsed); // Log after adding

        fs.writeFileSync('./routes/playerData.json', JSON.stringify(parsed, null, 2));
        return true;
    } catch (e) {
        console.error("Error writing data:", e); // Log the error
        return false;
    }
}


function getDate() {
    let now = new Date()
    const options = {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    };
    return now.toLocaleString('en-GB', options).replace(',', '');
}

router.get('/', (rq, rs) => {
    rs.json({ service: "game" })
})

router.get('/check/:user', (rq, rs) => {
    let un = rq.params.user
    let data = parseData()

    for (let user in data) {
        if (data[user].details.username == un) {
            rs.json({ msg: "Username already taken" })
            return
        }
    }
    rs.json({ msg: "Available" })
})

router.post('/new', (rq, rs) => {
    let id = generateNewId()
    let dx = rq.body
    console.log(dx)
    let data = {
        "details": {
            "name": dx.name,
            "joined_date": getDate(),
            "img": dx.img,
            "id": id,
            "username": dx.username
        },
        "games": {
        },
        "gems": []
    }
    if (writeData(id, data)) {
        return rs.json({ status: "success", data: data, id: id })
    }

    rs.json({ status: "failed" })

})
router.get('/get/:id', (rq, rs) => {
    let id = rq.params.id
    let parsed = parseData()
    rs.json(parsed[id])
})
router.get('/update/:id/:game/:score', (rq, rs) => {
    let id = rq.params.id;
    let game = rq.params.game;
    let score = rq.params.score;
    let parsed = parseData();
    let userData = parsed[id]; // Fetch user data with `id` as a key
    console.log("Received:", id, "| Game:", game, "| Score:", score);
    console.log("User Data:", userData);
    if (userData == undefined) {
        rs.json({ msg: "USER IS NOT REGISTERED" })
    } else {
        if (!userData.games[game]) {
            userData.games[game] = {};
        }
        let now = getDate()
        userData.games[game][now] = parseInt(score)
        console.log("Updated data : " + userData)
        writeData(id, userData)
        rs.json({ msg: "DATA UPDATED SUCCESSFULLY" })

    }


});




export default router