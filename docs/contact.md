# Contact API Spec

## Create Contact API

Endpoint: POST /api/contacts

Headers:
- Authorization: token

Request Body:
```json
{
    "first_name": "Test",
    "last_name": "User",
    "email": "test-user@example.com",
    "phone": "081543700107"
}
```

Response Body Success:
```json
{
    "data": {
        "id": 1,
        "first_name": "Test",
        "last_name": "User",
        "email": "test-user@example.com",
        "phone": "081543700107"
    }
}
```

Response Body Error:
```json
{
    "errors": "Email is not valid"
}
```

## Update Contact API

Endpoint: PUT /api/contacts/:id — PUT: replaces the entire user resource with new data.

Headers:
- Authorization: token

Request Body:
```json
{
    "first_name": "New",
    "last_name": "User",
    "email": "test-user@example.com",
    "phone": "081543700107"
}
```

Response Body Success:
```json
{
    "data": {
        "id": 1,
        "first_name": "New",
        "last_name": "User",
        "email": "test-user@example.com",
        "phone": "081543700107"
    }
}
```

Response Body Error:
```json
{
    "errors": "Email is not valid"
}
```

## Get Contact API

Endpoint: GET /api/contacts/:id

Headers:
- Authorization: token

Response Body Success:
```json
{
    "data": {
        "id": 1,
        "first_name": "New",
        "last_name": "User",
        "email": "test-user@example.com",
        "phone": "081543700107"
    }
}
```

Response Body Error:
```json
{
    "errors": "Contact is not found"
}
```

## Search Contact API

Endpoint: GET /api/contacts

Headers:
- Authorization: token

Query params:
- name: Search by first_name or last_name, using like query, optional
- email: Search by email, using like query, optional
- phone: Search by phone, using like query, optional
- page: Number of page, default 1
- size: Size per page, default 10

Response Body Success:
```json
{
    "data": [
        {
            "id": 1,
            "first_name": "New",
            "last_name": "User",
            "email": "test-user@example.com",
            "phone": "081543700107"
        },
        {
            "id": 2,
            "first_name": "New",
            "last_name": "User",
            "email": "test-user@example.com",
            "phone": "081543700107"
        }
    ],
    "paging": {
        "page": 1,
        "total_page": 1,
        "total_item": 2
    }
}
```

Response Body Error:
```json
{
    "errors": "Contact is not found"
}
```

## Remove Contact API

Endpoint: DELETE /api/contacts/:id

Headers:
- Authorization: token

Response Body Success:
```json
{
    "data": "OK"
}
```

Response Body Error:
```json
{
    "errors": "Contact is not found"
}
```
