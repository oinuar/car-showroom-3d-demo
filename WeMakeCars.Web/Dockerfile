FROM node:lts-slim AS build

# Install JRE 11 that is required by the SonarQube scanner
#RUN mkdir -p /usr/share/man/man1 && apt-get update && apt-get install --no-install-recommends -y openjdk-11-jre && apt-get clean

# Update NPM and install SonarQube for static code analysis
#RUN npm install -g npm sonarqube-scanner

#RUN apt-get update -y &&\
#    apt-get install -y --no-install-recommends python build-essential &&\
#    apt-get clean -y

WORKDIR /usr/local/app

# Copy application build files
COPY package.json .
COPY package-lock.json .

# Install dependencies
RUN npm install

# Audit all packages
RUN npm audit --audit-level=critical

# Copy application sources
COPY tsconfig.json .
COPY tailwind.config.js .
COPY src src/
COPY public public/

# Run dev server by default
ENTRYPOINT [ "npm", "run" ]
CMD [ "dev" ]


FROM build AS qa

# Run tests
RUN CI=true npm run test


FROM qa AS publish

# Build the application.
RUN npm run build


FROM nginx:alpine

# Copy wwwroot
COPY --from=publish /usr/local/app/build /usr/share/nginx/html
