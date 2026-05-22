import boto3
import os

def get_dynamodb():
    return boto3.resource("dynamodb", region_name=os.environ.get("AWS_REGION", "eu-west-3"))

def response(status_code, body):
    import json
    return {
        "statusCode": status_code,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        "body": json.dumps(body)
    }
