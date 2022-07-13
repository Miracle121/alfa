const fetch = require('node-fetch');
const fs = require('fs');
const util = require('util');
const exp = require('constants');
const checkAuth = require('../util/checkAuth')

// Convert fs.readFile into Promise version of same
const readFile = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile)

exports.getToken = async () => {
    return await readFile('./util/token.txt');
}
const writeToken = async (token) => {
    await writeFileAsync('./util/token.txt', token)
}

exports.checkAccess = async (response) => {


    try {
        checkStatus(response);
        return 1
    } catch (error) {

        const URL = "http://10.190.0.77:7101"
        //:3000/auth/login"
        // let data =""
        const body = {
            "Login": "WomensRight",
            "Password": "W0men$2021P@$P",
            "CurrentSystem": 40
        }

        const resp = await fetch('http://10.190.0.77:7101/Agency/token', {
            method: 'post',
            body: JSON.stringify(body),
            headers: {'Content-Type': 'application/json'}
        });
        
        const data = await resp.json();
        if (resp.status == 200)
            await writeToken(data.access_token)

        return 0
    }


}

class HTTPResponseError extends Error {
    constructor(response, ...args) {
        super(`HTTP Error Response: ${response.status} ${response.statusText}`, ...args);
        this.response = response;
    }
}

const checkStatus = response => {
    if (response.ok) {
        // response.status >= 200 && response.status < 300
        return response;
    } else {
        throw new HTTPResponseError(response);
    }
}


exports.makeGetRequest = async (url, headers = {}) => {
    //'http://87.237.235.44:3000/orders'
    headers = {
        'auth': await checkAuth.getToken(),
    }


    let response = await fetch(url, {
        method: 'get',
        headers: headers,
    });
    let result = await checkAuth.checkAccess(response)

    if (!result) {
        response = await fetch(url, {
            method: 'get',
            headers: {'auth': await checkAuth.getToken()},
        });

    }
    let data = await response.json();

    return data;
}

exports.makePostRequest = async (url, headers = {}, body = {}) => {
    //'http://87.237.235.44:3000/orders'
    headers = {
        'auth': await checkAuth.getToken(),
        'Accept': 'application/json'
    }


    let response = await fetch(url, {
        method: 'post',
        headers: {
            'Authorization': 'Bearer ' + await checkAuth.getToken(),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    let result = await checkAuth.checkAccess(response)

    if (!result) {
        response = await fetch(url, {
            method: 'post',
            headers: {
                'Authorization': 'Bearer ' + await checkAuth.getToken(),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

    }
    let data = await response.json();

    return data;
}


