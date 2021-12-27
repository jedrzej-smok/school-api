# projektZBD

# First configuartion
1. Download and install Node.js, NPM and Xampp.
2. Run Xampp Control Panel
    - start Apache
    - start MySql
3. Open http://localhost/phpmyadmin/ and select menu option databases
    - create database *your_db_name*
4. Clone project and open projektZBD
> git clone https://github.com/jedrzejSmok/projektZBD.git
> cd projektZBD
5. Create **.env** file with content:
PORT=*your_port*
DB_HOST=*your_db_host*
DB_USER=*your_db_username*
DB_PASSWORD=*your_db_password*
DB_NAME=*your_db_name*
6. Install required packages:
> npm i

