terraform {
  required_version = ">= 1.6"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    bucket         = "cloudlens-tfstate-ac"
    key            = "cloudlens/terraform.tfstate"
    region         = "eu-west-3"
    use_lockfile   = true
    encrypt        = true
  }
}

provider "aws" {
  region  = var.aws_region
  profile = "cloudlens"

  default_tags {
    tags = {
      Project   = "cloudlens"
      ManagedBy = "terraform"
    }
  }
}

module "dynamodb" {
  source      = "./modules/dynamodb"
  project     = var.project
  environment = var.environment
}

module "iam" {
  source                    = "./modules/iam"
  project                   = var.project
  environment               = var.environment
  costs_table_arn           = module.dynamodb.costs_table_arn
  recommendations_table_arn = module.dynamodb.recommendations_table_arn
}

module "lambda" {
  source                     = "./modules/lambda"
  project                    = var.project
  environment                = var.environment
  lambda_role_arn            = module.iam.lambda_role_arn
  costs_table_name           = module.dynamodb.costs_table_name
  recommendations_table_name = module.dynamodb.recommendations_table_name
}

module "api_gateway" {
  source                            = "./modules/api_gateway"
  project                           = var.project
  environment                       = var.environment
  lambda_costs_arn                  = module.lambda.costs_function_arn
  lambda_resources_arn              = module.lambda.resources_function_arn
  lambda_recommendations_arn        = module.lambda.recommendations_function_arn
  lambda_demo_seed_arn              = module.lambda.demo_seed_function_arn
  lambda_costs_invoke_arn           = module.lambda.costs_function_invoke_arn
  lambda_resources_invoke_arn       = module.lambda.resources_function_invoke_arn
  lambda_recommendations_invoke_arn = module.lambda.recommendations_function_invoke_arn
  lambda_demo_seed_invoke_arn       = module.lambda.demo_seed_function_invoke_arn
}

module "s3_cloudfront" {
  source      = "./modules/s3_cloudfront"
  project     = var.project
  environment = var.environment
}
