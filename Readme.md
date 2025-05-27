# Hugin API

Hugin API is designed to help you manage your expenses and gain insights through analysis, empowering you to make smarter financial decisions.

Inspired by the mythological raven Hugin, who symbolizes thought and knowledge, this API enables a deep understanding of your spending habits. With this awareness, you can make informed plans and take meaningful actions to improve your financial well-being.

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

