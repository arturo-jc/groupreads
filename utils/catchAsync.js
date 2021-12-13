module.exports = func => {
    return (req, res) => {
        func(req, res)
            .catch(err => {
                console.error(err.message);
                return res.status(500).send("Server error")
            });
    }
}