# AccessMembers Ticketing System

## Note
To view the process of building this check out.
The "Access Members - Ticketing App Dev Process.pdf"
file. Which should tell you how exactly I built this app on a 
tight schedule. Please keep in mind that I have completed the app in
16 hours and 7 minutes. I have never used Graphql or React Native/Expo.
And in the last 4 months I wrote mostly Golang.

## Overview

This is a monorepo project containing a **backend** and a **frontend** for an application built with **NestJS**, **GraphQL**, **Apollo**, **React Native/Expo**, and **PostgreSQL**.

### Backend
- **NestJS** with **GraphQL** and **Apollo**
- **PostgreSQL** database using **TypeORM**

### Frontend
- **React Native** with **Expo**
- **Apollo** for GraphQL interactions
- **Redux** for state management
- **React Native Paper** for UI components

---

## Requirements

To run this project locally, you need the following:

- **Node.js** installed
- **PostgreSQL** installed on your machine (macOS recommended)
- **XCode** installed on your MAC
- **AndroidStudio**  can do, but not tested
---

## Setup

### 1. Install Backend

Navigate to the `backend/` folder and install dependencies:

```bash
cd backend/
npm install
npm run start
```

After this you should turn the app off and run migrations:

```bash
npm run migration:run
```
The reason for this is that on start up the app ensures db creation
After which you can run migrations.

### 2. Create user
A user must be manually created either via a PostgreSQL client or using the GraphQL playground. Once you have created a user, you’ll be able to interact with the application.

## 3. Frontend
```bash
cd frontend/
npm install
npx expo start
```

After creating a user in the backend, you will need to manually set the user’s id in the frontend.
1.	Open the frontend/App.tsx file.
2.	Locate the UserLoader function and set the userId of the newly created user there.

### The app should now display all features.

- Create event
- List events
- Event detail
- Create order