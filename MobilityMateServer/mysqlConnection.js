//mysqlConnection.js
const mysql = require('mysql2');
const serverConstants = require('./constants');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Aa123456',
  database: 'MobilityMate',
  waitForConnections: true,
  connectionLimit: 100,
  queueLimit: 100
});

// Submodule for handling queries
const queries = {
  login: (username, password) => {
    return new Promise((resolve, reject) => {
      const getUserQuery = 'SELECT * FROM users WHERE username = ? AND password = ? AND isLogged = 0';
      pool.query(getUserQuery, [username, password], (err, results) => {
        console.log("login getUserQuery - ", results);
        if (err || results.length === 0) {
          reject(err);
          return;
        }
        const updateUserToLogged = 'UPDATE users SET isLogged = 1 WHERE username = ?';
        pool.query(updateUserToLogged, [username], (err2, results2) => {
          console.log("update isLogged request - ", results2);
          if (err2 || results2.affectedRows < 1) {
            reject(err2);
            return;
          }
        });
        resolve(results);
      });
    });
  },

  logout: (username) => {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE users SET isLogged = false WHERE username = ?';
      pool.query(query, [username], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },

  isLogged: (username) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT isLogged from users WHERE username = ?';
      pool.query(query, [username], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  trainLogin: (username, password) => {
    return new Promise((resolve, reject) => {
      const getUserQuery = 'SELECT * FROM users WHERE username = ? AND password = ? AND train_login = 0';
      pool.query(getUserQuery, [username, password], (err, results) => {
        console.log("mysql results ", results);
        console.log(err);
        if (err) {
          console.log("Error is , ", err);
          reject(err);
        } else {
          if (results.length === 0) {
            // Invalid username or password
            reject({ message: 'Invalid username or password' });
          } else {
            // Login successful, update train_login to 1
            const updateUserToLogged = 'UPDATE users SET train_login  = 1 WHERE username = ?';
            pool.query(updateUserToLogged, [username], (err2, results2) => {
              if (results2.length === 0) {
                // Invalid username or password
                reject({ message: 'Invalid username or password' });
              }
              if (err2) {
                console.log("Error is , ", err2);
                reject(err2);
              } else {
                resolve(results2);
              }
            });
          }
        }
      });
    });
  },
  trainLogout: (username, useTime, date) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE users AS t1 JOIN usertrainingsessions AS t2 ON
      t1.username=t2.user JOIN training_data AS t3 ON t2.id=t3.training_id SET t1.train_login=0,
      t3.duration = ? WHERE t1.username = ? AND t2.taining_date = ?`;
      pool.query(query, [useTime, username, date], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  getTrainingData: (selectedDate, username, choice) => {
    return new Promise((resolve, reject) => {

      if (!serverConstants.validColumns.includes(choice)) {
        reject(new Error('Invalid column name.'));
        return;
      }

      const query = `SELECT td.timeSamplingArray, td.${choice}
            FROM usertrainingsessions uts
            INNER JOIN training_data td ON uts.id = td.training_id
            WHERE uts.user = ? AND uts.taining_date = ?`;
      pool.query(query, [username, selectedDate], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  register: (registerObject) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO users (username, password, age, role, fname, lname, profilePic)
      VALUES (?,?,?,?,?,?,?);`
      const { username, password, age, role, fname, lname, profilePicBase64 } = registerObject;
      pool.query(query, [username, password, age, role, fname, lname, profilePicBase64], (err, results) => {
        if (err || results.length === 0) {
          reject(err);
        } else {
          resolve();
        }
      });
    })
  },
  sendData: (username, date, gripPressure, accelerationX, ultrasonic, gyroX) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT td.*
        FROM training_data td
        JOIN usertrainingsessions ut ON td.training_id = ut.id
        JOIN users u ON ut.user = u.username
        WHERE u.username = ?
          AND ut.taining_date = ?;`;
      pool.query(query, [username, date], (err, results) => {
        if (err || results.length === 0) {
          reject(err);
        }
        else {
          // Parse gripArray from string to array
          const gripArray = results[0].gripArray;
          const accelerationXArray = results[0].accelerationX;
          const timeArray = results[0].timeSamplingArray;
          console.log("The grip array that exists is: ", gripArray);
          // Append gripPressure to gripArray
          console.log("grip pressure to enter = " + gripPressure);

          const updatedGripArray = gripArray + ", " + gripPressure;
          const updatedAccelerationXArray = accelerationXArray + ", " + accelerationX;

          const timeValues = timeArray.split(",");
          // Get the last value and add 10
          const lastValue = parseFloat(timeValues[timeValues.length - 1]);
          const updatedValue = lastValue + 10 / 60;
          // Convert the updated value back to a string
          const updatedValueString = updatedValue.toString();
          // Concatenate the updated value with a comma to the end of the timeArray
          const updatedTimeArray = timeArray + "," + updatedValueString;
          // Convert gripArray back to string if needed
          //const updatedGripArrayString = JSON.stringify(gripArray);
          // Update the database with the modified gripArray
          const updateQuery = `UPDATE training_data SET gripArray = ?,
                               timeSamplingArray= ?, accelerationArray = ?
                               WHERE training_id = ?;`;
          console.log("AccelerationX pressure to enter = " + accelerationX);
          console.log("updatedAccelerationXArray = " + updatedAccelerationXArray);
          console.log("time to enter = " + updatedValueString);
          console.log("updatedTimeArray = " + updatedTimeArray);
          pool.query(updateQuery, [updatedGripArray, updatedTimeArray, updatedAccelerationXArray, results[0].training_id], (updateErr, updateResults) => {
            if (updateErr) {
              reject(updateErr);
            } else {
              resolve(updateResults);
            }
          });
        }
      });
    });
  },
  // Add more query methods here
};

module.exports = queries;