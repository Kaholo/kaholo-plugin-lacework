const fetch = require("node-fetch");

async function GetEventDetails(action, settings) {
  const host = (settings.HOST || "").trim();
  const keyId = (settings.KEY_ID || "").trim();
  const secret = (settings.SECRET || "").trim();
  const eventID = (action.params.EVENT_ID || "").trim();
  if (!host || !keyId || !secret || !eventID) { // check if all required parameters were provided
    throw new Error("not all required parameters and settings were provided");
  }

  const token = await getToken(host, keyId, secret);

  const url = `https://${host}.lacework.net/api/v1/external/events/GetEventDetails?EVENT_ID=${eventID}`;
  const fetchParams = { headers: { Authorization: `Bearer ${token}` } };

  return fetchJson(url, fetchParams);
}

async function GetLatestAWSComplianceReportDetails(action, settings) {
  const host = (settings.HOST || "").trim();
  const keyId = (settings.KEY_ID || "").trim();
  const secret = (settings.SECRET || "").trim();
  const awsAccountId = (action.params.AWS_ACCOUNT_ID || "").trim();
  const reportType = (action.params.REPORT_TYPE || "").trim();
  if (!host || !keyId || !secret || !awsAccountId) {
    throw new Error("not all required parameters and settings were provided");
  }

  const token = await getToken(host, keyId, secret);

  const url = `https://${host}.lacework.net/api/v1/external/compliance/aws/GetLatestComplianceReport?AWS_ACCOUNT_ID=${awsAccountId}&REPORT_TYPE=${reportType}&FILE_FORMAT=json`;
  const fetchParams = { headers: { Authorization: `Bearer ${token}` } };

  return fetchJson(url, fetchParams);
}

async function GetLatestAzureComplianceReportDetails(action, settings) {
  const host = (settings.HOST || "").trim();
  const keyId = (settings.KEY_ID || "").trim();
  const secret = (settings.SECRET || "").trim();
  const azureTenantId = (action.params.AZURE_TENANT_ID || "").trim();
  const azureSubscriptionId = (action.params.AZURE_SUBSCRIPTION_ID || "").trim();
  const reportType = (action.params.REPORT_TYPE || "").trim();
  if (!host || !keyId || !secret || !azureTenantId || !azureSubscriptionId) {
    throw new Error("not all required parameters and settings were provided");
  }

  const token = await getToken(host, keyId, secret);

  const url = `https://${host}.lacework.net/api/v1/external/compliance/azure/GetLatestComplianceReport?AZURE_TENANT_ID=${azureTenantId}&AZURE_SUBS_ID=${azureSubscriptionId}&REPORT_TYPE=${reportType}&FILE_FORMAT=json`;
  const fetchParams = { headers: { Authorization: `Bearer ${token}` } };

  return fetchJson(url, fetchParams);
}

async function GetLatestGCPComplianceReportDetails(action, settings) {
  const host = (settings.HOST || "").trim();
  const keyId = (settings.KEY_ID || "").trim();
  const secret = (settings.SECRET || "").trim();
  const gcpOrgId = (action.params.GCP_ORG_ID || "").trim();
  const gcpProjId = (action.params.GCP_PROJ_ID || "").trim();
  const reportType = (action.params.REPORT_TYPE || "").trim();
  if (!host || !keyId || !secret || !gcpOrgId || !gcpProjId) {
    throw new Error("not all required parameters and settings were provided");
  }

  const token = await getToken(host, keyId, secret);

  const url = `https://${host}.lacework.net/api/v1/external/compliance/gcp/GetLatestComplianceReport?GCP_ORG_ID=${gcpOrgId}&GCP_PROJ_ID=${gcpProjId}&REPORT_TYPE=${reportType}&FILE_FORMAT=json`;
  const fetchParams = { headers: { Authorization: `Bearer ${token}` } };

  return fetchJson(url, fetchParams);
}

async function GetAWSSuppressionforarecommendationID(action, settings) {
  const host = (settings.HOST || "").trim();
  const keyId = (settings.KEY_ID || "").trim();
  const secret = (settings.SECRET || "").trim();
  const recId = (action.params.REC_ID || "").trim();
  if (!host || !keyId || !secret || !recId) { // check if all required parameters were provided
    throw new Error("not all required parameters and settings were provided");
  }
  const token = await getToken(host, keyId, secret);

  const url = `https://${host}.lacework.net/api/v1/external/suppressions/aws/allExceptions/${recId}`;
  const fetchParams = { headers: { Authorization: `Bearer ${token}` } };

  return fetchJson(url, fetchParams);
}

async function ConfigureSuppressionviaTagforAWS(action, settings) {
  const host = (settings.HOST || "").trim();
  const keyId = (settings.KEY_ID || "").trim();
  const secret = (settings.SECRET || "").trim();
  const recId = (action.params.REC_ID || "").trim();
  const tagkey = (action.params.TAG_KEY || "").trim();
  const tagvalue = (action.params.TAG_VALUE || "").trim();
  const suppressioncomment = (action.params.SUPPRESSION_COMMENT || "").trim();
  if (!host || !keyId || !secret || !recId || !tagkey || !tagvalue || !suppressioncomment) {
    throw new Error("not all required parameters and settings were provided");
  }
  const token = await getToken(host, keyId, secret);
  const url = `https://${host}.lacework.net/api/v1/external/suppressions/aws`;
  const jsonstring = `{ "recommendationExceptions": { "${tagkey}": [ { "accountIds": [ "ALL_ACCOUNTS"], "regionNames": [ "ALL_ACCOUNTS"], "resourceNames": [], "resourceTags": [ { "key": "${tagkey}", "value":"${tagvalue}" } ], "comments": "${suppressioncomment}" } ] } }`;
  const fetchParams = {
    method: "post",
    body: jsonstring,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return fetchJson(url, fetchParams);

  // const url = `https://${host}.lacework.net/api/v1/external/suppressions/aws`;
  // const fetchParams = { method: 'post', headers: { 'Authorization': `Bearer ${token}` },
  // body: { 'recommendationExceptions': { 'LW_S3_1': [ { 'accountIds': [ 'ALL_ACCOUNTS' ],
  // 'regionNames': [ 'ALL_REGIONS' ], 'resourceNames': [],
  // 'resourceTags': [ { 'key': 'LW_S3_1', 'value': 'suppressed' } ], 'comments': 'test' } ] } }  };
  // return await fetchJson(url, fetchParams);
}

/// // Helpers

async function getToken(host, keyId, secret) {
  const url = `https://${host}.lacework.net/api/v2/access/tokens`;
  const fetchParams = {
    method: "post",
    body: JSON.stringify({
      keyId,
      expiryTime: 3600,
    }),
    headers: {
      "Content-Type": "application/json",
      "X-LW-UAKS": secret,
    },
  };
  const body = await fetchJson(url, fetchParams);

  return body.token;
}

async function fetchJson(url, fetchParams) {
  const response = await fetch(url, fetchParams);
  return response.json();
}

/// // Exports

module.exports = {
  GetEventDetails,
  GetLatestAWSComplianceReportDetails,
  GetLatestAzureComplianceReportDetails,
  GetLatestGCPComplianceReportDetails,
  GetAWSSuppressionforarecommendationID,
  ConfigureSuppressionviaTagforAWS,
};
