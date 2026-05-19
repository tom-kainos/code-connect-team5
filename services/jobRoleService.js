const fs = require('fs');

class JobRoleService {
    constructor() {
        this.filePath = "jobRoles.json";
    }

    readJobRoles() {
        try {
            const data = fs.readFileSync(this.filePath, 'utf8');
            return JSON.parse(data);
        } catch (err) {
            console.error('Error reading job roles:', err);
            return [];
        }
    }

    writeJobRoles(jobRoles) {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(jobRoles, null, 2), 'utf8');
        } catch (err) {
            console.error('Error writing job roles:', err);
        }
    }

    getJobRoles() {
        return this.readJobRoles();
    }

    getJobRoleById(id) {
        return this.readJobRoles().find(jr => jr.id === id);
    }

    createJobRole(newJobRole) {
        const jobRoles = this.readJobRoles();
        newJobRole.id = jobRoles.length ? jobRoles[jobRoles.length - 1].id + 1 : 1;
        jobRoles.push(newJobRole);
        this.writeJobRoles(jobRoles);
        return newJobRole;
    }

    updateJobRole(id, updatedJobRole) {
        const jobRoles = this.readJobRoles();
        const index = jobRoles.findIndex(jr => jr.id === id);
        if (index === -1) return null;
        updatedJobRole.id = id;
        jobRoles[index] = updatedJobRole;
        this.writeJobRoles(jobRoles);
        return updatedJobRole;
    }

    deleteJobRole(id) {
        const jobRoles = this.readJobRoles();
        const index = jobRoles.findIndex(jr => jr.id === id);
        if (index === -1) return null;
        const deleted = jobRoles.splice(index, 1);
        this.writeJobRoles(jobRoles);
        return deleted[0];
    }
}

module.exports = JobRoleService;
