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

### Accounts
#### ✅ GET /accounts
- **Descripción:** Obtiene todas las cuentas.
- **Response:**  
    - `200 OK`: Array de cuentas
    - `404 Not Found`: No hay cuentas
    - `500 Internal Server Error`

#### ✅ GET /accounts/:id
- **Descripción:** Obtiene detalles de una cuenta específica.
- **Response:**  
    - `200 OK`: Objeto de la cuenta
    - `404 Not Found`: Cuenta no existe
    - `500 Internal Server Error`

### ✅ POST /accounts
Crea una nueva cuenta.

**Body (JSON):**
```json
{
  "userId": "ObjectId",
  "name": "string",
  "accountTypeId": "ObjectId",
  "bankId": "ObjectId (opcional)",
  "balance": "number (opcional)",
  "nextPay": "number (opcional)"
}
```

#### ✅ PUT /accounts/:id
- **Descripción:** Actualiza una cuenta existente.
- **Body:** Campos de la cuenta que desees actualizar
- **Response:**  
    - `200 OK`: Objeto de la cuenta actualizado
    - `400 Bad Request`: Campos inválidos
    - `404 Not Found`: Cuenta no existe
    - `500 Internal Server Error`

#### ✅ DELETE /accounts/:id
- **Descripción:** Elimina o archiva una cuenta.
- **Response:**  
    - `200 OK`: Mensaje de éxito
    - `404 Not Found`: Cuenta no existe
    - `500 Internal Server Error`


## 🧪 Tests

### Account

#### Account Model
- ✅ Verifica creación de cuentas válidas
- ✅ Valida requerimiento de `userId`, `name` y `accountTypeId`
- ✅ Verifica enumerado para `state`

#### Account Service
- ✅ Verifica lógica de creación de cuentas
- ✅ Verifica lógica de actualización de cuentas
- ✅ Verifica lógica de borrado y archivado

#### Account Controller
- ✅ Verifica status HTTP y respuestas JSON para: (`201 Created`, `400 Bad Request`, `404 Not Found`)
  - Crear cuenta
  - Listar cuentas
  - Eliminar cuenta