
# Hugin API

## 🌑 The API – *The Engine Beneath the Runes*

<p align="left">
  <img src="https://img.shields.io/badge/STATUS-EN%20DESARROLLO-green" />
  <img src="https://img.shields.io/badge/Version-v1.00.0-blue" />
  <img src="https://img.shields.io/badge/Phase-1-pink" />
</p>

## 🔍Index

- [Project Phases](#project-phases)
  - [Phase #1](#phase-1)
- [Version History](#version-history)
- [API Philosophy](#api-philosophy)
- [Diagrams](#diagrams)
- [Data Model](#data-models)
  - [User Model](#user-model)
  - [Account Model](#account-model)
  - [Bank Model](#bank-model)
  - [Movement Model](#movement-model)
  - [Account Type](#account-type-model)
  - [Movement Type](#movement-type-model)
- [EndPoints](#endpoints)
  - [System](#system-routes)
    - [Health Check](#health-check-route)
    - [Initialize](#initialize-route)
  - [User](#users-routes)
    - [Test User Router](#test-user-router)
    - [Register User](#register-user-router)
    - [Find User](#find-user-router)
    - [List all Users](#list-all-users-router)
    - [Update User](#update-user-router)
    - [Delete User](#delete-user-router)
  - [Account](#accounts-routes)
    - [Test Account Router](#test-account-route)
    - [Register Account](#register-account-route)
    - [Find Account](#find-account-route)
    - [List Accounts](#list-all-accounts-route)
    - [Update Account](#update-account-route)
    - [Delete Account](#delete-account-route)
  - [Bank](#bank-routes)
    - [Test Bank Router](#test-bank-router)
    - [Register Bank](#register-bank-router)
    - [Find Bank](#find-bank-router)
    - [List Banks](#list-all-banks-router)
    - [Update Bank](#update-bank-router)
    - [Delete Bank](#delete-bank-router)
  - [Movement](#movement-routes)
    - [Test Movement Router](#test-movement-router)
    - [Register Movement](#register-movement-router)
    - [Find Movement](#find-movement-router)
    - [List Movements](#list-all-movements-router)
    - [Update Movement](#update-movement-router)
    - [Delete Movement](#delete-movement-router)
- [Test](#tests)
- [Tech Stack](#️tech-stack)
- [Future Ideas](#future-ideas)

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

---

## 🧱Data Models

### User Model

| name          | description                     | type     | default values  |
| ------------- | ------------------------------- | -------- | --------------- |
| name          |  Full name.                     |  String  |                 |
| email         |  Email address.                 |  String  |                 |
| passwordHash  |  Paasword hashed.               |  String  |                 |
| role          |  Type of user (admin or user).  |  String  | "user"          |

### 💳Account Model

| name           | description                     | type     | default values  |
| -------------- | ------------------------------- | -------- | --------------- |
| userId         | Foreig key to user.             | ObjectId |                 |
| bankId         | Foreig key to bank.             | ObjectId |                 |
| name           | Name to indentificate.          | String   |                 |
| accountTypeId  | Foreig key to acconunt Type.    | ObjectId |                 |
| balance        | Resume of current balance.      | Number   |  0              |
| nextPay        | Amount to pay closely.          | Number   |  0              |
| cutDay         | Day of cut to calcult next pay. | Number   |  0              |
| payDay         | Day of pay last cut.            | Number   |  0              |
| createdAt      | Date of created account.        | Date     |                 |
| updatedAt      | Date of last update.            | Date     |                 |

### Bank Model

| name      | description                                 | type      | default values  |
| --------- | ------------------------------------------- | --------- | --------------- |
| name      | Name to identificate.                       | String    |                 |
| logoUrl   | Path to logo.                               | String    | ""              |
| state     | State of user (active, archived, deleted).  | String    | "active"        |
| deletedAt | Date of deleted.                            | Date      | null            |
| userId    | Foreig key to user.                         | ObjectId  |                 |

### Movement Model

| name            | description                   | type      | default values  |
| --------------- | ----------------------------- | --------- | --------------- |
| userId          | Foreig key to user.           | ObjectId  |                 |
| accountId       | Foreig key to account.        | ObjectId  |                 |
| movementTypeId  | Foreig key to movement type.  | ObjectId  |                 |
| categoryId      | Foreig key to category.       | ObjectId  |                 |
| description     | Description about movement.   | String    |                 |
| amount          | Movement amount.              | Number    |                 |
| date            | Movement date.                | Date      |                 |

### Account Type Model

| name        | description                           | type    | default values  |
| ----------- | ------------------------------------- | ------- | --------------- |
| name        | Name to identificate.                 | String  |                 |
| key         | String unique.                        | String  |                 |
| description | Explication about usage account type. | String  |                 |
| icon        | String path to icon.                  | String  | null            |
| color       | Color HEX code                        | String  | null            |

### Movement Type Model

| name  | description       | type      | default values  |
| ----- | ----------------- | --------- | --------------- |
| name  | Name to identify. | String    |                 |

---

## 🔗EndPoints

### 🔧System Routes

#### ✅Health Check Route

- **Descripción:**
Este endpoint permite verificar si la API está en línea. Útil para pruebas básicas de disponibilidad.

- **URL:** `/`
- **Método:** `GET`
- **Headers:**

##### **✅Respuesta exitosa `200 OK`**

```JSON
{
  "message": "Express on Vercel with TS."
}  
```

- **❌Errores comunes:**
  - `404` - Ruta no encontrada

#### ✅Initialize Route

- **Descripción:**

- **URL:** `/`
- **Método:** `GET`
- **Headers:**

##### **✅Respuesta exitosa `200 OK`**

```JSON
{
  
}  
```

- **❌Errores comunes:**
  - `404` - Ruta no encontrada

### Users Routes

#### ✅Test User Router

- **Descripción:**

- **URL:** `/`
- **Método:** `GET`
- **Headers:**

##### **✅Respuesta exitosa `200 OK`**

```JSON
{
  
}  
```

- **❌Errores comunes:**
  - `404` - Ruta no encontrada

#### ✅Register User Router

- **Descripción:**

- **URL:** `/`
- **Método:** `GET`
- **Headers:**

##### **✅Respuesta exitosa `200 OK`**

```JSON
{
  
}  
```

- **❌Errores comunes:**
  - `404` - Ruta no encontrada

#### ✅Find User Router

- **Descripción:**

- **URL:** `/`
- **Método:** `GET`
- **Headers:**

##### **✅Respuesta exitosa `200 OK`**

```JSON
{
  
}  
```

- **❌Errores comunes:**
  - `404` - Ruta no encontrada

#### ✅List all Users Router

- **Descripción:**

- **URL:** `/`
- **Método:** `GET`
- **Headers:**

##### **✅Respuesta exitosa `200 OK`**

```JSON
{
  
}  
```

- **❌Errores comunes:**
  - `404` - Ruta no encontrada

#### ✅Update User Router

- **Descripción:**

- **URL:** `/`
- **Método:** `GET`
- **Headers:**

##### **✅Respuesta exitosa `200 OK`**

```JSON
{
  
}  
```

- **❌Errores comunes:**
  - `404` - Ruta no encontrada

#### ✅Delete User Router

- **Descripción:**

- **URL:** `/`
- **Método:** `GET`
- **Headers:**

##### **✅Respuesta exitosa `200 OK`**

```JSON
{
  
}  
```

- **❌Errores comunes:**
  - `404` - Ruta no encontrada

### 👤Accounts Routes

#### ✅Test Account Route

- **Descripción:**
Response with a fake user.

- **URL:** `/accounts/test`
- **Método:** `GET`
- **Headers:**

##### **✅Respuesta exitosa `200 OK`**

```JSON
{
  "message": "Accounts Array."
}  
```

- **❌Errores comunes:**
  - `404` - Ruta no encontrada.
  - `401` - Unauthorized access.
  - `500` - Internal Server Error.

#### ✅List all Accounts Route

- **Descripción:**
Get all accounts relative to current user.

- **URL:** `/accounts`
- **Método:** `GET`
- **Headers:**

##### **✅Respuesta exitosa `200 OK`**

```JSON
{
  "message": "Accounts Array."
}  
```

- **❌Errores comunes:**
  - `404` - Ruta no encontrada.
  - `401` - Unauthorized access.
  - `500` - Internal Server Error.

#### ✅Find Account Route

- **Descripción:**
Get account.

- **URL:** `/accounts/:id`
- **Método:** `GET`
- **Headers:**

##### **✅Respuesta exitosa `200 OK`**

```JSON
{
  "message": "Account data."
}  
```

- **❌Errores comunes:**
  - `404` - Ruta no encontrada
  - `500` - Internal Server Error

#### ✅Register Account Route

#### ✅Update Account Route

#### ✅Delete Account Route

### Bank Routes

#### ✅Test Bank Router

- **Descripción:**

- **URL:** `/`
- **Método:** `GET`
- **Headers:**

##### **✅Respuesta exitosa `200 OK`**

```JSON
{
  
}  
```

- **❌Errores comunes:**
  - `404` - Ruta no encontrada

#### ✅Register Bank Router

- **Descripción:**

- **URL:** `/`
- **Método:** `GET`
- **Headers:**

##### **✅Respuesta exitosa `200 OK`**

```JSON
{
  
}  
```

- **❌Errores comunes:**
  - `404` - Ruta no encontrada

#### ✅Find Bank Router

- **Descripción:**

- **URL:** `/`
- **Método:** `GET`
- **Headers:**

##### **✅Respuesta exitosa `200 OK`**

```JSON
{
  
}  
```

- **❌Errores comunes:**
  - `404` - Ruta no encontrada

#### ✅List all Banks Router

- **Descripción:**

- **URL:** `/`
- **Método:** `GET`
- **Headers:**

##### **✅Respuesta exitosa `200 OK`**

```JSON
{
  
}  
```

- **❌Errores comunes:**
  - `404` - Ruta no encontrada

#### ✅Update Bank Router

- **Descripción:**

- **URL:** `/`
- **Método:** `GET`
- **Headers:**

##### **✅Respuesta exitosa `200 OK`**

```JSON
{
  
}  
```

- **❌Errores comunes:**
  - `404` - Ruta no encontrada

#### ✅Delete Bank Router

- **Descripción:**

- **URL:** `/`
- **Método:** `GET`
- **Headers:**

##### **✅Respuesta exitosa `200 OK`**

```JSON
{
  
}  
```

- **❌Errores comunes:**
  - `404` - Ruta no encontrada

### Movement Routes

#### ✅Test Movement Router

- **Descripción:**

- **URL:** `/`
- **Método:** `GET`
- **Headers:**

##### **✅Respuesta exitosa `200 OK`**

```JSON
{
  
}  
```

- **❌Errores comunes:**
  - `404` - Ruta no encontrada

#### ✅Register Movement Router

- **Descripción:**

- **URL:** `/`
- **Método:** `GET`
- **Headers:**

##### **✅Respuesta exitosa `200 OK`**

```JSON
{
  
}  
```

- **❌Errores comunes:**
  - `404` - Ruta no encontrada

#### ✅Find Movement Router

- **Descripción:**

- **URL:** `/`
- **Método:** `GET`
- **Headers:**

##### **✅Respuesta exitosa `200 OK`**

```JSON
{
  
}  
```

- **❌Errores comunes:**
  - `404` - Ruta no encontrada

#### ✅List all Movements Router

- **Descripción:**

- **URL:** `/`
- **Método:** `GET`
- **Headers:**

##### **✅Respuesta exitosa `200 OK`**

```JSON
{
  
}  
```

- **❌Errores comunes:**
  - `404` - Ruta no encontrada

#### ✅Update Movement Router

- **Descripción:**

- **URL:** `/`
- **Método:** `GET`
- **Headers:**

##### **✅Respuesta exitosa `200 OK`**

```JSON
{
  
}  
```

- **❌Errores comunes:**
  - `404` - Ruta no encontrada

#### ✅Delete Movement Router

- **Descripción:**

- **URL:** `/`
- **Método:** `GET`
- **Headers:**

##### **✅Respuesta exitosa `200 OK`**

```JSON
{
  
}  
```

- **❌Errores comunes:**
  - `404` - Ruta no encontrada

---

## 🧪Tests

### Account Tests

#### Account Model

- ✅ Check valid accounts creation.
- ✅ Validate requeriments `userId`, `name` y `accountTypeId`.
- ✅ Validate info `state`.

#### Account Repository

- ✅ Validate Test Info.
- ✅ Check return accounts.

#### Account Service

- `testAccounts`
  - ✅ Validate Test Response.

- `getAccountsForUser`
  - ✅ Check return accounts.
  - ✅ Validate account is empty.

#### Account Controller

- `testAccountsController`
  - ✅ Validate Test Response.

- `getAccounts`
  - ✅ Check if return code `401 Unauthorized access`.
  - ✅ Check return Accounts List.
  - ✅ Check return code `500 Internal Server Error`.

### Middlewares Tests

#### Auth

- `authMiddleware`
  - ✅ Check if return code `401 Unauthorized access` when request don't have header.
  - ✅ Check if return code `401 Unauthorized access` when token isn´t valid.

#### Config

- `registerMiddlewares`
  - ✅ Check Express
  - ✅ Check Cors
  - ✅ Check Cookie Parser

---

## 🛠️Tech Stack

---

## 🔮Future Ideas