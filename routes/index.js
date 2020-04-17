var express = require('express');
var router = express.Router();
const uuid = require("uuid");

const PUBLIC_URL = "https://service.msp.com";
const TOKEN_B = uuid.v4();
console.log("Auth TOKEN_B = " + TOKEN_B);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const authorize = (req, res, next) => {
	if (req.headers.authorization !== `token ${TOKEN_B}`) {
		return res.status(401).send({
			status_code: 2001,
			status_message: "Unauthorized",
			timestamp: new Date()
		})
	}
	next()
} 


router.get("/ocpi/versions", authorize, async (_, res) => {
	res.send({
		status_code: 1000,
		data: {
			versions: [{
				version: "2.2",
				url: `${PUBLIC_URL}/ocpi/2.2`
			}]
		},
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

module.exports = router;
