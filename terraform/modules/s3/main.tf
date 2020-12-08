resource "aws_s3_bucket" "b" {
  bucket = "wanderlust-images"
  acl    = "public-read"
  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET"]
    allowed_origins = ["http://localhost:3000", "https://wanderlust.cloudcity.computer"]
  }
}
resource "aws_s3_bucket" "dev" {
  bucket = "wanderlust-images-dev"
  acl    = "public-read"
  lifecycle_rule {
    id      = "dev-testing"
    enabled = true
    expiration {
      days = 1
    }
  }
  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET"]
    allowed_origins = ["http://localhost:3000", "https://wanderlust.cloudcity.computer"]
  }
}
