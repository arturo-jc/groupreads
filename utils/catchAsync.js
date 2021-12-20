module.exports = func => {
    return (req, res, next) => {
        func(req, res, next)
            .catch(err => {
                console.error(err.message);
                return res.status(500).json({ msg: "Server error." });
            });
    }
}