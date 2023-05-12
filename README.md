# Railflow website

Production website is hosted under: https://railflow.io.

## Get started

Install dependencies and run the development server:

```bash
npm ci
npm start
```

## Token Middleware

To secure the API endpoints, we have applied a middleware to verify the token in the request header
```bash
# add the token parameter in your request header.
# by default, the token will be set in the gitlab cicd variables.
header: {
    token: your_token_here
}
```

## Disable Basic Auth

To disable basic auth, go to nginx/nginx.conf and comment below lines.

```
#    auth_basic "Restricted Content";
#    auth_basic_user_file /etc/nginx/.htpasswd;
```

## Developmemt

Run the development server:

```bash
npm run develop
```

Build and serve production bundle:

```bash
npm run build
npm run serve
```

## Dockerize your website locally

Follow below 2 steps to build the Docker image:

```bash
# Step1: build the resouce locally
npm install
npm run build

# Step2: build the docker image using docker-compose
docker-compose build
```

Run the Docker container:

```bash
# run below command to boot up your website
docker-compose up -d

# if you have made any change to the website, please run below command to update the latest build to docker container
npm run build
docker-compose restart
```

## Production

Push commits to `development` branch.
For deployment merge the `development` into `master`.

## API Calls

### /register

The "Register" page calls the following endpoint:

```
POST /contact
```

### /get-quote

The "Get Quote" page calls the following endpoints:

```
On the 1st step of the form:
POST /contact

On the 2nd step of the form:
PUT /account

On the 3rd step of the form:
POST /quote
```

### /buy-now

The "Buy now" page calls the following endpoints:

```
On the 1st step of the form:
POST /contact

On the 2nd step of the form:
PUT /account

On the 3rd step of the form:
POST /invoice
```



## Build Locally and run it in your local

install docker and doctl 
configure doctl with your apitoken to access digital ocean docker repository.
and run below command to build from the root of repository -

export branch=<your branch name>
```
docker build -t webui:latest .
```
Once image is build then run docker container to access webapp in browser -
```
docker run --rm -it -e branch=$branch --name webui -p 80:80 webui:latest
```
