# kaholo-plugin-lacework
Kaholo Plugin for Lacework

## Settings:
1. Secret(required) - Lacework secret access key. Can only be created by administrator using the Lacework console.
2. Host(required) - The base host URL to your Lacework environment. for example, if you connect to the console with url address:
    http://DEMO-HOST.lacework.net/ then you should enter DEMO-HOST as the Host setting value.
3. Key Id(required) - Lacework access Key ID. Can only be created by administrator using the Lacework console.

## Method: Get event details
This method returns all the data about the lacework event specified.

### Parameters:
1. Event ID(required) - The event ID of the requested event. If using the lacework webhook, you can get it from the event_id field.

## Method: GetLatestAWSComplianceReportDetails
This method returns the latest AWS Compliance Report about the AWS account ID and report type specified.

### Parameters:
1. AWS ACCOUNT ID(required) - Specify a 12 digit unique AWS Account ID, for example: 123456789012.
2. Report Type(required) - Specify the Report Type you want to get. You can use the following examples:
- AWS CIS Benchmark and S3 Report
- AWS NIST 800-171 Report
- NIST_800-171_Rev2
- AWS NIST 800-53 Report
- AWS HIPAA Report
- AWS SOC 2 Report
- AWS SOC 2 Report Revision 2
- AWS PCI DSS Report

## Method: GetLatestAzureComplianceReportDetails
This method returns the latest Azure Compliance Report about the Azure subscription ID and report type specified.

### Parameters:
1. AZURE TENANT ID(required) - Specify the Azure tenant id for the report to run.
2. AZURE SUBSCRIPTION ID(required) - Specify the Azure Subscription id for the the retor to run.
3. Report Type(required) - Specify the Report Type you want to get. You can use the following examples:
- Azure CIS Benchmark
- Azure SOC2 Report
- Azure PCI Benchmark

## Method: GetLatestGCPComplianceReportDetails
This method returns the latest GCP Compliance Report about the GCP project ID and report type specified.

### Parameters:
1. GCP ORG ID(required) - Specify the GCP Organizational ID.
2. GCP PROJECT ID(required) - Specify the GCP Project ID.
3. Report Type(required) - Specify the Report Type you want to get. You can use the following examples:
- GCP CIS Benchmark
- GCP HIPAA Report
- GCP SOC2 Report
- GCP PCI Benchmark
