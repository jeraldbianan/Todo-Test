**TODO TEST APP - Laravel and Vue3**

![1730239006797](image/READMEcopy/1730239006797.png)

FRONTEND

- npm install
- npm run dev

BACKEND

- create a database MySQL or SQLITE
- open .env file and configure database settings

  example

 <img width="272" alt="Screenshot 2024-10-30 at 5 59 20 AM" src="https://github.com/user-attachments/assets/436c6936-5f22-4698-8ffb-1347596f527c">

if you are using SQLite all you have to do is comment out everything except DB_CONNECTION, you need to create a database file in database folder in your laravel root directory

![1730239461787](image/READMEcopy/1730239461787.png)

![1730239348729](image/READMEcopy/1730239348729.png)

- run command php artisan migrate, for database migration
- run command php artisan db:seed, to generate dummy data in the todos table
- lastly run command, php artisan serve
