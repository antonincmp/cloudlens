# CloudLens — AWS FinOps Dashboard

A serverless AWS cost monitoring dashboard built as a hands-on learning project while studying for the **AWS Solutions Architect Associate (SAA-C03)** certification and getting familiar with **Terraform**.

**Live demo:** https://d5g735m4r26tn.cloudfront.net

---

## What it does

CloudLens simulates a FinOps dashboard for a fictional company (TechCorp SAS, ~800€/month in AWS spend). It visualizes cloud costs, tracks spending trends across services, and surfaces optimization recommendations.

- **Overview** — monthly cost KPIs, 6-month bar chart, service breakdown donut chart
- **Services** — cost per AWS service with month-over-month variation
- **Recommendations** — FinOps alerts ranked by severity with estimated savings
- **Infrastructure** — live view of the Terraform-managed resources powering CloudLens itself

---

## Stack

| Layer    | Technology                                     |
| -------- | ---------------------------------------------- |
| Frontend | React + Tailwind CSS + Recharts                |
| Hosting  | S3 + CloudFront (OAC)                          |
| Backend  | AWS Lambda (Python 3.12)                       |
| API      | API Gateway REST (with CORS)                   |
| Database | DynamoDB (PAY_PER_REQUEST)                     |
| IaC      | Terraform (modular, remote state on S3)        |
| CI/CD    | GitHub Actions — auto-deploy on push to `main` |

---

## Architecture

```
Browser
  └── CloudFront (HTTPS, cache)
        └── S3 (React SPA)

React app
  └── API Gateway
        ├── GET /costs           → Lambda → DynamoDB
        ├── GET /recommendations → Lambda → DynamoDB
        ├── GET /resources       → Lambda (static)
        └── POST /demo           → Lambda → DynamoDB (seed)
```

Terraform state is stored in S3 with file locking (`use_lockfile = true`). Infrastructure is split into 5 modules: `dynamodb`, `iam`, `lambda`, `api_gateway`, `s3_cloudfront`.

---

## Context

This project was built to practice:

- Writing modular Terraform (providers, modules, outputs, remote state)
- AWS serverless patterns (Lambda + API Gateway + DynamoDB)
- CloudFront with Origin Access Control (no public S3)
- IAM least privilege policies
- CI/CD with GitHub Actions (automated deploy on every push)

---

## Deploy it yourself

```bash
# 1. Bootstrap (one-time manual setup)
# Create S3 bucket for Terraform state + IAM user

# 2. Deploy infrastructure
cd infra
AWS_PROFILE=your-profile terraform init
AWS_PROFILE=your-profile terraform apply

# 3. Seed demo data
aws lambda invoke --function-name cloudlens-demo-seed --payload '{}' /dev/null

# 4. Add GitHub Secrets and push to main
# → CI/CD handles the rest
```
