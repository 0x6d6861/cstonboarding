var express = require('express');
var router = express.Router();

const Task = require('../../models/index').Task;

router.get('/', async function(req, res, next) {
    var tasks  = await Task.findAll();
    res.json(tasks);
});

// /tasks/assigned?page=1&limit=10&order=created&orderMethod=DESC
router.get('/assigned', async function (req, res, next) {

    console.log(req.user);

    let personnel_id = req.user.personnel_id;

    let page = req.query.page;
    let limit = req.query.limit;
    let order = req.query.order;
    let orderMethod = req.query.orderMethod;

    const offset = page * limit;
    // const limit = offset + pageSize;

    let tasks = Task.findAll({
        where: { personnel_id: personnel_id },
        offset: offset,
        limit: limit,
        order: [[order, orderMethod],]
    });

    res.status(200).json(tasks);

});
