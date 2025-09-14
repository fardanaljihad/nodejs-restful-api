# Address API Spec

## Create Address API

Endpoint: POST /api/contacts/:contactId/addresses

Headers:
- Authorization: token

Request Body:
```json
{
    "street": "Street 14",
    "city": "City 1",
    "province": "Province 1",
    "country": "Country 1",
    "postal_code": "60875"

}
```

Response Body Success:
```json
{
    "data": {
        {
            "id": 1,
            "street": "Street 14",
            "city": "City 1",
            "province": "Province 1",
            "country": "Country 1",
            "postal_code": "60875"

        }
    }
}
```

Response Body Error:
```json
{
    "errors": "Country is required"
}
```

## Update Address API

Endpoint: PUT /api/contacts/:contactId/addresses/:addressId

Headers:
- Authorization: token

Request Body:
```json
{
    "street": "Street 15",
    "city": "City 1",
    "province": "Province 1",
    "country": "Country 1",
    "postal_code": "60875"

}
```

Response Body Success:
```json
{
    "data": {
        {
            "id": 1,
            "street": "Street 15",
            "city": "City 1",
            "province": "Province 1",
            "country": "Country 1",
            "postal_code": "60875"

        }
    }
}
```

Response Body Error:
```json
{
    "errors": "Country is required"
}
```

## Get Address API

Endpoint: GET /api/contacts/:contactId/addresses/:addressId

Headers:
- Authorization: token

Response Body Success:
```json
{
    "data": {
        {
            "id": 1,
            "street": "Street 15",
            "city": "City 1",
            "province": "Province 1",
            "country": "Country 1",
            "postal_code": "60875"

        }
    }
}
```

Response Body Error:
```json
{
    "errors": "Contact is not found"
}
```

## List Address API

Endpoint: GET /api/contacts/:contactId/addresses

Headers:
- Authorization: token

Response Body Success:
```json
{
    "data": [
        {
            "id": 1,
            "street": "Street 15",
            "city": "City 1",
            "province": "Province 1",
            "country": "Country 1",
            "postal_code": "60875"

        },
        {
            "id": 2,
            "street": "Street 15",
            "city": "City 1",
            "province": "Province 1",
            "country": "Country 1",
            "postal_code": "60875"

        }
    ]
}
```

Response Body Error:
```json
{
    "errors": "Contact is not found"
}
```

## Remove Address API

Endpoint: DELETE /api/contacts/:contactId/addresses/:addressId

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
    "errors": "Address is not found"
}
```
