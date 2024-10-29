**TODO TEST APP - Laravel and Vue3**

![1730239006797](image/READMEcopy/1730239006797.png)

FRONTEND

- npm install
- npm run dev

BACKEND

- create a database MySQL or SQLITE
- open .env file and configure database settings

  example

  ![1730239231011](https://file+.vscode-resource.vscode-cdn.net/Users/jeraldbianan/Desktop/Web%20Development/Fullstack/Test%20Todo/image/READMEcopy/1730239231011.png)

if you are using SQLite all you have to do is comment out everything except DB_CONNECTION, you need to create a database file in database folder in your laravel root directory

![1730239461787](image/READMEcopy/1730239461787.png)

![1730239348729](image/READMEcopy/1730239348729.png)

- run command php artisan migrate, for database migration
- run command php artisan db:seed, to generate dummy data in the todos table
- lastly run command, php artisan serve
