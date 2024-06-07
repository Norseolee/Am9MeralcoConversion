const checkAdminStaff = (req, res, next) => {
    if (req.session && req.session.user && (req.session.user.role_id == 1 || req.session.user.role_id == 3)) {
        next();
    } else {
        res.status(403).send('Forbidden'); // Return forbidden status if user is not admin or staff
    }
};

module.exports = checkAdminStaff;