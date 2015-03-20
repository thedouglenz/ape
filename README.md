# ape

### What is ape?

ape is a stack recommendation and implementation for node.js applications that uses an Angular.js frontend, PostgreSQL database, and the Express web application framework. ape is better than stacks that use mongodb

### Look at my cool landing page guyz

https://apestack.herokuapp.com

### Getting started with development

1. Use your `postgres` user. `sudo -u postgres psql`
2. Create a new role. `CREATE ROLE test_ape WITH PASSWORD 'test_ape';`
3. Create a new database. `CREATE DATABASE test_ape WITH OWNER test_ape`
4. Exit psql. `\d`
5. Generate the current database schema. `node config/createdb.js`
6. To run: `./bin/www`
7. Then visit localhost:3000
