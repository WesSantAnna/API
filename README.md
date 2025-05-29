# DESAFIO 1

# FULLSTACK - Documentation

This documentation has been created to guide developers about the FullStack aplications using  FastAPI and React.

---

## Main Installation

### Backend

```powershell
# Python Installation
.\python39-amd64-installer.exe
 
# Version
python --version # -> 13.3.3 or superior
 
# Virtual Environment
python -m venv venv
 
# Activate virtual Environment
.\venv\Scripts\Activate
 
# Python Package Index 
pip install "fastapi[standard]" pydantic requests 
"python-jose[cryptography]" uvicorn python-dotenv fastapi-depends

# Run FastAPI
fastapi dev main.py # Server started at http://127.0.0.1:8000
                    # Server Documentation at http://127.0.0.1:8000/docs
```

### Frontend

```powershell
# Node LTS
node-v22.16.0-x64.exe

# Version
node --version #  -> v22.16.0 or superior

# Create Project
npm create vite@latest # Install the latest available versi

name_project # Frontend

main language # JavaScript

# npm Install
npm i react-router-dom # Install package for route manipulation

# Run npm
npm run dev # -> VITE v6.3.5  ready in 397 ms Local: http://localhost:5173/
```

---

## Base URL

> *http://127.0.0.1:8000/*
> 

---

## Routes

### **`POST` *Login (Token)***

> The endpoint functions by generating access and refresh tokens, enabling the utilization of other endpoints.
> 

**Endpoint:** /token

**Content-Type:** JSON

**Access Level:** Any

**Request Body Types:**

- username `string` `required`
- password `string` `required`

**Request Body Example:**

```json
{
    "username": "example",
    "password": "example"
}
```

**Response Example - 200:**

`POST - /api/token`

```json
{
	"refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMzc5MDM2NSwiaWF0IjoxNzAzNzAzOTY1LCJqdGkiOiI1NzEzNzE0N2UxZjI0MzY1ODM2OTdmMWUxNWFlZTNmOSIsInVzZXJfaWQiOjIxMn0JalnbPJf-7U9QpbLJfi2a4LwwLRVP0OKhSp_RtdgyY",
	"access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAzNzA0MjY1LCJpYXQiOjE3MDM3MDM5NjUsImp0aSI6IjdmOTZjZDExMzc4MDQzZDY5ZmRkZDgxYjliMjRmNDFhIiwidXNlcl9pZCI6MjEyfQnXPYekgNFsRSUdMrw3giB7pF21-KA5iOsTIHkxP5NLM"
}
```

---

### **`POST` *Token Verify***

> The function of the endpoint is to verify the validity of the access token.
> 

**Endpoint:** /token/verify

**Content-Type:** JSON

**Access Level:** Any

**Request Body Types:**

- token `string` `required`

**Request Body Example:**

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAzNzA0MjY1LCJpYXQiOjE3MDM3MDM5NjUsImp0aSI6IjdmOTZjZDExMzc4MDQzZDY5ZmRkZDgxYjliMjRmNDFhIiwidXNlcl9pZCI6MjEyfQnXPYekgNFsRSUdMrw3giB7pF21-KA5iOsTIHkxP5NLM"
}

```

**Response Example - 200:**

`POST - /api/token/verify`

**Response Error Example - 401 - Unauthorized:**

```json
{
	"detail": "Token is invalid or expired",
	"code": "token_not_valid"
}
```

---

### **`POST` *Token Refresh***

> This endpoint is utilized to refresh a user's access token by utilizing the refresh token.
> 

**Endpoint:** /token/refresh

**Content-Type:** JSON

**Access Level:** Any

**Request Body Types:**

- refresh `string` `required`

**Request Body Example:**

```json
{
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAzNzA0MjY1LCJpYXQiOjE3MDM3MDM5NjUsImp0aSI6IjdmOTZjZDExMzc4MDQzZDY5ZmRkZDgxYjliMjRmNDFhIiwidXNlcl9pZCI6MjEyfQnXPYekgNFsRSUdMrw3giB7pF21-KA5iOsTIHkxP5NLM"
}
```

**Response Example - 200:**

`POST - /api/token/refresh`

```json
{
    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAzNzA0MjY1LCJpYXQiOjE3MDM3MDM5NjUsImp0aSI6IjdmOTZjZDExMzc4MDQzZDY5ZmRkZDgxYjliMjRmNDFhIiwidXNlcl9pZCI6MjEyfQnXPYekgNFsRSUdMrw3giB7pF21-KA5iOsTIHkxP5NLM"
}
```

**Response Error Example - 401 - Unauthorized:**

```json
{
	"detail": "Token is invalid or expired",
	"code": "token_not_valid"
}
```

---

### **`GET` *Retrieve User Data***

> This endpoint is utilized to retrieve general user data and access information.
> 

**Endpoint:** /usercorp

**Authentication:** Bearer: Access Token

**Access Level:** Implanter

**Response Example - 200:**

`GET - /api/usercorp`

```json
{
	"user": {
		"id": 287,
		"username": "EDUARDO.GREVE",
		"first_name": "Eduardo",
		"last_name": "Greve",
		"email": "eduardo.greve@semeq.com"
	},
	"corporation": [
		{
			"id": 54,
			"name": "SEMEQ"
		}
	],
	"sites": [
		{
			"id": 10441,
			"name": "PORTAL DAS ROSAS",
			"corporation": 54
		}
	]
}
```

**Some examples of error responses:**

`GET - /api/usercorp`

- 403 - Forbiden

```json
{
	"detail": "Given token not valid for any token type",
	"code": "token_not_valid",
	"messages": [
		{
			"token_class": "AccessToken",
			"token_type": "access",
			"message": "Token is invalid or expired"
		}
	]
}
```

`GET - /api/usercorp`

- 403 - Forbiden

```json
{
	"detail": "You do not have permission to perform this action."
}
```

---

### **`GET` *Retrieve Tree***

> This endpoint is designed to retrieve the complete tree structure from a site, navigating to the asset level exclusively.
> 

**Endpoint:** /implantation/mobile/tree

**Authentication:** Bearer: Access Token

**Access Level:** Any

**Request Params Types:**

- site `integer` `required`

**Request Body Types:**

- revision `integer` `required`
- nodes `object` `optional`

**Response Example - 200:**

`GET - /implantation/mobile/tree?site=10441`

```json
  {
	"id": 10441,
	"name": "PORTAL DAS ROSAS",
	"revision": 28,
	"tree": [
		{
			"id": 2016775,
			"asset_type": 17,
			"group": "motor",
			"status": true,
			"name": "TESTE",
			"tag": null,
			"level": 3,
			"order": 1,
			"parent": 2016771,
			"site": 10441
		},
		{
			"id": 2015883,
			"asset_type": 17,
			"group": "motor",
			"status": true,
			"name": "TESTE-5",
			"tag": null,
			"level": 3,
			"order": 5,
			"parent": 2015878,
			"site": 10441
		},...
  ]}
```

**Response Error Example - 404 - Not Found:**

`GET - /implantation/mobile/tree?site=10198989`

```json
  {
    "detail": "You need to send revision and site parameters!"
  }
```

---

### **`GET` *Retrieve Asset Info***

> This endpoint is responsible to retrieve asset information, encompassing general types such as groups or extending to the installation level (devices).
> 

**Endpoint:** /implantation/mobile/info

**Authentication:** Bearer: Access Token

**Access Level:** Any

**Request Params Types:**

- site `integer` `required`
- id `integer` `required`
- device_type `integer` `optional`

**Response Example - 200:**

`GET - /implantation/mobile/info?site=10441`

```json
{
	"asset_info": [
		{
			"devices": [
				{
					"serial_number": "042",
					"device_type_id": 1,
					"directions": [
						"X",
						"Y",
						"Z"
					],
					"services": [
						1,
						2
					]
				},...
			],
			"asset_id": 1291379,
			"asset_type_id": 269,
			"asset_type": "BOMBA GENÉRICA",
			"asset_type_group": "pump",
			"points": [
				"28V",...
			],
			"fce": {
				"asset_id": 1291379,
				"size": "large",...
			}
		},...
	]
}
```

**Some examples of error responses:**

`GET - /implantation/mobile/info`

- 400 - Bad request

```json
{
	"detail": "Site id is required!"
}
```

`GET - /implantation/mobile/info?site=908080`

- 400 - Bad request

```json
{
	"detail": "Site not found or no device linked in this site"
}
```

---

### **`GET` *Retrieve Static Data***

> This endpoint is utilized to fetch general and static data that can be employed to populate application databases.
> 

**Endpoint:** /implantation/mobile/static

**Content-Type:** JSON

**Authentication:** Bearer: Access Token

**Access Level:** Any

**Request Params Types:**

- language `string` `required` `supported_languages = ["en_us", "pt_br"]`

**Response Example - 200:**

`GET - /implantation/mobile/static`

```json
{
	"asset_group": [
		{
			"id": "motor",
			"desc": "MOTOR"
		},
		{
			"id": "gearbox",
			"desc": "GEARBOX"
		},...
	],
	"services": [
		{
			"id": 2,
			"name": "TEMPERATURE"
		},...
	],
	"device_type": [
		{
			"id": 59,
			"name": "AXON VB",
			"available_services": [
				{
					"id": 2,
					"name": "TEMPERATURE"
				},
				{
					"id": 1,
					"name": "VIBRATION"
				}
			],
			"bases": [
				{
					"id": 37,
					"name": "STAINLESS VB2",
					"default": true},
				{
					"id": 35,
					"name": "NO BASE",
					"default": false}
			]
		},...
	]
}
```

---

### **`GET` *Get Lubricants***

> This endpoint is responsible for searching for registered lubricants
> 

**Method:** **GET**

**Endpoint:** /implantation/mobile/static/get_lubricants **Authentication:** Bearer: Access Token

**Access Level:** Any

**Response Example - 200:**

```json
[
    {
        "id": 2,
        "name": "Fabricante",
        "lubricants": [
            {
                "id": 1,
                "name": "Tipo - Lubrificante - Norma"
            }
        ]
    }
]
```

**Response Example - 403:**

```json
{
    "detail": "Authentication credentials were not provided."
}
```

## Project Tree

### Backend

```powershell
app/
│   api.py
│   auth.py
│   client.py
│   schema.py
│   __init__.py
```

---

### Frontend

```powershell
Frontend/
				src/
						│   App.css
						│   App.jsx
						│   index.css
						│   main.jsx
						│
						├───api
						│       ApiService.jsx
						│
						└───routes
						    │   Dashboard.jsx
						    │   Login.jsx
						    │   lubricants.jsx
						    │   MobileInfo.jsx
						    │   MobileTree.jsx
						    │   Static.jsx
						    │   usercorp.jsx
						    │
						    └───styles
						            Dashboard.css
						            Login.module.css
						            lubricants.css
						            MobileInfo.css
						            MobileTree.css
						            Static.css
						            usercorp.css
```