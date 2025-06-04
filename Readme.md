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

## Data Models

### User

```JSON
{
  "_id": "ObjectId",
  "name": "String",
  "email": "String",
  "passwordHash": "String",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

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

### Movements

```JSON
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "accountId": "ObjectId",
  "movementTypeId": "ObjectId",
  "categoryId": "ObjectId",
  "description": "String",
  "amount": "Number",
  "date": "Date",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Categories

```JSON
{
  "_id": "ObjectId",
  "name": "String",
  "subCategories":[
    {
      "_id": "ObjectId",
      "name": "String",
      "classification" : "String"  // "Necessary", "Desirable", "Optional", "Unnecessary" or "Bad" 
    }
  ]
}
```

### AccountTypes

```JSON
{
  "_id": "ObjectId",
  "name": "String"            // e.g.: "Credit", "Debit", "Cash", "Investment"
}
```

### MovementTypes

```JSON
{
  "_id": "ObjectId",
  "name": "String"            // e.g.: "Income", "Expense", "Transfer", "Debt"
}

```

### Reports

```JSON
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "type": "String",             // e.g.: "monthly", "category", "summary"
  "filters": "Object",          // e.g.: { from: Date, to: Date }
  "generatedAt": "Date",
  "content": "Object"           // resultado JSON del análisis
}

```

### Banks

```JSON
{
  "_id": "ObjectId",
  "name": "String",
  "logoUrl": "String",          // opcional
  "country": "String"
}

```

### Budgets

```JSON
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "categoryId": "ObjectId",
  "amount": "Number",
  "periodId": "ObjectId",
  "spent": "Number",            // calculado dinámicamente
  "createdAt": "Date",
  "updatedAt": "Date"
}

```

### Periods

```JSON
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "name": "String",             // e.g.: "Enero 2025"
  "startDate": "Date",
  "endDate": "Date",
  "createdAt": "Date"
}

```

### Suggestions

```JSON
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "message": "String",
  "type": "String",             // e.g.: "warning", "tip", "alert"
  "relatedTo": "String",        // opcional: "budget", "spending", "movement"
  "generatedAt": "Date",
  "read": "Boolean"
}

```

---

## Routes

### User

### Accounts

### Movements

### AccountTypes

### MovementTypes

### Reports

### Banks

### Budgets

### Periods

### Suggestions

