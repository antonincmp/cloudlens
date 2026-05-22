output "costs_table_name" {
  value = aws_dynamodb_table.costs.name
}

output "costs_table_arn" {
  value = aws_dynamodb_table.costs.arn
}

output "recommendations_table_name" {
  value = aws_dynamodb_table.recommendations.name
}

output "recommendations_table_arn" {
  value = aws_dynamodb_table.recommendations.arn
}
