resource "aws_dynamodb_table" "costs" {
  name         = "${var.project}-costs"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "month"
  range_key    = "service"

  attribute {
    name = "month"
    type = "S"
  }

  attribute {
    name = "service"
    type = "S"
  }
}

resource "aws_dynamodb_table" "recommendations" {
  name         = "${var.project}-recommendations"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "id"

  attribute {
    name = "id"
    type = "S"
  }
}
