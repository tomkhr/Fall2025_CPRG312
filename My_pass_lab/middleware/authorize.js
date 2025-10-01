const authorizeRequest = (user, roles) => {
    return (req, res, next) => {
        if(roles.includes(user.role)) {
            next();
        } else {
            res.status(403).json({message:"Not Authorized. Access denied"});
        }
    }
}

module.exports = authorizeRequest;