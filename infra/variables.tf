  variable "aws_region" {
    description = "Région AWS"
    type        = string
    default     = "eu-west-3"
  }

  variable "project" {
    description = "Nom du projet"
    type        = string
    default     = "cloudlens"
  }

  variable "environment" {
    description = "Environnement (prod, dev...)"
    type        = string
    default     = "prod"
  }