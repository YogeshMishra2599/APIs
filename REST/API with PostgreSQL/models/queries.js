const getAllRecords = 'SELECT * FROM demo_relation';
const getRecordById = 'SELECT * FROM demo_relation WHERE id = $1';
const insertRecord = 'INSERT INTO demo_relation (fname, lname, dob, contact) VALUES ($1, $2, $3, $4)';
const updateRecordById = 'UPDATE demo_relation SET fname = $2, lname = $3, dob = $4, contact = $5 WHERE id = $1'; 
const deleteRecordById = 'DELETE FROM demo_relation WHERE id = $1';
const alterSequence = 'ALTER SEQUENCE demo_relation_id_seq RESTART';
const updateSequence = 'UPDATE demo_relation SET id = DEFAULT';

module.exports = {
    getAllRecords,
    getRecordById,
    insertRecord,
    updateRecordById,
    deleteRecordById,
    alterSequence,
    updateSequence
}