import json
import os
import boto3
from decimal import Decimal

COSTS_DATA = [
    {"month": "2025-11", "service": "EC2",        "cost": Decimal("312.00"), "region": "eu-west-3"},
    {"month": "2025-11", "service": "RDS",        "cost": Decimal("171.60"), "region": "eu-west-3"},
    {"month": "2025-11", "service": "S3",         "cost": Decimal("78.00"),  "region": "eu-west-3"},
    {"month": "2025-11", "service": "Lambda",     "cost": Decimal("62.40"),  "region": "eu-west-3"},
    {"month": "2025-11", "service": "CloudFront", "cost": Decimal("39.00"),  "region": "global"},
    {"month": "2025-11", "service": "Autres",     "cost": Decimal("117.00"), "region": "eu-west-3"},

    {"month": "2025-12", "service": "EC2",        "cost": Decimal("328.00"), "region": "eu-west-3"},
    {"month": "2025-12", "service": "RDS",        "cost": Decimal("180.40"), "region": "eu-west-3"},
    {"month": "2025-12", "service": "S3",         "cost": Decimal("82.00"),  "region": "eu-west-3"},
    {"month": "2025-12", "service": "Lambda",     "cost": Decimal("65.60"),  "region": "eu-west-3"},
    {"month": "2025-12", "service": "CloudFront", "cost": Decimal("41.00"),  "region": "global"},
    {"month": "2025-12", "service": "Autres",     "cost": Decimal("123.00"), "region": "eu-west-3"},

    {"month": "2026-01", "service": "EC2",        "cost": Decimal("318.00"), "region": "eu-west-3"},
    {"month": "2026-01", "service": "RDS",        "cost": Decimal("174.90"), "region": "eu-west-3"},
    {"month": "2026-01", "service": "S3",         "cost": Decimal("79.50"),  "region": "eu-west-3"},
    {"month": "2026-01", "service": "Lambda",     "cost": Decimal("63.60"),  "region": "eu-west-3"},
    {"month": "2026-01", "service": "CloudFront", "cost": Decimal("39.75"),  "region": "global"},
    {"month": "2026-01", "service": "Autres",     "cost": Decimal("119.25"), "region": "eu-west-3"},

    {"month": "2026-02", "service": "EC2",        "cost": Decimal("324.00"), "region": "eu-west-3"},
    {"month": "2026-02", "service": "RDS",        "cost": Decimal("178.20"), "region": "eu-west-3"},
    {"month": "2026-02", "service": "S3",         "cost": Decimal("81.00"),  "region": "eu-west-3"},
    {"month": "2026-02", "service": "Lambda",     "cost": Decimal("64.80"),  "region": "eu-west-3"},
    {"month": "2026-02", "service": "CloudFront", "cost": Decimal("40.50"),  "region": "global"},
    {"month": "2026-02", "service": "Autres",     "cost": Decimal("121.50"), "region": "eu-west-3"},

    {"month": "2026-03", "service": "EC2",        "cost": Decimal("334.00"), "region": "eu-west-3"},
    {"month": "2026-03", "service": "RDS",        "cost": Decimal("183.70"), "region": "eu-west-3"},
    {"month": "2026-03", "service": "S3",         "cost": Decimal("83.50"),  "region": "eu-west-3"},
    {"month": "2026-03", "service": "Lambda",     "cost": Decimal("66.80"),  "region": "eu-west-3"},
    {"month": "2026-03", "service": "CloudFront", "cost": Decimal("41.75"),  "region": "global"},
    {"month": "2026-03", "service": "Autres",     "cost": Decimal("125.25"), "region": "eu-west-3"},

    {"month": "2026-04", "service": "EC2",        "cost": Decimal("319.00"), "region": "eu-west-3"},
    {"month": "2026-04", "service": "RDS",        "cost": Decimal("175.45"), "region": "eu-west-3"},
    {"month": "2026-04", "service": "S3",         "cost": Decimal("79.75"),  "region": "eu-west-3"},
    {"month": "2026-04", "service": "Lambda",     "cost": Decimal("63.80"),  "region": "eu-west-3"},
    {"month": "2026-04", "service": "CloudFront", "cost": Decimal("39.90"),  "region": "global"},
    {"month": "2026-04", "service": "Autres",     "cost": Decimal("119.60"), "region": "eu-west-3"},
]

RECOMMENDATIONS_DATA = [
    {
        "id": "rec-001",
        "severity": "critical",
        "title": "2 instances EC2 t3.medium stoppées depuis 14 jours",
        "description": "Les instances i-0a1b2c3d4e et i-0f1e2d3c4b sont stoppées depuis le 08/05/2026. Vous payez toujours les volumes EBS attachés.",
        "resource_type": "EC2",
        "savings": Decimal("67.00"),
        "action": "Terminer les instances ou créer des AMIs de sauvegarde avant suppression."
    },
    {
        "id": "rec-002",
        "severity": "warning",
        "title": "3 Elastic IPs non associées",
        "description": "3 adresses IP élastiques allouées ne sont associées à aucune ressource. AWS facture les EIPs non utilisées.",
        "resource_type": "EC2",
        "savings": Decimal("11.00"),
        "action": "Libérer les Elastic IPs inutilisées depuis la console EC2."
    },
    {
        "id": "rec-003",
        "severity": "warning",
        "title": "Volume EBS 100GB non attaché",
        "description": "Le volume vol-0123456789abcdef0 (100GB gp3) n'est attaché à aucune instance depuis 21 jours.",
        "resource_type": "EBS",
        "savings": Decimal("10.00"),
        "action": "Créer un snapshot puis supprimer le volume si les données ne sont plus nécessaires."
    },
    {
        "id": "rec-004",
        "severity": "info",
        "title": "Lambda cloudlens-costs : timeout trop élevé",
        "description": "Le timeout est configuré à 30s mais la durée moyenne d'exécution est de 1.2s. Un timeout excessif bloque inutilement la concurrence.",
        "resource_type": "Lambda",
        "savings": Decimal("0.00"),
        "action": "Réduire le timeout à 10s pour libérer de la concurrence Lambda plus rapidement."
    },
]

def handler(event, context):
    dynamodb = boto3.resource("dynamodb", region_name=os.environ.get("AWS_REGION", "eu-west-3"))

    costs_table = dynamodb.Table(os.environ["COSTS_TABLE_NAME"])
    rec_table   = dynamodb.Table(os.environ["RECOMMENDATIONS_TABLE_NAME"])

    with costs_table.batch_writer() as batch:
        for item in COSTS_DATA:
            batch.put_item(Item=item)

    with rec_table.batch_writer() as batch:
        for item in RECOMMENDATIONS_DATA:
            batch.put_item(Item=item)

    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
        "body": json.dumps({"message": "DynamoDB seeded successfully", "costs": len(COSTS_DATA), "recommendations": len(RECOMMENDATIONS_DATA)})
    }
