module.exports = {
    register: (req, res) => {
        const db = req.app.get('db');
        const {email, password, age} = req.body;
        
        res.status(200).send(req.session.user)

    },
    login: async(req, res) => {
        return res.sendStatus(200)
    },
    getSessionUser: async(req, res) => {
        return res.sendStatus(200)
    },
    logout: async(req, res) => {
        req.session.destroy();
        return res.sendStatus(200)
    }
}