const Course = require('../models/Course')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    const courses = await Course.find()
    res.send({data: courses})
})

router.post('/', async (req, res) => {
    let attributes = req.body
    delete attributes._id

    let newCourse = new Course(attributes)
    await newCourse.save()

    res.status(201).send({data: newCourse})
})

router.get('/:id', async (req, res) => {})

router.patch('/:id', async (req, res) => {})

router.put('/:id', async (req, res) => {})

router.delete('/:id', async (req, res) => {})

/**
 * Format the response data object according to JSON:API v1.0
 * @param {string} type The resource collection name, e.g. 'cars'
 * @param {Object} resource An instance object from that collection
 * @returns
 */
function formatResponseData(type, resource) {
    const {id, ...attributes} = resource
    return {type, id, attributes}
}

module.exports = router