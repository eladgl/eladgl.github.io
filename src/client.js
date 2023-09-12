//client.js
export async function makeLoginRequest(username, password) {
    try {
        const response = await fetch('http://localhost:3001/Login/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        return { status: response.status, data };
    } catch (error) {
        console.log("error at client.js makeLoginRequest");
        throw error;
    }
};

//client.js
export async function logoutClient(username) {
    try {
        const response = await fetch('http://localhost:3001/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username })
        });

        const data = await response.json();
        return { status: response.status, data };
    } catch (error) {
        console.log("error at client.js logout");
        throw error;
    }
};

//client.js
export async function getTrainingData(selectedDate, username, choice) {
    try {
        const response = await fetch('http://localhost:3001/getTrainingData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ selectedDate, username, choice }),
        });

        const data = await response.json();
        return { status: response.status, data };
    } catch (error) {
        console.error('Error fetching training data:', error);
        throw error;
    }
};

//client.js
export async function makeLoginTrain(username, password) {
    try {
        const response = await fetch('http://localhost:3001/train_login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        return { status: response.status, data };
    } catch (error) {
        console.error('Error fetching training data:', error);
        throw error;
    }
};

export async function sendTrainingData(username, date, gripPressure) {
    try {
        const response = await fetch('http://localhost:3001/sendData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, date, gripPressure }),
        });

        const data = await response.json();
        return { status: response.status, data };
    } catch (error) {
        console.error('Error sending training data:', error);
        throw error;
    }
};

export async function makeTrainLogout(username, useTime, date) {
    try {
        const response = await fetch('http://localhost:3001/train_logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, useTime, date }),
        });

        const data = await response.json();
        return { status: response.status, data };
    } catch (error) {
        console.error('Error sending training data:', error);
        throw error;
    }
};

export async function makeRegisteration(username, password, age, role, fname, lname, profilePicBlob) {
    try {
        // Convert the blob to a base64-encoded string
        let profilePicBase64 = '';
        if (profilePicBlob !== null) {
            const reader = new FileReader();
            reader.readAsDataURL(profilePicBlob);


            reader.onload = function () {
                profilePicBase64 = reader.result.split(',')[1]; // Get the base64 part of the data URL
            };

            await new Promise((resolve) => {
                reader.onloadend = resolve;
            });
        }

        const response = await fetch('http://localhost:3001/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, age, role, fname, lname, profilePicBase64 }),
        });

        const data = await response.json();
        return { status: response.status, data };
    } catch (error) {
        console.error('Error sending registration data:', error);
        throw error;
    }
};