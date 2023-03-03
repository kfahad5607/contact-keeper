const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
 
        if (!token) {
            return res.status(401).json({
                 msg: "No token, Authorization denied!"
             })
         }
         else {
             try {
                 const decoded = jwt.verify(token, process.env.JWT_SECRET);
                 req.user = decoded.user;
                 next();
                 
             } catch (error) {
                 console.error(error.message);
                 res.status(400).send("Token invalid!")
             }
         }
    
}