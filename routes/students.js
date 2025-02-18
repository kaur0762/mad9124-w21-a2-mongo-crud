const Student = require('../models/Student')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    const students = await Student.find()
    res.send({data: students})
})

router.post('/', async (req, res) => {
    let attributes = req.body
    delete attributes._id

    let newStudent = new Student(attributes)
    await newStudent.save()

    res.status(201).send({data: newStudent})
})

router.get('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id)
        if (!student) {
        throw new Error('Resource not found')
        }
        res.send({data: student})
    } catch (err) {
        sendResourceNotFound(req, res)
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const {_id, ...otherAttributes} = req.body
        const student = await Student.findByIdAndUpdate(
        req.params.id,
        {_id: req.params.id, ...otherAttributes},
        {
            new: true,
            runValidators: true
        }
        )
        if (!student) throw new Error('Resource not found')
        res.send({data: student})
    } catch (err) {
        sendResourceNotFound(req, res)
    }
})

router.put('/:id', async (req, res) => {
    try {
        const {_id, ...otherAttributes} = req.body
        const student = await Student.findByIdAndUpdate(
        req.params.id,
        {_id: req.params.id, ...otherAttributes},
        {
            new: true,
            overwrite: true,
            runValidators: true
        }
        )
        if (!student) throw new Error('Resource not found')
        res.send({data: student})
    } catch (err) {
        sendResourceNotFound(req, res)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndRemove(req.params.id)
        if (!student) throw new Error('Resource not found')
        res.send({data: student})
    } catch (err) {
        sendResourceNotFound(req, res)
    }
})

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

function sendResourceNotFound(req, res) {
    res.status(404).send({
        errors: [
        {
            status: '404',
            title: 'Resource does not exist',
            description: `We could not find a student with id: ${req.params.id}`
        }
        ]
    })
}

module.exports = router