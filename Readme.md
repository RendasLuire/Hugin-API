
# Hugin API

## 🌑 The API – *The Engine Beneath the Runes*

<p align="left">
  <img src="https://img.shields.io/badge/STATUS-EN%20DESARROLLO-green" />
  <img src="https://img.shields.io/badge/Version-v1.00.0-blue" />
  <img src="https://img.shields.io/badge/Phase-1-pink" />
</p>

## 🔍Index

- [Hugin API](#hugin-api)
  - [🌑 The API – *The Engine Beneath the Runes*](#-the-api--the-engine-beneath-the-runes)
  - [🔍Index](#index)
  - [📐Project Phases](#project-phases)
    - [Phase #1](#phase-1)
  - [📖Version History](#version-history)
  - [🧠API Philosophy](#api-philosophy)
  - [📊Diagrams](#diagrams)
    - [Entity Relation](#entity-relation)
  - [🧱Data Models](#data-models)
    - [😎User Model](#user-model)
    - [💳Account Model](#account-model)
    - [🏦Bank Model](#bank-model)
    - [💵Movement Model](#movement-model)
    - [👤Account Type Model](#account-type-model)
    - [👾Movement Type Model](#movement-type-model)
    - [👾Category Type Model](#category-type-model)
  - [🔗EndPoints](#endpoints)
    - [🔧System Routes](#system-routes)
      - [✅Health Check Route](#health-check-route)
      - [✅Initialize Route](#initialize-route)
    - [🔐Auth Routes](#auth-routes)
      - [✅Health Check Auth Route](#health-check-auth-route)
      - [✅Login Route](#login-route)
    - [✅Refresh Token Route](#refresh-token-route)
    - [✅Logout Route](#logout-route)
    - [😎Users Routes](#users-routes)
      - [✅Test User Router](#test-user-router)
      - [✅Register User Router](#register-user-router)
      - [✅Find User Router](#find-user-router)
      - [✅List all Users Router](#list-all-users-router)
      - [✅Update User Router](#update-user-router)
      - [✅Delete User Router](#delete-user-router)
    - [👤Accounts Routes](#accounts-routes)
      - [✅Test Account Route](#test-account-route)
      - [✅List all Accounts Route](#list-all-accounts-route)
      - [✅Find Account Route](#find-account-route)
      - [✅Register Account Route](#register-account-route)
      - [✅Update Account Route](#update-account-route)
      - [✅Delete Account Route](#delete-account-route)
    - [🏦Bank Routes](#bank-routes)
      - [✅Test Bank Router](#test-bank-router)
      - [✅Register Bank Router](#register-bank-router)
      - [✅Find Bank Router](#find-bank-router)
      - [✅List all Banks Router](#list-all-banks-router)
      - [✅Update Bank Router](#update-bank-router)
      - [✅Delete Bank Router](#delete-bank-router)
    - [💵Movement Routes](#movement-routes)
      - [✅Test Movement Router](#test-movement-router)
      - [✅Register Movement Router](#register-movement-router)
      - [✅Find Movement Router](#find-movement-router)
      - [✅List all Movements Router](#list-all-movements-router)
      - [✅Update Movement Router](#update-movement-router)
      - [✅Delete Movement Router](#delete-movement-router)
  - [🧪Tests](#tests)
    - [Integration Test](#integration-test)
      - [Covered Endpoints](#covered-endpoints)
    - [Unit Test](#unit-test)
      - [Covered Modules](#covered-modules)
  - [🛠️Tech Stack](#️tech-stack)
  - [🔮Future Ideas](#future-ideas)

---

## 📐Project Phases

### Phase #1
The objective of the first phase is to build a foundation for registering and tracking expenses and accounts. This will include:

- Initialize the database
- Set up the environment
- Implement authentication (without recovery password)
- CRUD for accounts
- CRUD for users
- CRUD for banks
- CRUD for movements

---

## 📖Version History

| Version  | Date | Description                                                                       |
| -------- | ---- | --------------------------------------------------------------------------------- |
| 1.0.0    | -    | At this point, the API is able to manage users, accounts, banks and movements.    |

---

## 🧠API Philosophy

> *“It hums beneath the surface, unseen yet unyielding…”*

The API is no mere collection of endpoints.  
It is the will of the system, cast in logic and sealed in shadow.  
It speaks in encrypted tongues, answering only to those who know the rites.

Each request is a whisper.  
Each response, a decree.

Forged in quiet by hands that respect balance,  
it does not forgive malformed offerings —  
nor does it tolerate ignorance.

This is the work of Hugin’s deeper mind,  
a place where runes become action,  
and action bears weight.

**Treat it as sacred. Query with reverence.**

---

## 📊Diagrams

### Entity Relation

<img src="./documents/Entity-relation.png" alt="Entity Relation" />

---

## 🧱Data Models

### 😎User Model

| name          | description     | type     | default values  |  unique  | required  |     Enum    | Logic Restrictions  |
| ------------- | --------------- | -------- | --------------- |  ------- | --------- | ----------- | ------------------- |
| name          |  Full name.     |  String  |       NO        |    NO    |    YES    |     NO      |         NO          |
| email         |  Email address. |  String  |       NO        |    YES   |    YES    |     NO      |         NO          | 
| passwordHash  |  Password hash. |  String  |       NO        |    NO    |    YES    |     NO      |         NO          | 
| role          |  Type of user.  |  String  |      user       |    NO    |    YES    | user, admin |         NO          |

### 💳Account Model

| name           | description                                | type     | default values  |  unique  | required  |     Enum    | Logic Restrictions  |
| -------------- | ------------------------------------------ | -------- | --------------- |  ------- | --------- | ----------- | ------------------- |
| userId         | Foreign key to user.                       | ObjectId |        NO       |    NO    |    YES    |      NO     |        NO           |
| bankId         | Foreign key to bank.                       | ObjectId |        NO       |    NO    |    YES    |      NO     |        NO           |
| accountTypeId  | Foreign key to acconunt Type.              | ObjectId |        NO       |    NO    |    YES    |      NO     |        NO           |
| name           | Name to indentificate.                     | String   |        NO       |    NO    |    YES    |      NO     |        NO           |
| balance        | Resume of current balance.                 | Number   |        0        |    NO    |     NO    |      NO     |        NO           |
| nextPay        | Amount to pay closely.                     | Number   |        0        |    NO    |     NO    |      NO     |        NO           |
| cutDay         | Day used to determine payment cycle cutoff | Number   |        0        |    NO    |     NO    |      NO     |        >0           |
| payDay         | Day of pay last cut.                       | Number   |        0        |    NO    |     NO    |      NO     |        >0           |
| createdAt      | Date of created account.                   | Date     |        NO       |    NO    |     NO    |      NO     |        NO           |
| updatedAt      | Date of last update.                       | Date     |        NO       |    NO    |     NO    |      NO     |        NO           |

### 🏦Bank Model

| name      | description           | type      | default values  |  unique  | required  |            Enum            | Logic Restrictions  |
| --------- | --------------------- | --------- | --------------- |  ------- | --------- | -------------------------- | ------------------- |
| userId    | Foreign key to user.  | ObjectId  |       NO        |    NO    |    YES    |             NO             |        NO           |
| name      | Name to identify.     | String    |       NO        |    NO    |    YES    |             NO             |        NO           |
| logoUrl   | Path to logo.         | String    |       NO        |    NO    |     NO    |             NO             |        NO           |
| state     | State of user.        | String    |     "active"    |    NO    |     NO    |  active, archived, deleted |        NO           |
| deletedAt | Date of deleted.      | Date      |       NO        |    NO    |     NO    |             NO             |        NO           |

### 💵Movement Model

| name            | description                   | type      | default values  |  unique  | required  |     Enum    | Logic Restrictions  |
| --------------- | ----------------------------- | --------- | --------------- |  ------- | --------- | ----------- | ------------------- |
| userId          | Foreign key to user.          | ObjectId  |       NO        |    NO    |    YES    |      NO     |        NO           |
| accountId       | Foreign key to account.       | ObjectId  |       NO        |    NO    |    YES    |      NO     |        NO           |
| movementTypeId  | Foreign key to movement type. | ObjectId  |       NO        |    NO    |    YES    |      NO     |        NO           |
| categoryId      | Foreign key to category.      | ObjectId  |       NO        |    NO    |    YES    |      NO     |        NO           |
| description     | Description about movement.   | String    |       NO        |    NO    |    YES    |      NO     |        NO           |
| amount          | Movement amount.              | Number    |       NO        |    NO    |    YES    |      NO     |        >0           |
| date            | Movement date.                | Date      |       NO        |    NO    |     NO    |      NO     |        NO           |

### 👤Account Type Model

| name        | description                           | type    | default values  |  unique  | required  |     Enum    | Logic Restrictions  |
| ----------- | ------------------------------------- | ------- | --------------- |  ------- | --------- | ----------- | ------------------- |
| name        | Name to identify.                     | String  |       NO        |    NO    |    YES    |      NO     |        NO           |
| key         | String unique.                        | String  |       NO        |    NO    |    YES    |      NO     |        NO           |
| description | Explication about usage account type. | String  |       NO        |    NO    |    YES    |      NO     |        NO           |
| icon        | String path to icon.                  | String  |       NO        |    NO    |     NO    |      NO     |        NO           |
| color       | Color HEX code                        | String  |       NO        |    NO    |     NO    |      NO     |        NO           |

### 👾Movement Type Model

| name  | description       | type      | default values  |  unique  | required  |     Enum    | Logic Restrictions  |
| ----- | ----------------- | --------- | --------------- |  ------- | --------- | ----------- | ------------------- |
| name  | Name to identify. | String    |       NO        |    NO    |    YES    |      NO     |        NO           |

### 👾Category Type Model

|     name       | description                       | type   | default values | unique | required |                      Enum                          | Logic Restrictions |
| -------------- | --------------------------------- | ------ | -------------- | ------ | -------- | -------------------------------------------------- | ------------------ |
|     name       | Name to identify.                 | String |       NO       |   NO   |   YES    |                       NO                           |       NO           |
| classification | Denomination of type to movement. | String |       NO       |   NO   |   YES    |  Necessary, Desirable, Optional, Unnecessary, Bad  |       NO           |

---

## 🔗EndPoints

### 🔧System Routes

#### ✅Health Check Route

- **Description:**
This endpoint is to check if api is online.

- **URL:** `/`
- **Method:** `GET`
- **Headers:**

* **✅Response successfully `200 OK`**

```JSON
{
  "data": [],
  "message": "Express on Vercel with TS."
}  
```

- **Common responses:**
  - `404` - Not found.

#### ✅Initialize Route

- **Description:**
This endpoint is necesary to initialize enviroment to api, creating an admin user.

- **URL:** `/`
- **Method:** `GET`
- **Headers:**

* **✅Response successfully `202 Accepted`**

```JSON
{
  "data": [],
  "message": "App initialized."
}  
```

- **Common responses:**
  - `200` - The app has been initialized.
  - `404` - Not found.
  - `500` - Internal Server Error

### 🔐Auth Routes

#### ✅Health Check Auth Route

- **Description:**
This endpoint is to check if auth route is online.

- **URL:** `/auth/test`
- **Method:** `GET`
- **Headers:**

* **✅Response successfully `200 OK`**

```JSON
{
  "data": [],
  "message": "Auth test route is working."
}  
```

- **Common responses:**
  - `404` - Not found.

#### ✅Login Route

- **Description:**
This endpoint is to authenticate in api.

- **URL:** `/auth/login`
- **Method:** `POST`
- **Headers:**

* **✅Response successfully `202 OK`**

```JSON
{
  "data": [],
  "message": "Login successful"
}  
```

- **Common responses:**
  - `400` - Fields email and password are required.
  - `401` - User incorrect or Password incorrect.
  - `404` - Not found.
  - `500` - Error during login.

### ✅Refresh Token Route

- **Description:**
This endpoint is to refresh token and keep the session open.

- **URL:** `/auth/refresh`
- **Method:** `POST`
- **Headers:**

* **✅Response successfully `202 OK`**

```JSON
{
  "data": [],
  "message": "Login successful"
}  
```

- **Common responses:**
  - `400` - Fields email and password are required.
  - `401` - User incorrect or Password incorrect.
  - `404` - Not found.
  - `500` - Error during login.
  
### ✅Logout Route

- **Description:**
  This endpoint is to close session and clear cookies.

- **URL:** `/auth/logout`
- **Method:** `POST`
- **Headers:**

* **✅Response successfully `202 OK`

```JSON
  "data": [],
  "message": "Logout successful."
```

- **Common responses:**
  - `404` - Not found.

### 😎Users Routes

#### ✅Test User Router

- **Description:**

- **URL:** `/`
- **Method:** `GET`
- **Headers:**

* **✅Response successfully `200 OK`**

```JSON
{
  
}  
```

- **Common responses:**
  - `404` - Not found.

#### ✅Register User Router

- **Description:**

- **URL:** `/`
- **Method:** `GET`
- **Headers:**

* **✅Response successfully `200 OK`**

```JSON
{
  
}  
```

- **Common responses:**
  - `404` - Not found.

#### ✅Find User Router

- **Description:**

- **URL:** `/`
- **Method:** `GET`
- **Headers:**

* **✅Response successfully `200 OK`**

```JSON
{
  
}  
```

- **Common responses:**
  - `404` - Not found.

#### ✅List all Users Router

- **Description:**

- **URL:** `/`
- **Method:** `GET`
- **Headers:**

* **✅Response successfully `200 OK`**

```JSON
{
  
}  
```

- **Common responses:**
  - `404` - Not found.

#### ✅Update User Router

- **Description:**

- **URL:** `/`
- **Method:** `GET`
- **Headers:**

* **✅Response successfully `200 OK`**

```JSON
{
  
}  
```

- **Common responses:**
  - `404` - Not found.

#### ✅Delete User Router

- **Description:**

- **URL:** `/`
- **Method:** `GET`
- **Headers:**

* **✅Response successfully `200 OK`**

```JSON
{
  
}  
```

- **Common responses:**
  - `404` - Not found.

### 👤Accounts Routes

#### ✅Test Account Route

- **Description:**
Response with a fake user.

- **URL:** `/accounts/test`
- **Method:** `GET`
- **Headers:**

* **✅Response successfully `200 OK`**

```JSON
{
  "message": ""
}  
```

- **Common responses:**
  - `404` - Not found..
  - `401` - Unauthorized access.
  - `500` - Internal Server Error.

#### ✅List all Accounts Route

- **Description:**
Get all accounts relative to current user.

- **URL:** `/accounts`
- **Method:** `GET`
- **Headers:**

* **✅Response successfully `200 OK`**

```JSON
{
  "message": "Accounts Array."
}  
```

- **Common responses:**
  - `404` - Not found..
  - `401` - Unauthorized access.
  - `500` - Internal Server Error.

#### ✅Find Account Route

- **Description:**
Get account.

- **URL:** `/accounts/:id`
- **Method:** `GET`
- **Headers:**

* **✅Response successfully `200 OK`**

```JSON
{
  "message": "Account data."
}  
```

- **Common responses:**
  - `404` - Not found.
  - `500` - Internal Server Error

#### ✅Register Account Route

#### ✅Update Account Route

#### ✅Delete Account Route

### 🏦Bank Routes

#### ✅Test Bank Router

- **Description:**

- **URL:** `/`
- **Method:** `GET`
- **Headers:**

* **✅Response successfully `200 OK`**

```JSON
{
  
}  
```

- **Common responses:**
  - `404` - Not found.

#### ✅Register Bank Router

- **Description:**

- **URL:** `/`
- **Method:** `GET`
- **Headers:**

* **✅Response successfully `200 OK`**

```JSON
{
  
}  
```

- **Common responses:**
  - `404` - Not found.

#### ✅Find Bank Router

- **Description:**

- **URL:** `/`
- **Method:** `GET`
- **Headers:**

* **✅Response successfully `200 OK`**

```JSON
{
  
}  
```

- **Common responses:**
  - `404` - Not found.

#### ✅List all Banks Router

- **Description:**

- **URL:** `/`
- **Method:** `GET`
- **Headers:**

* **✅Response successfully `200 OK`**

```JSON
{
  
}  
```

- **Common responses:**
  - `404` - Not found.

#### ✅Update Bank Router

- **Description:**

- **URL:** `/`
- **Method:** `GET`
- **Headers:**

* **✅Response successfully `200 OK`**

```JSON
{
  
}  
```

- **Common responses:**
  - `404` - Not found.

#### ✅Delete Bank Router

- **Description:**

- **URL:** `/`
- **Method:** `GET`
- **Headers:**

* **✅Response successfully `200 OK`**

```JSON
{
  
}  
```

- **Common responses:**
  - `404` - Not found.

### 💵Movement Routes

#### ✅Test Movement Router

- **Description:**

- **URL:** `/`
- **Method:** `GET`
- **Headers:**

* **✅Response successfully `200 OK`**

```JSON
{
  
}  
```

- **Common responses:**
  - `404` - Not found.

#### ✅Register Movement Router

- **Description:**

- **URL:** `/`
- **Method:** `GET`
- **Headers:**

* **✅Response successfully `200 OK`**

```JSON
{
  
}  
```

- **Common responses:**
  - `404` - Not found.

#### ✅Find Movement Router

- **Description:**

- **URL:** `/`
- **Method:** `GET`
- **Headers:**

* **✅Response successfully `200 OK`**

```JSON
{
  
}  
```

- **Common responses:**
  - `404` - Not found.

#### ✅List all Movements Router

- **Description:**

- **URL:** `/`
- **Method:** `GET`
- **Headers:**

* **✅Response successfully `200 OK`**

```JSON
{
  
}  
```

- **Common responses:**
  - `404` - Not found.

#### ✅Update Movement Router

- **Description:**

- **URL:** `/`
- **Method:** `GET`
- **Headers:**

* **✅Response successfully `200 OK`**

```JSON
{
  
}  
```

- **Common responses:**
  - `404` - Not found.

#### ✅Delete Movement Router

- **Description:**

- **URL:** `/`
- **Method:** `GET`
- **Headers:**

* **✅Response successfully `200 OK`**

```JSON
{
  
}  
```

- **Common responses:**
  - `404` - Not found.

---

## 🧪Tests

Tests were written using `Jest` and `SuperTest`, covering both unit and integration levels.

### Integration Test

Integration tests validate the interaction between components, especially the behavior of API endpoints.

```batch
npm run test:integration
```

#### Covered Endpoints

- `/`: System check health
- `/initialize`: System initialization and configuration

### Unit Test

Unit tests verify isolated logic for individual components of the application.

```batch
npm run test:unit
```

#### Covered Modules

- Controllers – request handling logic

- Middlewares – request validation and preprocessing

- Models – schema definitions and validation logic

- Repositories – database access and operations

- Services – business logic and data processing

---

## 🛠️Tech Stack

- Node JS
- MongoDB

---

## 🔮Future Ideas