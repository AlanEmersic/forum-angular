# Forum

## Frontend - Angular
https://github.com/AlanEmersic/forum-angular

Install all packages using command:
`npm i`
or
`npm install`

Run using command:
`ng s -o`
or
`npm start`

## Backend - Spring Boot REST API
https://github.com/AlanEmersic/forum

Run start application

### Users:

username: admin, password: test

username: user, password: test

### H2-console:
http://localhost:8080/h2-console/

#### SQL queries
- get all users:
    ```sql 
    SELECT * FROM USER
    ```

- get all posts:
    ```sql 
    SELECT * FROM POST
    ```
  
- get all users with posts:
    ```sql 
    SELECT * FROM USER JOIN POST ON USER.ID = POST.USERID
    ```

- get all users with roles:
    ```sql 
    SELECT * FROM USER JOIN USER_AUTHORITY ON USER.ID = USER_AUTHORITY.USER_ID JOIN AUTHORITY ON USER_AUTHORITY.AUTHORITY_ID = AUTHORITY.ID
    ```