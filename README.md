# VALEX 💳
<h2 align="start" style='color:#ED8F0C; font-size:25px;' width="20%">
  Benefit Card API 💸
</h2>
  
<br/>

## How to install and run on terminal


#### It is necessary to install node: https://nodejs.org/en/download/

<br/>

### - Clone repository
```
  git clone https://github.com/FranciscaFigueiredo/Valex-API.git
```

<br/>

### - Install dependencies

```
  npm i
```
or
```
  npm install
```

<br/>

### - Start

```
  npm run start:dev
```
<br/>

### - Prepare the backend and database

- In the open terminal in the project folder, enter the database folder

    ```
    cd database/
    ```

 - and run the command
    ```
    bash ./connect-database
    ```

- Edit the .env.example file with the necessary data to connect to your bank.

<br/>

## Documentation
- POST /cards

    In this route, companies with a valid API key can create cards for their employees. For a card to be created we need the employee identifier and the card type.

    Headers:
    ```
    xApiKey: zadKLNx.DzvOVjQH01TumGl2urPjPQSxUbf67vs0
    ```

  Body:
    
    ```
    {
        "employeeId": 1,
        "type": "education"
    }
    ```
    - The available types are:
'groceries', 'restaurants', 'transport', 'education', 'health'.

</br>

- PUT /cards/:id

  In this route, employees can create and activate their cards, that is, generate a password for the card. For a card to be activated, we need the identifier, its CVC and the password that will be registered.

  Body:
    ```
    {
        "cvc": "123",
        "password": "1234"
    }
    ```

</br>

- GET /cards/:id

  In this route, employees can view a card's balance and transactions. For this we need the card identifier.

    The response has the format:

  ```
    {
        "balance": 35000,
        "transactions": [
		    { "id": 1, "cardId": 1, "businessId": 1, "businessName": "DrivenEats", "timestamp": "22/01/2022", "amount": 5000 }
	    ]
        "recharges": [
		    { "id": 1, "cardId": 1, "timestamp": "21/01/2022", "amount": 40000 }
	    ]
    }
  ```

</br>

- POST /cards/:id/lock

  On this route, employees can block cards. For a card to be blocked, we need its identifier and password.

  Body:
  ```
    {
        "password": "1234"
    }
    ```

</br>

- POST /cards/:id/unlock

  On this route, employees can unlock cards. For a card to be unlocked, we need its identifier and password.
  
  Body:
    ```
    {
        "password": "1234"
    }
    ```

- POST /cards/:id/recharge

  In this route, companies with a valid API key can reload their employees' cards. For a card to be recharged, we need its identifier.
  
  Headers:
    ```
    xApiKey: zadKLNx.DzvOVjQH01TumGl2urPjPQSxUbf67vs0
    ```

  Body:
    ```
    {
        "amount": "20000"
    }
    ```

- POST /cards/:id/payment

  In this route, companies with a valid API key can reload their employees' cards. For a card to be recharged, we need its identifier.

  Headers:
    ```
    xApiKey: zadKLNx.DzvOVjQH01TumGl2urPjPQSxUbf67vs0
    ```
  
  Body:
    ```
    {
        "password": "1234",
        "businessId": 1
        "amount": "20000"
    }
    ```


## **Technologies**

![TypeScript Badge](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![ExpressJS](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Postgres Badge](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

### **Tooling:**
![ESLint](https://img.shields.io/badge/ESLint-7c7ce9?style=for-the-badge&logo=ESLint)
![husky](https://img.shields.io/badge/Husky-b0b0d5?style=for-the-badge)
