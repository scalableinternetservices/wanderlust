# module "mysql" {
#   source = "./modules/mysql"
# }

module "s3" {
  source = "./modules/s3"
}

# module "redis" {
#   source = "./modules/redis"
# }

# resource "aws_ecs_cluster" "wanderlust" {
#   name = "wanderlust"
# }

# resource "aws_ecr_repository" "wanderlust" {
#   name                 = "wanderlust"
#   image_tag_mutability = "MUTABLE"
# }

# module "webserver" {
#   source = "./modules/appserver"

#   appserver_tag  = "app-web"
#   ecr_repository = aws_ecr_repository.wanderlust.repository_url
#   ecs_cluster    = aws_ecs_cluster.wanderlust.id

#   mysql_host = module.mysql.host
#   # redis_host = module.redis.host

#   services      = "BACKGROUND"
#   honeycomb_key = "68afd30230260e068cf58e0971a0db09"

#   # ws_url = module.websocket_api.url
# }

# module "rest_api" {
#   source         = "./modules/rest_api"
#   appserver_host = module.webserver.host
# }

# module "websocket_api" {
#   source         = "./modules/websocket_api"
#   appserver_host = module.webserver.host
# }

# module "lambda" {
#   source = "./modules/lambda"

#   honeycomb_key = <insert key here>

#   mysql_host = module.mysql.host
#   redis_host = module.redis.host
# }
