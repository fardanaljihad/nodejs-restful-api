# User API Spec

## Register User API

Endpoint: POST /api/users

Request Body:
```json
{
    "name": "Test User",
    "username": "test-user",
    "password": "password"
}
```

Response Body Success:
```json
{
    "data": {
        "name": "Test User",
        "username": "test-user"
    }
}
```

Response Body Error:
```json
{
    "errors": "Username already registered"
}
```

## Login User API

Endpoint: POST /api/users/login

Request Body:
```json
{
    "username": "test-user",
    "password": "password"
}
```

Response Body Success:
```json
{
    "data": {
        "token": "unique-token"
    }
}
```

Response Body Error:
```json
{
    "errors": "Username or password is wrong"
}
```

## Update User API

Endpoint: PATCH /api/users/current — PATCH: updates only specific fields of the user resource without replacing it entirely.

Headers:
- Authorization: token

Request Body:
```json
{
    "name": "New Test User", // optional
    "password": "new-password" // optional
}
```

Response Body Success:
```json
{
    "data": {
        "name": "New Test User",
        "username": "test-user"
    }
}
```

Response Body Error:
```json
{
    "errors": "Name length max 100"
}
```

## Get User API

Endpoint: GET /api/users/current

Headers:
- Authorization: token

Response Body Success:
```json
{
    "data": {
        "name": "New Test User",
        "username": "test-user"
    }
}
```

Response Body Error:
```json
{
    "errors": "Unauthorized"
}
```

## Logout User API

Endpoint: DELETE /api/users/logout

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
    "errors": "Unauthorized"
}
```
