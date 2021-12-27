# projektZBD

# First configuartion
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
    > git clone https://github.com/jedrzejSmok/projektZBD.git

    > cd projektZBD
5. Create **.env** file with content:
    ```
    PORT=<your_port>
    DB_HOST=<your_db_host>
    DB_USER=<your_db_username>
    DB_PASSWORD=<your_db_password>
    DB_NAME=<your_db_name>
    ```

6. Run script creating configDatabase.json
    > node createDbJson.js

7. Install required packages:
    > npm install

# Run application 
1. Before first starting application run Xampp Control Panel and start Apache and MySql.
2. Optional to clean database run scripta and recreate exampled content:
    > node cleanDb.js
3. After last closing application run Xampp Control Panel and stop Apache and MySql.

4. Run the application 
    > node app.js
