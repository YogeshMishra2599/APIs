const pool = require('../db/pg_config');
const { getAllRecords, getRecordById, insertRecord, updateRecordById, deleteRecordById, alterSequence, updateSequence } = require('../models/queries');

const getRecords = async (req, res, next) => {
    try {   
        const records = await pool.query(getAllRecords);
        if (records.rows.length === 0) {
            return res.status(404).json({ res: 'No Records Exists!' })
        }
        return res.status(200).json({ res: records.rows })
    } catch (err) {
        next(err);
    }
}

const getRecord = async (req, res, next) => {
    // we have used parseInt() since id is of type int in pg_db
    const id = parseInt(req.params.id);
    try {
        // if we have tp pass different variables to query method we use [] braces
        const record = await pool.query(getRecordById, [id]);
        // checking the length of rows
        if (record.rows.length === 0) {
            // if the rows does not exits then the following res is sent to the client
            return res.status(404).json({ res: `No record with id of ${id} found...` })
        }
        return res.status(200).json({ res: record.rows })
    } catch (err) {
        next(err);
    }
}

const postRecord = async (req, res, next) => {
    const { fname, lname, dob, contact } = req.body;
    try {
        await pool.query(alterSequence);
        await pool.query(updateSequence);
        const record = await pool.query(insertRecord, [fname, lname, dob, contact]);
        return res.status(200).json({ res: `Record Created Successfully` })
    } catch (err) {
        await pool.query(alterSequence);
        await pool.query(updateSequence);
        next(err);
    }
}

const deleteRecord = async (req, res, next) => {
    const id = parseInt(req.params.id)
    try {
        const isExists = await pool.query(getRecordById, [id]); 
        // checking if the record exists
        if (!isExists.rows.length) {
            // if id does not exists then following res is sent to the client
            return res.status(404).json({ res: `No record with id of ${id} found...` })
        }
        // below statement is only executed when the id exists 
        const record = await pool.query(deleteRecordById, [id]);
        return res.status(200).json({ msg: `Record with ${id} deleted successfully` })
    } catch (err) {
        next(err);
    }
}

const updateRecord = async (req, res, next) => {
    const id = parseInt(req.params.id);
    const { fname, lname, dob, contact } = req.body;
    try {
        const isExists = await pool.query(getRecordById, [id]);
        if (!isExists.rows.length) {
            return res.status(404).json({ res: `No record with id of ${id} found...` })
        }
        const record = await pool.query(updateRecordById, [id, fname, lname, dob, contact]);
        res.status(200).json({ msg: `Record with ${id} updated successfully...` });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getRecord,
    getRecords,
    postRecord,
    deleteRecord,
    updateRecord,
}