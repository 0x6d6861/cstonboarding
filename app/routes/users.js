var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');

const Personnel = require('../../models/index').Personnel;
const Task = require('../../models/index').Task;
const secret = process.env.SECRET || 'F$v4w84cNX7^-dR6';



/* GET users listing. */
router.get('/', async function(req, res, next) {
  var users  = await Personnel.findOne({where: {personnel_phone: '0722222222'}});
  res.json(users);
});

router.post('/login', (req,res) => {
  const phone = req.body.phone;
  const password = req.body.password;

  const errors = {};

  Personnel.findOne({
    where: {personnel_phone: phone}
  }).then(user => {
        if (!user) {
          errors.email = "No Account Found";
          return res.status(404).json(errors);
        }
    user.validPassword(password)
            .then(isMatch => {
              if (isMatch) {
                const payload = {
                  id: user.personnel_id,
                  phone: user.personnel_phone
                };
                jwt.sign(payload, secret, { expiresIn: 36000 },
                    (err, token) => {
                      if (err) res.status(500)
                          .json({ error: "Error signing token",
                            raw: err });
                      res.json({
                        success: true,
                        token: `Bearer ${token}` });
                    });
              } else {
                errors.password = "Password is incorrect";
                res.status(400).json(errors);
              }
            });
      });
});

module.exports = router;
