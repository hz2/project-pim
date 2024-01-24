[![Build Status](https://drone.respok.com/api/badges/huc/project-pim/status.svg)](https://drone.respok.com/huc/project-pim)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/hz2/project-pim) 
![GitHub last commit](https://img.shields.io/github/last-commit/hz2/project-pim) 

# project-pim

Install it and run:

```sh
npm install
npm run dev
```

## About

a pim system;

- Frontend: [https://github.com/hz2/project-pim](https://github.com/hz2/project-pim)

> next.js / react + mui + typescript

- Backend: [https://github.com/hz2/project-nest](https://github.com/hz2/project-nest)

> nest.js + typeorm + mysql + graphql


## Flow chart

```mermaid
flowchart LR;
    A[github push] --> B[drone pipeline] --> C[deploy to server]
```