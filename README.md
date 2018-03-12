# MyCritic

Views contains the ejs files for the web pages.
Public contains the javascript for the functionality. Its the directory the server looks for the scripts in. 

## Insall Node & Dependencies & Redis
1. Update `sudo apt-get update`
2. Install node : `sudo apt-get install nodejs-legacy`
3. Install npm : `sudo apt-get install npm`
4. Install Redis: `sudo apt-get install redis-server`
5. Clone the repo: `git clone https://github.com/conley31/MyCritic.git`
6. Change your current working directory to the repo's root directory: `cd MyCritc`
7. Install node dependencies: `sudo npm install`

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
2. Start the node server `sudo npm start`
3. In your browser, navigate to `localhost:8080`

## Modifying the database
* If you would like to modify the database (or just reset it) for whatever reason, follow these steps
1. In a new terminal, log into the MySql console: `mysql -u root -p`, enter the password you created in step 2 of setting up MySql
2. Once logged in, delete the database: `DROP DATABASE mycritic`
3. Recreate the database: `CREATE DATABASE mycritic`
4. exit the MySql shell `exit`
(If you are just resetting the databse, skip to step 6)
5. modify the database setup file to your likings `vim db/setupdb.js`
6. Build the tables: `node db/setupdb.js`

## Additional Info
* If you need to clear the Redis cache, run `redis-cli flushall`
* Upon first loading the top books, the request will be slow. The Goodreads API limits us to 1 request per second, and multiple requests are required to obtain these results.

## Link to blackbox testing environment
https://purdue0-my.sharepoint.com/:f:/g/personal/hagedorj_purdue_edu/Esnm5wcb-YVJjVQJuIt_BKcBX-g9_q0ESGdEfaweEp4ErQ?e=jKiNvG

## Link to server
167.99.95.173:8080
