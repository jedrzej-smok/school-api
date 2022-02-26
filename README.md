# school-api
## Table of contents
* [Goal of the project](#goal-of-the-project)
* [Technologies](#technologies)
* [Local installation and launching backend-api](#first-configuartion)
## Goal of the project:
Project is simple backend in  REST API.
A school-api allows to create user account on school platform. Users can get acquainted with  the courses that the school offers and enroll in these courses. Users have access to their courses which allow to get recordings  and progress of course.

The school-api allow for manageing school with instructor account (Currently there is an instructor account. Type "lena Nowak@example.com" and "lena" to login.) A instructor can create new course or modify existing course for example providing content of course. 

The school-api allows  to perform CRUD operations on all data used in the application with an administrator account.


## Technologies:
* express: 4.17.1<br>
* sequelize: 6.12.0-alpha.1<br>
* mysql2: 2.3.3<br>
* bcrypt: 5.0.1<br>
* cookie-parser: 1.4.6<br>
* dotenv: 10.0.0<br>
* method-override: 3.0.0<br>

## First configuartion
1. Download and install Node.js, NPM and Xampp.
2. Run Xampp Control Panel
    - start Apache
    - start MySql
3. Open http://localhost/phpmyadmin/ 
    - select menu option databases
    - create database *your_db_name*
    - select and open created  already database *your_db_name* 
    - select menu option sql
    - paste sql query contained in **projektZBD/utils/procedureFunction.sql**
    - execute it 

4. Clone project and open projektZBD
    > git clone https://github.com/jedrzejSmok/school-api.git

    > cd school-api
5. Create **.env** file with content:
    ```
    PORT=<your_port>
    DB_HOST=<your_db_host>
    DB_USER=<your_db_username>
    DB_PASSWORD=<your_db_password>
    DB_NAME=<your_db_name>
    ```

6. Install required packages:
    ```
    npm install
    ```

7. Run script creating configDatabase.json
    ```
    node createDbJson.js
    ```



# Run the school-api
1. Before first starting application run Xampp Control Panel and start Apache and MySql.
2. Optional to clean database run script and recreate exampled content:
   ```
   node cleanDb.js
   ```
3. Run the application 
   ```
   node app.js
   ```
