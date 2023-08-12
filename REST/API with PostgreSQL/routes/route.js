const express = require('express');
const router = express.Router();
const { getRecord, getRecords, postRecord, deleteRecord, updateRecord } = require('../controllers/controller');

router.route('/').get(getRecords).post(postRecord);
router.route('/record/:id').get(getRecord).delete(deleteRecord).put(updateRecord);

module.exports = router;