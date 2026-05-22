output "lambda_role_arn" {
  value = aws_iam_role.lambda.arn
}

output "deploy_user_name" {
  value = aws_iam_user.deploy.name
}
