
# Hugin API

## 🌑 The API – *The Engine Beneath the Runes*

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

## 📦 Data Models

### Accounts

```JSON
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "bankId": "ObjectId",
  "name": "String",
  "accountTypeId": "ObjectId",
  "balance": "Number",
  "nextPay": "Number",
  "cutDay": "Number",
  "payDay": "Number",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

---

## 🌐 Routes

### Accounts Routes

#### ✅ Get /accounts/test

- **Description:** Response with a fake user.
- **Response:**
  - `200 OK`: Test account.
  - `500 Internal Server Error`

#### ✅ GET /accounts

- **Description:** Get all accounts relative to current user.
- **Response:**  
  - `200 OK`: Accounts Array
  - `401 Unauthorized access`
  - `500 Internal Server Error`

#### ✅ GET /accounts/:id

- **Description:** Get account.
- **Response:**  
  - `200 OK`: Account data.
  - `404 Not Found`: Account don´t exist.
  - `500 Internal Server Error`

---

## 🧪 Tests

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

---
