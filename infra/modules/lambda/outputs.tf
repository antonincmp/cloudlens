output "costs_function_arn" {
  value = aws_lambda_function.costs.arn
}

output "resources_function_arn" {
  value = aws_lambda_function.resources.arn
}

output "recommendations_function_arn" {
  value = aws_lambda_function.recommendations.arn
}

output "demo_seed_function_arn" {
  value = aws_lambda_function.demo_seed.arn
}

output "costs_function_invoke_arn" {
  value = aws_lambda_function.costs.invoke_arn
}

output "resources_function_invoke_arn" {
  value = aws_lambda_function.resources.invoke_arn
}

output "recommendations_function_invoke_arn" {
  value = aws_lambda_function.recommendations.invoke_arn
}

output "demo_seed_function_invoke_arn" {
  value = aws_lambda_function.demo_seed.invoke_arn
}
