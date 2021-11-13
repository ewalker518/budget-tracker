let db;

const request = indexedDB.open('budget-tracker', 1);

request.onupgradeneeded = function(event) {
    const db = event.target.result;
    db.createObjectStore('new-transaction', { autoIncrement: true });
};

// successful request

// error 

// new transaction with no internet connection

