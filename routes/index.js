var express = require('express');
var router = express.Router();
const uuid = require("uuid");

const PUBLIC_URL = "https://emsp.heroku.com";
const TOKEN_B = uuid.v4();
console.log("Auth TOKEN_B = " + TOKEN_B);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', TOKEN_B : TOKEN_B });
});

const authorize = (req, res, next) => {
	// if (req.headers.authorization !== `token ${TOKEN_B}`) {
	// 	return res.status(401).send({
	// 		status_code: 2001,
	// 		status_message: "Unauthorized",
	// 		timestamp: new Date()
	// 	})
	// }
	next()
} 


router.get("/ocpi/versions", authorize, async (_, res) => {
	res.send({
		status_code: 1000,
		data: [{
            version: "2.2",
            url: `${PUBLIC_URL}/ocpi/2.2`
        }],
		timestamp: new Date()
	})
})


router.get("/ocpi/2.2", authorize, async (_, res) => {
	res.send({
		status_code: 1000,
		data: {
			version: "2.2",
			endpoints: [
				/* {
					identifier: "locations",
					role: "RECEIVER",
					url: `${PUBLIC_URL}/ocpi/2.2/receiver/locations`
				} */
			]
		},
		timestamp: new Date()
	})
})


router.get("/ocpi/2.2", authorize, async (req, res) => {
    res.send({
        status_code: 1000,
        data: {
            version: "2.2",
            endpoints: [
                {
                    "identifier": "cdrs",
                    "role": "RECEIVER",
                    "url": `${PUBLIC_URL}/ocpi/emsp/2.2/cdrs`
                },
                {
                    "identifier": "commands",
                    "role": "SENDER",
                    "url": `${PUBLIC_URL}/ocpi/emsp/2.2/commands`
                }
            ]
        },
        timestamp: new Date()
    })
})

router.post("/ocpi/emsp/2.2/commands/:command/:uid", authorize, async (req, res) => {
    console.log(`EMSP [DE MSP] received async command response: ${JSON.stringify(req.body)}`)
    res.send({
        status_code: 1000,
        timestamp: new Date()
    })
})

let cdr

router.get("/ocpi/emsp/2.2/cdrs/1", authorize, async (req, res) => {
    res.send({
        status_code: 1000,
        data: cdr,
        timestamp: new Date()
    })
})

router.post("/ocpi/emsp/2.2/cdrs", authorize, async (req, res) => {
    cdr = req.body
    res.set({
        "Location": `${PUBLIC_URL}/ocpi/emsp/2.2/cdrs/1`
    }).send({
        status_code: 1000,
        timestamp: new Date()
    })
})

module.exports = router;
