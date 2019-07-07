const express = require('express')
const router = require('express').Router()
const morgan = require('morgan')
const path = require('path')
const bodyParser = require('body-parser')
module.exports = router

// loggin' middleware
router.use(morgan('dev'))

// body-parsing middleware
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

// static middleware
router.use(express.static(path.join(__dirname,'../../public')))
