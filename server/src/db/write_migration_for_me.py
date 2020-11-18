import sys
if len(sys.argv) < 3 :
  sys.stderr.write("Please give me two coordinates.\n")
  sys.exit(1)

baseLat = float(sys.argv[1])
baseLng = float(sys.argv[2])

print("insert into `art` (`name`, `locationLat`, `locationLng`, `uri`, `type`, `creatorId`) values")
for i in range(0, 10):
  for j in range(0, 10):
    print(f"  ('ART', {baseLat + (i - 5) * 0.01}, {baseLng + (j - 5) * 0.01}, 'www.google.com', 1, 1),")

print(f"  ('ART', {baseLat + 6 * 0.01}, {baseLng + 6 * 0.01}, 'www.google.com', 1, 1);")
