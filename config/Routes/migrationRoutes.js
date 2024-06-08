const express = require('express');
const router = express.Router();
const knexConfig = require('../../knexfile');
const knex = require('knex')(knexConfig.development); // Assuming you want to use the development environment

// Route handler for running the latest migration
router.get('/run-migration', async (req, res) => {
    try {
        // Run the latest migration
        await knex.migrate.latest();

        res.status(200).send('Latest migration has been run successfully.');
    } catch (error) {
        console.error('Error running migration:', error);
        res.status(500).send('Error running migration. Please check the server logs.');
    }
});

module.exports = router;
