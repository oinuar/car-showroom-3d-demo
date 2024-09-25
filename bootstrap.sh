#!/bin/bash
set -e

#
# Some useful commands that were used to create this project.
#

sudo apt-get install -y dotnet-sdk-8.0
dotnet new webapi --output api
dotnet new xunit --output api.tests
dotnet new classlib --output dal
dotnet new xunit --output dal.tests
docker run -v "$(pwd):$(pwd)" -w "$(pwd)" --user 1000 --entrypoint="" -it node:latest npx create-react-app web --template typescript

dotnet ef migrations add InitialCreate --project dal --startup-project api
dotnet ef database update --project dal --startup-project api
npx swagger-typescript-api -p src/api/swagger.json -o src/api --modular
docker exec -it 6eb0172be5c7 pg_dump -a -n public -T "public.__EFMigrationsHistory" -U postgres postgres > dump.sql
docker exec -i 96fb044746a4 psql -U postgres -d postgres < dump.sql
