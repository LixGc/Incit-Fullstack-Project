# Incit Full-Stack Exam API Documentation

## Endpoints :

List of available user authentication endpoints:

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/google-login`
- `POST /auth/facebook-login`
- `POST /auth/logout`
- `PATCH /auth/resendVerification`
- `GET /auth/verify/:id/:uniqueString`

List of available user feature endpoints:

- `GET /user/profile`
- `GET /user/dashboard`
- `PATCH /user/resetPassword`
- `PATCH /user/resetName`

## 1. POST /auth/register

### Description

> Register an account

### Request

- body:

```json
{
  "username": "username",
  "email": "string",
  "password": "string",
  "secondPassword": "string"
}
```

### Response (201 - Created)

```json
{
  "message": "Account succesfully created!"
}
```

### Response (400 - Bad Request)

```json
{
    "message": "Please type your email"
}
OR
{
    "message": "Please type your password"
}
OR
{
    "message": "Please fill all the fields"
}
OR
{
    "message": "Password doesn't match"
}
```

## 2. POST /auth/login

### Description

> login into an account

### Request

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

### Response (200 - OK)

```json
{
  "access_token": "string",
  "verified": "boolean",
  "email": "string"
}
```

### Response (400 - Bad Request)

```json
{
  "message": "Email or Password is required"
}
OR
{
    "message": "Email or Password is required"
}

```

### Response (401 - Unauthorized)

```json
{
  "message": "Invalid email or password"
}
```

## 3. POST /auth/google-login

### Description:

> Login with google account or create user by google account

### Request:

- headers

```json
{
  "google_token": "string"
}
```

### Response (201 - Created)

OR

### Response (200 - OK)

```json
{
  "access_token": "string",
  "verified": "boolean",
  "email": "string"
}
```

## 4. POST /auth/facebook-login

### Description:

> Add cuisine

### Request

- headers

```json
{
  "email": "string",
  "username": "string"
}
```

### Response (201- Created)

```json
{
  "access_token": "string",
  "verified": "boolean",
  "email": "string"
}
```

### Response (400 - Bad Request)

```json
{
  "message": "Invalid data"
}
```

## 5. POST /auth/logout

> Create a logout history of the user

### Request:

- headers:

```json
{
  "access_token": "string"
}
```

### Response (201 - Created)

```json
  {
   "message": "Success"
  },
```

## 6. PATCH /auth/resendVerification

> resend an email verification to the user's email

### Request:

- headers:

```json
{
  "email": "email"
}
```

### Response (201 - Created)

```json
  {
    "message": "Email verification successfully sent!"
  },
```

### Response (404 - Not Found)

```json
{
  "message": "Email already verified"
}
```

### Response (404 - Not Found)

```json
{
  "message": "Data is not found!"
}
```

## 7. GET /auth/verify/:id/:uniqueString

> Verify user's email through user's email verification link

### Request:

- params:

```json
{
  "id": "integer",
  "uniqeString": "string"
}
```

### Response (200 - OK)

> Redirect user through a link

### Response (404 - Not Found)

```json
{
  "message": "Data is not found!"
}
```

## 8. GET /user/profile

> Get current user profile data

### Request:

- headers:

```json
{
  "access_token": "string"
}
```

### Response (200 - OK)

```json
{
  "username": "string",
  "email": "string",
  "verified": "boolean"
}
```

## 9. GET /user/dashboard

> Get all user's number of times logged in, timestamp of the user sign up, timestamp of the user logged out, also get total number of users who have signed up, total number of users with active sessions today, and average number of active session users in the last 7 days rolling

### Request:

- headers:

```json
{
  "access_token": "string"
}
```

- query:

```json
{
  "name": "string"
}
```

### Response (200 - OK)

```json
{
  "user": [
    {
      "id": "integer",
      "username": "string",
      "email": "string",
      "totalLogin": "integer",
      "createdAt": "date",
      "updatedAt": "date",
      "UserHistories": [
        {
          "id": "integer",
          "name": "string",
          "UserId": "integer",
          "createdAt": "date",
          "updatedAt": "date"
        },
        ...
      ]
    },
    ...
  "totalUser": "integer",
  "todayActiveSession": "integer",
  "averageActiveSessionsLast7Days": "float",
  "userLogoutData": [
    {
      "id": "integer",
      "name": "string",
      "UserId": "integer",
      "createdAt": "date",
      "updatedAt": "date"
    }
  ]
  ]
}
```

## 10. PATCH /user/resetPassword

> Reset and update user's password

### Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "oldPassword": "string",
  "newPassword": "string",
  "confirmPassword": "integer"
}
```

### Response (200 - OK)

```json
{
  "message": "Password successfully updated!"
}
```

### Response (400 - Not Found)

```json
{
    "message": "Please fill all the fields"
}
OR
{
    "message": "Invalid password"
}
OR
{
    "message": "Password doesn't match"
}
```

## 11. PATCH /user/resetName

> Reset and update user's username

### Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "newName": "string"
}
```

### Response (200 - OK)

```json
{
  "message": "Name successfully updated"
}
```

### Response (400 - Not Found)

```json
{
  "message": "New name can't be the same as the current one"
}
OR
{
    "message": "New name must be filled"
}
```

## GLOBAL RESPONSE

### (401 - Unauthorized / Unauthenticated / JsonWebTokenError / Unverified)

```json
{
  "message": "Invalid Token"
}
OR
{
    "message": "Email isn't verified, please check your email message for the verification link"
}
OR
{
    "message": "No access"
}
```

### Response (500 - Internal Server Error)

```json
{
  "message": "Internal Server Error"
}
```
