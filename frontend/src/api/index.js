const API_URL = import.meta.env.VITE_API_URL || ""

const MOCK_COSTS = {
  months: [
    { month: "2025-11", total: 780,  services: { EC2: 312,  RDS: 171.6, S3: 78,   Lambda: 62.4, CloudFront: 39,   Autres: 117 } },
    { month: "2025-12", total: 820,  services: { EC2: 328,  RDS: 180.4, S3: 82,   Lambda: 65.6, CloudFront: 41,   Autres: 123 } },
    { month: "2026-01", total: 795,  services: { EC2: 318,  RDS: 174.9, S3: 79.5, Lambda: 63.6, CloudFront: 39.75,Autres: 119.25 } },
    { month: "2026-02", total: 810,  services: { EC2: 324,  RDS: 178.2, S3: 81,   Lambda: 64.8, CloudFront: 40.5, Autres: 121.5 } },
    { month: "2026-03", total: 835,  services: { EC2: 334,  RDS: 183.7, S3: 83.5, Lambda: 66.8, CloudFront: 41.75,Autres: 125.25 } },
    { month: "2026-04", total: 797,  services: { EC2: 319,  RDS: 175.45,S3: 79.75,Lambda: 63.8, CloudFront: 39.9, Autres: 119.1 } },
  ]
}

const MOCK_RECOMMENDATIONS = {
  recommendations: [
    { id: "rec-001", severity: "critical", title: "2 instances EC2 t3.medium stoppées depuis 14 jours", description: "Les instances i-0a1b2c3d4e et i-0f1e2d3c4b sont stoppées depuis le 08/05/2026. Vous payez toujours les volumes EBS attachés.", resource_type: "EC2", savings: 67, action: "Terminer les instances ou créer des AMIs de sauvegarde avant suppression." },
    { id: "rec-002", severity: "warning",  title: "3 Elastic IPs non associées", description: "3 adresses IP élastiques allouées ne sont associées à aucune ressource. AWS facture les EIPs non utilisées.", resource_type: "EC2", savings: 11, action: "Libérer les Elastic IPs inutilisées depuis la console EC2." },
    { id: "rec-003", severity: "warning",  title: "Volume EBS 100GB non attaché", description: "Le volume vol-0123456789abcdef0 (100GB gp3) n'est attaché à aucune instance depuis 21 jours.", resource_type: "EBS", savings: 10, action: "Créer un snapshot puis supprimer le volume si les données ne sont plus nécessaires." },
    { id: "rec-004", severity: "info",     title: "Lambda cloudlens-costs : timeout trop élevé", description: "Le timeout est configuré à 30s mais la durée moyenne d'exécution est de 1.2s.", resource_type: "Lambda", savings: 0, action: "Réduire le timeout à 10s pour libérer de la concurrence Lambda plus rapidement." },
  ],
  total_savings: 88
}

const MOCK_RESOURCES = {
  resources: [
    { name: "cloudlens-frontend-798283317872", type: "S3 Bucket",               status: "healthy", module: "s3_cloudfront" },
    { name: "EVTRN5XDWBZQQ",                   type: "CloudFront Distribution", status: "healthy", module: "s3_cloudfront" },
    { name: "cloudlens-costs",                  type: "DynamoDB Table",          status: "healthy", module: "dynamodb" },
    { name: "cloudlens-recommendations",        type: "DynamoDB Table",          status: "healthy", module: "dynamodb" },
    { name: "cloudlens-lambda-role",            type: "IAM Role",                status: "healthy", module: "iam" },
    { name: "cloudlens-deploy",                 type: "IAM User",                status: "healthy", module: "iam" },
    { name: "cloudlens-costs",                  type: "Lambda Function",         status: "healthy", module: "lambda" },
    { name: "cloudlens-resources",              type: "Lambda Function",         status: "healthy", module: "lambda" },
    { name: "cloudlens-recommendations",        type: "Lambda Function",         status: "healthy", module: "lambda" },
    { name: "cloudlens-demo-seed",              type: "Lambda Function",         status: "healthy", module: "lambda" },
    { name: "cloudlens-api",                    type: "API Gateway",             status: "healthy", module: "api_gateway" },
  ],
  total: 11
}

async function apiFetch(path, mock) {
  if (!API_URL) return mock
  try {
    const res = await fetch(`${API_URL}${path}`)
    if (!res.ok) return mock
    return res.json()
  } catch {
    return mock
  }
}

export const fetchCosts           = () => apiFetch("/costs",           MOCK_COSTS)
export const fetchRecommendations = () => apiFetch("/recommendations", MOCK_RECOMMENDATIONS)
export const fetchResources       = () => apiFetch("/resources",       MOCK_RESOURCES)
