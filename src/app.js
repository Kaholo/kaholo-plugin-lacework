const fetch = require('node-fetch');

async function GetEventDetails(action, settings) {
    const host = (settings.HOST || '').trim();
    const keyId = (settings.KEY_ID || '').trim();
    const secret = (settings.SECRET || '').trim();
    const eventID = (action.params.EVENT_ID || '').trim();
    if (!host || !keyId || !secret || !eventID){ // check if all required parameters were provided
        throw "not all required parameters and settings were provided";
    }

    const token = await getToken(host, keyId, secret);

    const url = `https://${host}.lacework.net/api/v1/external/events/GetEventDetails?EVENT_ID=${eventID}`;
    const fetchParams = { 'headers': { 'Authorization': `Bearer ${token}` } };

    return await fetchJson(url, fetchParams);
}

async function GetLatestAWSComplianceReportDetails(action, settings) {
    const host = (settings.HOST || '').trim();
    const keyId = (settings.KEY_ID || '').trim();
    const secret = (settings.SECRET || '').trim();
    const aws_account_id = (action.params.AWS_ACCOUNT_ID || '').trim();
    const report_type = (action.params.REPORT_TYPE || '').trim();
    if (!host || !keyId || !secret || !aws_account_id){ // check if all required parameters were provided
        throw "not all required parameters and settings were provided";
    }

    const token = await getToken(host, keyId, secret);

    const url = `https://${host}.lacework.net/api/v1/external/compliance/aws/GetLatestComplianceReport?AWS_ACCOUNT_ID=${aws_account_id}&REPORT_TYPE=${report_type}&FILE_FORMAT=json`;
    const fetchParams = { 'headers': { 'Authorization': `Bearer ${token}` } };

    return await fetchJson(url, fetchParams);
}

///// Helpers

async function getToken(host, keyId, secret) {
    const url = `https://${host}.lacework.net/api/v2/access/tokens`;
    const fetchParams = {
        method: 'post',
        body: JSON.stringify({
            keyId: keyId,
            expiryTime: 3600
        }),
        headers: {
            'Content-Type': 'application/json',
            'X-LW-UAKS': secret
        }
    }
    const body = await fetchJson(url, fetchParams);

    return body.token;
}

async function fetchJson(url, fetchParams){
    const response = await fetch(url, fetchParams);
    return response.json();
}

///// Exports

module.exports = {
  GetEventDetails,
  GetLatestAWSComplianceReportDetails
}
