const custom500ErrorHandler = (err, req, res, next) => {
    return res.status(500).json({ res: err.message });
}

module.exports = {
    custom500ErrorHandler,
}