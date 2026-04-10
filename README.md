# 📘 Genderize Classify API

A lightweight REST API that wraps **Genderize.io** to predict the gender of a given name with confidence scoring.

Built with **Node.js + Express** using a clean **MVC architecture**.

---

## 📑 Table of Contents

- [📘 Genderize Classify API](#-genderize-classify-api)
  - [📑 Table of Contents](#-table-of-contents)
  - [📌 Overview](#-overview)
  - [⚙️ Tech Stack](#️-tech-stack)
  - [🗂️ Project Structure](#️-project-structure)
    - [🔹 Layer Responsibilities](#-layer-responsibilities)
  - [🚀 Getting Started](#-getting-started)
    - [✅ Prerequisites](#-prerequisites)
    - [📦 Installation](#-installation)
  - [Development (auto-restart)](#development-auto-restart)
  - [Production](#production)
  - [Server](#server)
  - [📡 API Reference](#-api-reference)
    - [🔹 Endpoint](#-endpoint)
    - [🔹Query Parameters](#query-parameters)
    - [✅ Success Response (200)](#-success-response-200)
  - [🧠 Processing Logic](#-processing-logic)
  - [❗ Error Handling](#-error-handling)
    - [🔹 Error Cases](#-error-cases)

---

## 📌 Overview

This API:

- Accepts a `name` via query parameter  
- Calls the **Genderize API**  
- Processes the response  
- Returns a structured result with:
  - Confidence scoring  
  - Clean field naming  
  - Fresh timestamp per request  

---

## ⚙️ Tech Stack

| Tool         | Purpose                         |
| ------------ | ------------------------------- |
| Node.js ≥ 18 | Runtime (native `fetch`)        |
| Express 4    | HTTP framework                  |
| ES6 Modules  | Modern syntax (`import/export`) |

> No database. No external HTTP client required.

---

## 🗂️ Project Structure

    ├── controllers/
    │ └── controller.js
    │ └── service.js
    ├── routes/
    │ └── route.js
    ├── index.js
    ├── package.json
    ├── README.md

---

### 🔹 Layer Responsibilities

- **Routes** → Map endpoints to controllers  
- **Controllers** → Validate input + shape response
          - Handle external API calls  

---

## 🚀 Getting Started

### ✅ Prerequisites

- Node.js v18+
- npm

---

### 📦 Installation

```bash
git clone https://github.com/your-username/genderize-classify-api.git

cd genderize-classify-api

npm install
```

---

## Development (auto-restart)

npm run dev

## Production

npm start

## Server

`http://localhost:3000`

## 📡 API Reference

### 🔹 Endpoint

    GET /api/classify?name={name}

---

### 🔹Query Parameters

| Parameter | Type   | Required | Description      |
| --------- | ------ | -------- | --------------   |
| name      | string | ✅       | Name to classify |

---

### ✅ Success Response (200)

```bash
{
  "status": "success",
  "data": {
    "name": "john",
    "gender": "male",
    "probability": 0.99,
    "sample_size": 1234,
    "is_confident": true,
    "processed_at": "2026-04-10T12:00:00.000Z"
  }
}

```

## 🧠 Processing Logic

| Field        | Source            | Rule                                              |
| ------------ | ----------------- | ------------------------------------------------- |
| name         | Query param       | Lowercased before returning                       |
| gender       | Genderize API     | Returned as-is                                    |
| probability  | Genderize API     | Returned as-is                                    |
| sample_size  | Genderize `count` | Renamed                                           |
| is_confident | Computed          | `true` if probability ≥ 0.7 AND sample_size ≥ 100 |
| processed_at | Server            | Dynamic UTC ISO 8601 timestamp                    |

---o

## ❗ Error Handling

All errors follow:

```bash
  {
    "status": "error",
    "message": "description"
  }
```

---

### 🔹 Error Cases

| Status Code | Scenario                | Message                                       |
| ----------- | ----------------------- | --------------------------------------------- |
| 400         | Missing or empty name   | Missing or empty name parameter               |
| 422         | Invalid name type       | name must be a string                         |
| 200*        | No prediction available | No prediction available for the provided name |
| 502         | Upstream API error      | Upstream API returned an error                |
| 500         | Server error            | Internal server error                         |
| 404         | Route not found         | Route not found                               |


|  ⚠️ Edge case returns 200 but with error structure (per spec).
