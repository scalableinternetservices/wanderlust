import argparse
import random
from math import sqrt, pi, cos, sin
def rstring(length: int) -> str:
  chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'
  return ''.join([random.choice(chars) for _ in range(length)])

def main():
  parser = argparse.ArgumentParser()
  parser.add_argument('--number', type=int, required=True)
  parser.add_argument('--latitude', type=float, default=34.0156128)
  parser.add_argument('--longitude', type=float, default=-118.5030432)
  parser.add_argument('--radius', type=float, required=True)
  parser.add_argument('--baseid', type=int, default=999)
  parser.add_argument('--minart', type=int, default=0)
  parser.add_argument('--maxart', type=int, default=5)
  parser.add_argument('--artpercent', type=float, default=0.35)
  args = parser.parse_args()
  print("INSERT INTO user (id, email, username, password) VALUES ")
  print(',\n'.join(["({}, '{}', 'test_{}', '{}')".format(args.baseid + i,
                                                        rstring(20)+"@gmail.com",
                                                        rstring(6),
                                                        'password') for i in range(args.number)]))
  print(';')
  art = []
  for i in range(args.baseid, args.baseid + args.number):
    if random.random() < args.artpercent:
      for k in range(random.randint(args.minart, args.maxart + 1)):
        r = args.radius * sqrt(random.random())
        theta = random.random() * 2 * pi
        art.append("('test_art', '{}', '{}', 'https://wanderlust-images.s3-us-west-2.amazonaws.com/f87d1363-cfad-4270-8f17-30c2fe671306', 1, {})".format(
                    args.latitude + r * cos(theta),
                    args.longitude + r * sin(theta),
                    i))
  if art:
    print("INSERT INTO art (name, locationLat, locationLng, uri, type, creatorId) values")
    print(',\n'.join(art))
    print(";")


if __name__ == '__main__':
  main()

# Run with python3 server/src/db/generate_random_users.py --minart=1 --maxart=15 --number 100000  --radius 1 > server/src/db/migrations/V1.4__BigData.sql
# for the SQL load test
