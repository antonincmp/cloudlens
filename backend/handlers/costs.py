import json
import os
import boto3
from boto3.dynamodb.conditions import Key
from decimal import Decimal

class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return float(obj)
        return super().default(obj)

def handler(event, context):
    dynamodb   = boto3.resource("dynamodb", region_name=os.environ.get("AWS_REGION", "eu-west-3"))
    table      = dynamodb.Table(os.environ["TABLE_NAME"])

    result     = table.scan()
    items      = result.get("Items", [])

    by_month = {}
    for item in items:
        month = item["month"]
        if month not in by_month:
            by_month[month] = {"month": month, "total": Decimal("0"), "services": {}}
        by_month[month]["services"][item["service"]] = item["cost"]
        by_month[month]["total"] += item["cost"]

    months = sorted(by_month.values(), key=lambda x: x["month"])

    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
        "body": json.dumps({"months": months}, cls=DecimalEncoder)
    }
