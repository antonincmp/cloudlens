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
