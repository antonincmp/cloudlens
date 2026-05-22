data "archive_file" "costs" {
  type        = "zip"
  source_file = "${path.root}/../backend/handlers/costs.py"
  output_path = "${path.module}/costs.zip"
}

data "archive_file" "resources" {
  type        = "zip"
  source_file = "${path.root}/../backend/handlers/resources.py"
  output_path = "${path.module}/resources.zip"
}

data "archive_file" "recommendations" {
  type        = "zip"
  source_file = "${path.root}/../backend/handlers/recommendations.py"
  output_path = "${path.module}/recommendations.zip"
}

data "archive_file" "demo_seed" {
  type        = "zip"
  source_file = "${path.root}/../backend/handlers/demo_seed.py"
  output_path = "${path.module}/demo_seed.zip"
}

resource "aws_lambda_function" "costs" {
  filename         = data.archive_file.costs.output_path
  function_name    = "${var.project}-costs"
  role             = var.lambda_role_arn
  handler          = "costs.handler"
  runtime          = "python3.12"
  timeout          = 30
  source_code_hash = data.archive_file.costs.output_base64sha256

  environment {
    variables = {
      DEMO_MODE  = "true"
      TABLE_NAME = var.costs_table_name
    }
  }
}

resource "aws_lambda_function" "resources" {
  filename         = data.archive_file.resources.output_path
  function_name    = "${var.project}-resources"
  role             = var.lambda_role_arn
  handler          = "resources.handler"
  runtime          = "python3.12"
  timeout          = 30
  source_code_hash = data.archive_file.resources.output_base64sha256

  environment {
    variables = {
      DEMO_MODE  = "true"
      TABLE_NAME = var.costs_table_name
    }
  }
}

resource "aws_lambda_function" "recommendations" {
  filename         = data.archive_file.recommendations.output_path
  function_name    = "${var.project}-recommendations"
  role             = var.lambda_role_arn
  handler          = "recommendations.handler"
  runtime          = "python3.12"
  timeout          = 30
  source_code_hash = data.archive_file.recommendations.output_base64sha256

  environment {
    variables = {
      DEMO_MODE  = "true"
      TABLE_NAME = var.recommendations_table_name
    }
  }
}

resource "aws_lambda_function" "demo_seed" {
  filename         = data.archive_file.demo_seed.output_path
  function_name    = "${var.project}-demo-seed"
  role             = var.lambda_role_arn
  handler          = "demo_seed.handler"
  runtime          = "python3.12"
  timeout          = 60
  source_code_hash = data.archive_file.demo_seed.output_base64sha256

  environment {
    variables = {
      COSTS_TABLE_NAME           = var.costs_table_name
      RECOMMENDATIONS_TABLE_NAME = var.recommendations_table_name
    }
  }
}

resource "aws_cloudwatch_log_group" "costs" {
  name              = "/aws/lambda/${aws_lambda_function.costs.function_name}"
  retention_in_days = 30
}

resource "aws_cloudwatch_log_group" "resources" {
  name              = "/aws/lambda/${aws_lambda_function.resources.function_name}"
  retention_in_days = 30
}

resource "aws_cloudwatch_log_group" "recommendations" {
  name              = "/aws/lambda/${aws_lambda_function.recommendations.function_name}"
  retention_in_days = 30
}

resource "aws_cloudwatch_log_group" "demo_seed" {
  name              = "/aws/lambda/${aws_lambda_function.demo_seed.function_name}"
  retention_in_days = 30
}
