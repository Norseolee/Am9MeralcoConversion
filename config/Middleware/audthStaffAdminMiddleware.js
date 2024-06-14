const checkAdminStaff = (req, res, next) => {
    if ((req.session && req.session.user || req.user) && (req.session.user.role_id == 1)) {
        next();
    } else {
        const previousUrl = req.headers.referer || '/'; // Return forbidden status if user is not admin or staff
        res.redirect(previousUrl);
        // res.status(403).send('Forbidden'); // Return forbidden status if user is not admin or staff
    }
};

module.exports = checkAdminStaff;