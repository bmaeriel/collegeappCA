<p align="center"><img src="https://res.cloudinary.com/dtfbvvkyp/image/upload/v1566331377/laravel-logolockup-cmyk-red.svg" width="400"></p>
<p align="center"><img width="100" src="https://vuejs.org/images/logo.png" alt="Vue logo"></p>

## Steps to install the application:

- Create a database in PhpMyAdmin
- Duplicate '**.env.example**' file and name it '**.env**'
- Set *DB_DATABASE*, *DB_USERNAME*, and *DB_PASSWORD* to the database created

Open the application folder in the terminal OR cd into the application folder.
Run the following in your terminal (Git Bash).

- composer install
- npm install
- php artisan key:generate
- php artisan passport:install

Migrate and seed the database:

- php artisan migrate --seed
