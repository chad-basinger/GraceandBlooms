const bcrypt = require('bcryptjs')

module.exports = {
    register: async(req, res) => {
        const db = req.app.get('db');
        const {email, password, age} = req.body;
        
        try {
            const result = await db.users.find_user_by_email([email])
            const existingUser = result[0]

            if(existingUser){
                return res.status(409).send('Username exists already')
            }

            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)
            

            //add the user to the db and get back their id
            const registeredUser = await db.users.create_user([email, hash, age])
            //create a session for the user using the db response
            const user = registeredUser[0];
            req.session.user = {
                id: user.id,
                email: user.email,
                age: user.age,
                isAdmin: user.is_admin
                
            }

            //send a response that includes the user session info
            res.status(201).send(req.session.user)
        }
        catch(err){
            console.log(err)
            return res.sendStatus(500)
        }

    },
    login: async(req, res) => {
        const {email, password} = req.body
        const foundUser = await req.app.get('db').user.find_user_by_email([email])

        const user = foundUser[0]
        console.log(user, 'user')

        if(!user){
            return res.status(401).send('Username does not exist.')
        }

        const isAuthenticated = bcrypt.compareSync(password, user.password);

        if (!isAuthenticated) {
            return res.status(403).send('Incorrect password');
          }
          
        req.session.user = {
            id: user.id,
            username: user.username,
            profile_pic: user.profile_pic
        }
        console.log(req.session, 'session')
        return res.send(req.session.user)
    },
    getSessionUser: async(req, res) => {
        return res.sendStatus(200)
    },
    logout: async(req, res) => {
        req.session.destroy();
        return res.sendStatus(200)
    }
}