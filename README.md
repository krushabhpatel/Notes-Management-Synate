# Project Overview

This project consists of two main parts: a web application built with Angular and a server built with Node.js. This guide will help you set up and run both parts locally.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/get-npm) (usually comes with Node.js)
- [Angular CLI](https://angular.io/cli) (globally installed)

## Setting Up the Project

### 1. Clone the Repository

Clone this repository to your local machine:

```bash
git clone https://github.com/krushabh-patel/note-management.git
cd note-management
```

### 2. Run Angular Web Application
Open Terminal in base directory and Navigate to the web directory and install the dependencies:
```bash
cd notes-app
npm i 
```
Run the Angular Web Application
```bash
ng serve
```
The Angular application will be available at http://localhost:4200.

### 3. Run Node.js Server
Open Terminal in base directory and Navigate to the api directory and install the dependencies:

```bash
cd notes-app-api
npm i 
```
Run the Angular Web Application
```bash
npm start
```
The Server  will be available at http://localhost:3000.