var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');

const Personnel = require('../models/index').Personnel;
const secret = process.env.SECRET || 'F$v4w84cNX7^-dR6';

const tokenExpiry = '24h';


/* GET users listing. */
router.get('/', async (req, res, next) => {
    let people = await Personnel.findOne({where: {personnel_phone: '0722222222'}});
    res.json(people);
});

router.post('/login', (req, res, next) => {
    const phone = req.body.phone;
    const password = req.body.password;

    Personnel.findOne({
        where: {personnel_phone: phone}
    }).then(person => {
            if (!person) {
                return res.status(404).json({
                        error: {
                            phone: "Account not found"
                        }
                    });
            }
        person.validPassword(password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = {
                            id: person.personnel_id,
                            phone: person.personnel_phone
                        };
                        jwt.sign(payload, secret, {expiresIn: tokenExpiry}, (err, token) => {
                                if (err){
                                    res.status(500).json({
                                            error: { internal: err }
                                        });
                                }
                                res.json({
                                    reset_password: person.reset_password,
                                    accessToken: token,
                                    expires_in: tokenExpiry
                                });
                            });
                    } else {
                        res.status(400).json({
                            error: {
                                password: "You have entered an incorrect password"
                            }
                        });
                    }
                });
        });
});

module.exports = router;
