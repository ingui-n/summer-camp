### Setup MySQL & Adminer

Software requirements: `docker, docker-compose`
1. Add password to MYSQL_ROOT_PASSWORD env at `.docker/db/docker-compose.yml`
2. Run `docker-compose up` in that directory
3. Adminer will be at [http://localhost:9025](http://localhost:9025), MySQL: [http://localhost:3300](http://localhost:3300)

### Setup React App In Development Mode

Software requirements: `nodejs >= 16.0.0, npm >= 8.0.0, cloudflared`

[Cloudflared download link](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/)

1. Rename `.env-template` in to `.env` and set the environments
2. Run `npm install`
3. After installation run `npm run dev` to run development server. 
4. The server should run on [http://localhost:3000](http://localhost:3000)

**Don't forget to run `prisma db pull && prisma generate` after db update!**

Make field unique `ALTER TABLE 'table' ADD UNIQUE ('field')`