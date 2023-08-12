const notFound = (req, res, next) => {
    res.status(404).json({ msg: 'notFound' });
}

module.exports = notFound;