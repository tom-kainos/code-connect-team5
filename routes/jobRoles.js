var express = require('express');
var router = express.Router();

const JobRoleService = require('../services/jobRoleService');
const jobRoleService = new JobRoleService();

// Get all job roles
router.get('/', (req, res) => {
    const jobRoles = jobRoleService.getJobRoles();
    res.render('jobRoles', { jobRoles: jobRoles });
});

// Render add job role form
router.get('/add', (req, res) => {
    res.render('addJobRole');
});

// Handle add job role form submission
router.post('/add', (req, res) => {
    const newJobRole = req.body;
    jobRoleService.createJobRole(newJobRole);
    res.redirect('/job-roles');
});

// View a single job role
router.get('/:id', (req, res) => {
    const jobRole = jobRoleService.getJobRoleById(parseInt(req.params.id));
    if (!jobRole) return res.status(404).send('Job role not found');
    res.render('viewJobRole', { jobRole: jobRole });
});

// Render edit job role form pre-populated with existing data
router.get('/edit/:id', (req, res) => {
    const jobRole = jobRoleService.getJobRoles().find(jr => jr.id === parseInt(req.params.id));
    if (!jobRole) return res.status(404).send('Job role not found');
    res.render('editJobRole', { jobRole: jobRole });
});

// Handle edit job role form submission
router.post('/edit/:id', (req, res) => {
    const updated = jobRoleService.updateJobRole(parseInt(req.params.id), req.body);
    if (!updated) return res.status(404).send('Job role not found');
    res.redirect('/job-roles');
});

// Handle delete job role
router.post('/delete/:id', (req, res) => {
    const deleted = jobRoleService.deleteJobRole(parseInt(req.params.id));
    if (!deleted) return res.status(404).send('Job role not found');
    res.redirect('/job-roles');
});

module.exports = router;
