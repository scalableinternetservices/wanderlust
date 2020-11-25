resource "aws_s3_bucket" "b" {
  bucket = "wanderlust-images"
  acl    = "public-read"
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
}
