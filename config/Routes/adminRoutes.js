// mainRoutes.js
const express = require('express');
const router = express.Router();
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const checkAuth = require('../Middleware/audthMiddleware');
const permission = require('../Middleware/checkPermission');
const { generateToken } = require('../generateToken');
const { verifyToken } = require('../verifyToken');
const bcrypt = require('bcryptjs');

const User = require('../Models/userModel');

route.get('/admin/dashboard/documents', checkadmin , async (req, res) => {
    try {

    }
})