output "cloudfront_url" {
  value = module.s3_cloudfront.cloudfront_url
}

output "cloudfront_distribution_id" {
  value = module.s3_cloudfront.cloudfront_distribution_id
}

output "api_url" {
  value = module.api_gateway.api_url
}

output "frontend_bucket" {
  value = module.s3_cloudfront.bucket_name
}

output "deploy_user" {
  value = module.iam.deploy_user_name
}
