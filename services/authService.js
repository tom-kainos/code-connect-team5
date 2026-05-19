const fs = require('fs');

class AuthService {
    constructor() {
        this.filePath = "loginUsers.json";
    }

    readUsers() {
        try {
            const data = fs.readFileSync(this.filePath, 'utf8');
            return JSON.parse(data);
        } catch (err) {
            console.error('Error reading login users:', err);
            return [];
        }
    }

    findUser(email, password) {
        const users = this.readUsers();
        const user = users.find(u => u.email === email);
        if (!user || user.password !== password) return null;
        return user;
    }

    registerUser(email, password) {
        const users = this.readUsers();
        if (users.find(u => u.email === email)) {
            return { success: false, error: 'An account with that email already exists.' };
        }
        const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
        users.push({ id: newId, email, password });
        fs.writeFileSync(this.filePath, JSON.stringify(users, null, 2), 'utf8');
        return { success: true };
    }
}

module.exports = AuthService;
