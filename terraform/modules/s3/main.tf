resource "aws_s3_bucket" "b" {
  bucket = "wanderlust-images"
  acl    = "public-read"

  tags = {
    Name        = "Images"
    Environment = "Dev"
  }
}
