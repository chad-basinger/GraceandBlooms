const bcrypt = require('bcryptjs')

module.exports = {
    register: async(req, res) => {
        const db = req.app.get('db');
        const {email, password} = req.body;
        if(email != '' && password != ''){

            try {
                const result = await db.users.find_user_by_email([email])
                const existingUser = result[0]
    
                if(existingUser){
                    return res.status(409).send('Email  already registered')
                }
    
                const salt = bcrypt.genSaltSync(10)
                const hash = bcrypt.hashSync(password, salt)
                
    
                //add the user to the db and get back their id
                const registeredUser = await db.users.create_user([email, hash])
                //create a session for the user using the db response
                const user = registeredUser[0];
                req.session.user = {
                    id: user.id,
                    email: user.email,
                    isAdmin: user.is_admin
                    
                }
    
                //send a response that includes the user session info
                res.status(201).send(req.session.user)
            }
            catch(err){
                console.log(err)
                return res.sendStatus(500)
            }
        }
        else {
            return 'please fill in your email and password'
        }

    },
    login: async(req, res) => {
        const {email, password} = req.body
        const foundUser = await req.app.get('db').users.find_user_by_email([email])

        const user = foundUser[0]
        console.log(user, 'user')

        if(!user){
            return res.status(401).send('Username does not exist.')
        }

        const isAuthenticated = bcrypt.compareSync(password, user.hash);

        if (!isAuthenticated) {
            return res.status(403).send('Incorrect password');
          }
          
        req.session.user = {
            id: user.user_id,
            email: user.email,
            is_admin: user.is_admin
        }
        console.log(req.session, 'session')
        return res.send(req.session.user)
    },
    getSessionUser: async(req, res) => {
        if(req.session.user) {
            res.status(200).send(req.session.user)
        }
        else{
            res.sendStatus(403)
        }
    },
    logout: async(req, res) => {
        req.session.destroy();
        return res.sendStatus(200)
    }
}