import json
import os
import boto3
from decimal import Decimal

class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return float(obj)
        return super().default(obj)

SEVERITY_ORDER = {"critical": 0, "warning": 1, "info": 2}

def handler(event, context):
    dynamodb = boto3.resource("dynamodb", region_name=os.environ.get("AWS_REGION", "eu-west-3"))
    table    = dynamodb.Table(os.environ["TABLE_NAME"])

    result = table.scan()
    items  = result.get("Items", [])

    items.sort(key=lambda x: SEVERITY_ORDER.get(x.get("severity", "info"), 99))

    total_savings = sum(float(item.get("savings", 0)) for item in items)

    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
        "body": json.dumps({"recommendations": items, "total_savings": total_savings}, cls=DecimalEncoder)
    }
