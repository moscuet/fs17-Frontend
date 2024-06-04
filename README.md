
<p align="center">
    <h1 align="center">Eshop: Front-end</h1>
</p>
<p align="center"> <em>An innovative frontend project leveraging modern web technologies for an exceptional user experience.</em>
</p>
<p align="center">
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
<img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" alt="Redux">
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
<img src="https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white" alt="MUI">
</p>

## General Description

> This project is built using React and TypeScript, integrating Material UI for styling and Redux Toolkit for state management. The application provides a robust structure for scalable frontend development, focusing on performance and user-friendly design.

**Deployed Application:** [fs17-fe-project Live](https://elaborate-churros-5c1d91.netlify.app/)

**Backend deployed :** [GitHub Repo](https://virtuous-motivation-production.up.railway.app/index.html)

**Backend Repository:** [GitHub Backend Repo](https://github.com/moscuet/CSharp_FullStack)

## Table of Contents

- [Getting Started](#getting-started)
- [Installation](#installation)
- [Features](#features)
- [API Reference](#api-reference)
- [Folder Structure](#folder-structure)
- [Testing](#testing)
- [Deployment](#deployment)


## Getting Started

To set up the project locally, follow these instructions:

### Installation

1. Clone the frontend repository:

```
git clone https://github.com/moscuet/fs17-Frontend.git
```
3. Clone the backend repository:

```
git clone https://github.com/moscuet/CSharp_FullStack.git
```

3. Install the dependencies:
```
front end:

npm install

backend:

dotnet restore
```

4. Start the application:
```
frontend:

npm start

backend:

dotnet run
```

## Features

- Comprehensive user interface with reactive updates.
- Rich integration with backend services for full CRUD capabilities on user and product management.
- Advanced form handling with Formik and Yup for form validation.
- Email functionalities using Nodemailer.
- Toast notifications for user interactions.

  #### Products page
<img width="1439" alt="Screenshot 2024-06-04 at 10 06 59" src="https://github.com/moscuet/fs17-Frontend-project/assets/51766137/bcfd31a1-0ff4-4578-adb7-92c8e14b8f26">

  ####  Feature Products

<img width="1421" alt="Screenshot 2024-06-04 at 10 07 16" src="https://github.com/moscuet/fs17-Frontend-project/assets/51766137/13abba42-a289-45fd-98fc-0be8563522e2">

#### Contacts form 
<img width="771" alt="Screenshot 2024-06-04 at 10 07 28" src="https://github.com/moscuet/fs17-Frontend-project/assets/51766137/03dbeb75-044e-4c32-9f72-282664aeb32e">

#### Cart page 

<img width="1420" alt="Screenshot 2024-06-04 at 10 07 35" src="https://github.com/moscuet/fs17-Frontend-project/assets/51766137/534be46d-1dac-4d44-94cf-897c08b2bbfc">

#### User dashboard
<img width="1426" alt="Screenshot 2024-06-05 at 0 02 58" src="https://github.com/moscuet/fs17-Frontend/assets/51766137/b9a849b1-133f-475b-a1c1-4613d9d6cca6">


## API Reference

For detailed information on backend endpoints, refer to the backend repository: [Backend API Documentation](https://github.com/moscuet/CSharp_FullStack).

## Folder Structure

Here's a high-level overview of the folder structure:

```sh
fs17-fe-project/
│
├── public/ 
│ ├── index.html # Entry HTML file
│ └── assets/productImages
│
├── src/ # Source files
│ ├── app/ # redux store
│ ├── common-types/ 
│ ├── features/
│    ├── addresses/ # address fearture
│       ├── const/
│       ├── addressDto.ts
│       ├── addressSlice.ts 
│       ├── AddAddress,tsx
│       ├── addressSlice.ts 
│    ├── auth/ 
│    ├── cart/
│    ├── categories/
│    ├── contact/
│    ├── layout/ 
│    ├── orders/ 
│    ├── products/ 
│    ├── users/
│ ├── pages/ 
│ ├── shared-components/
│ ├── shared-features/
│ ├── styles/
│ ├── theme/
│ ├── routes/
│ ├── App.tsx # Root React component
│ ├── index.tsx # Entry point for React application
│ └── styles/ # Stylesheets and CSS


# Testing

Ensure all dependencies are installed:
```
npm install
```

Run the test suite:
```
npm test
```

# Deployment

Deployed using Netlify for the frontend and Railway cloud service for the backend. Continuous integration and deployment are configured to update the live application upon new commits to the repository.

**Live Application:** [fs17-fe-project](https://elaborate-churros-5c1d91.netlify.app/)

This README is formatted to provide a comprehensive guide to anyone looking to understand or contribute to your project. Adjust paths, commands, and other specific details as necessary.

