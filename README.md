# MyCritic

Views contains the ejs files for the web pages.
Public contains the javascript for the functionality. Its the directory the server looks for the scripts in. 

## Insall Node & Dependencies
1. Install node : `sudo apt-get install nodejs-legacy`
2. Install packages: `sudo npm install`

## Setting up MySql
1. Install MySql Server `sudo apt-get install mysql-server`
2. You will be prompted to create a password. This will be your MySql password for connecting to the database
3. Start the MySql service `sudo service mysql start`
4. Login to your server `mysql -u root -p` , enter your password when prompted
5. You are now at the MySql console. To create the database, enter `CREATE DATABASE mycritic;`
6. Open up `/MyCritic/db/setupdb.js` and enter the MySql password you created.
6. Now, in your normal terminal, while in the /MyCritic directory, run `node db/setupdb.js` This builds the Tables.
7. In the MySql console, ensure the tables are there with `USE mycritic;` and `SHOW TABLES;` 
