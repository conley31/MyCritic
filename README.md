# MyCritic

Views contains the ejs files for the web pages.
Public contains the javascript for the functionality. Its the directory the server looks for the scripts in. 

## Insall Node & Dependencies & Redis
1. Install node : `sudo apt-get install nodejs-legacy`
2. Install packages: `sudo npm install`
3. Install Redis: `sudo apt-get install redis-server`

## Setting up MySql
1. Install MySql Server `sudo apt-get install mysql-server`
2. You will be prompted to create a password. This will be your MySql password for connecting to the database
3. Start the MySql service `sudo service mysql start`
4. Login to your server `mysql -u root -p` , enter your password when prompted
5. You are now at the MySql console. To create the database, enter `CREATE DATABASE mycritic;`
6. Open up a normal terminal, navigate to the MyCritic directory, and run `cp db/config.template.json db/config.json`
7. Edit the config file you just copied `vim db/config.json` Add your MySql Password from step 2 in the password field, and save
8. To build the tables, run `node db/setupdb.js`
9. In the MySql console, ensure the tables are there with `USE mycritic;` and `SHOW TABLES;`

## Running The server
1. Start the Redis caching server `redis-server`
2. Start the node server `npm start`

## Additional Info
* If you need to clear the Redis cache, run `redis-cli flushall`
* Upon first loading the top books, the request will be slow. The Goodreads API limits us to 1 request per second, and multiple requests are required to obtain these results.
