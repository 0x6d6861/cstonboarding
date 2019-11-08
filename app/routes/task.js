'use strict';
const express = require('express');
const router = express.Router();
const Task = require('../models/index').Task;

router.get('/', async (req, res, next) => {
    let tasks  = await Task.findAll();
    res.json(tasks);
});

// /tasks/assigned?page=1&limit=10&order=created&orderMethod=DESC
router.get('/assigned', async (req, res, next) => {
    let personnel_id = req.user.personnel_id;
    let page = +req.query.page || 1;
    let limit = +req.query.limit  || 5;
    let order = req.query.order || 'created';
    let orderMethod = req.query.orderMethod || 'ASC';
    const offset = page * limit;

    let tasks = await Task.findAndCountAll({
        where: { personnel_id: personnel_id },
        offset: offset,
        limit: limit,
        order: [[order, orderMethod],]
    });

    res.status(200).json({
        totalTasks: tasks.count,
        page: page,
        perPage: limit,
        tasks: tasks.rows
    });

});

module.exports = router;
