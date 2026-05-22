import json

RESOURCES = [
    {"name": "cloudlens-frontend-798283317872", "type": "S3 Bucket",               "status": "healthy", "module": "s3_cloudfront"},
    {"name": "EVTRN5XDWBZQQ",                   "type": "CloudFront Distribution", "status": "healthy", "module": "s3_cloudfront"},
    {"name": "cloudlens-costs",                  "type": "DynamoDB Table",          "status": "healthy", "module": "dynamodb"},
    {"name": "cloudlens-recommendations",        "type": "DynamoDB Table",          "status": "healthy", "module": "dynamodb"},
    {"name": "cloudlens-lambda-role",            "type": "IAM Role",                "status": "healthy", "module": "iam"},
    {"name": "cloudlens-deploy",                 "type": "IAM User",                "status": "healthy", "module": "iam"},
    {"name": "cloudlens-costs",                  "type": "Lambda Function",         "status": "healthy", "module": "lambda"},
    {"name": "cloudlens-resources",              "type": "Lambda Function",         "status": "healthy", "module": "lambda"},
    {"name": "cloudlens-recommendations",        "type": "Lambda Function",         "status": "healthy", "module": "lambda"},
    {"name": "cloudlens-demo-seed",              "type": "Lambda Function",         "status": "healthy", "module": "lambda"},
    {"name": "cloudlens-api",                    "type": "API Gateway",             "status": "healthy", "module": "api_gateway"},
]

def handler(event, context):
    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
        "body": json.dumps({"resources": RESOURCES, "total": len(RESOURCES)})
    }
