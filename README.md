# Car Showroom 3D Demo

Welcome to the **Car Showroom 3D Demo**! This repository showcases best practices in modern software development, combining the power of .NET 8, C#, TypeScript, React, Redux, WebGL, Kubernetes, PostgreSQL, and Test-Driven Development (TDD). The project features a car showroom where users can interactively pick parts for their desired vehicle. The parts are visualized in a 3D rendered scene, providing a seamless and interactive user experience.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Setup and Installation](#setup-and-installation)
  - [Pre-requisites](#pre-requisites)
  - [Kubernetes Setup](#kubernetes-setup)
  - [Running Locally](#running-locally)
  - [Running Locally using Docker](#running-locally-using-docker)

---

## Features

- **3D Car Showroom**: An interactive 3D environment using WebGL where users can select and view car parts.
- **Part Picker**: Users can configure different parts (engine, wheels, etc.) and see real-time updates in the 3D scene.
- **React & Redux**: The front-end is built with React, with state management handled by Redux.
- **.NET 8 API**: A fast, scalable backend built on .NET 8 and C#, using PostgreSQL as the database.
- **Test-Driven Development (TDD)**: Follows best practices for unit and integration testing, ensuring a reliable and maintainable codebase.
- **Kubernetes & Skaffold**: The project is containerized and orchestrated using Kubernetes with Skaffold for local development and Minikube for cluster management.
- **PostgreSQL**: A robust, open-source relational database for storing vehicle parts, configurations, and user data.
- **CI/CD with GitHub Actions**: Automated build, test, and deployment pipelines.


## Tech Stack

### Frontend
- **React**: For building dynamic, interactive UIs.
- **Redux**: For predictable state management.
- **TypeScript**: Static typing for improved code quality and development experience.
- **WebGL**: For 3D rendering of the car showroom and parts.

### Backend
- **.NET 8 (C#)**: Fast, scalable RESTful API for managing car parts and configurations.
- **Entity Framework Core**: For managing database interactions.
- **PostgreSQL**: The relational database used to store car part data, user configurations, and more.

### Containerization and Orchestration
- **Kubernetes**: Orchestration of application components using Minikube in development.
- **Skaffold**: Streamlining local Kubernetes development with easy configuration and workflow management.

### Testing & CI/CD
- **Test-Driven Development (TDD)**: Unit tests for core logic, integration tests for API, and snapshot tests for frontend.
- **xUnit**: Testing framework for C#/.NET code.
- **Jest**: Testing framework for TypeScript/React components.
- **GitHub Actions**: CI/CD pipelines for build, test, and deployment.


## Architecture

The project follows a modular architecture:

1. **Frontend (React + WebGL)**: A React app renders the car showroom with a 3D scene, allowing users to interact with different car parts. State is managed through Redux for scalability and consistency.
   
2. **Backend (ASP.NET Core API)**: A .NET 8 backend manages car parts and configurations, serving data to the frontend. The API follows RESTful principles and uses **PostgreSQL** as the main database for persisting part data and configurations.

3. **Database (PostgreSQL)**: A PostgreSQL instance is used to store all car-related data, including user-selected configurations and available parts.

4. **Containerization (Docker + Kubernetes)**: Each component (frontend, backend, database) is containerized using Docker and orchestrated through Kubernetes. Skaffold manages the local development workflow, providing hot-reload capabilities and easier Kubernetes configuration.


## Setup and Installation

### Pre-requisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js & npm](https://nodejs.org/en/) (for the frontend)
- [Docker](https://www.docker.com/) (for containerization)
- [Minikube](https://minikube.sigs.k8s.io/docs/start/) (for local Kubernetes)
- [Skaffold](https://skaffold.dev/) (for Kubernetes workflow management)
- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) (for Kubernetes management)
- [PostgreSQL](https://www.postgresql.org/download/) (for running the database locally)


### Kubernetes Setup

This project uses Skaffold for managing the Kubernetes environment. To set up Kubernetes locally with Minikube:

1. **Start Minikube**:
   ```bash
    minikube start --profile custom
    skaffold config set --global local-cluster true
    eval $(minikube -p custom docker-env)
    minikube -p custom addons enable ingress
   ```

2. **Review your cluster's IP address**
   ```bash
   minikube -p custom ip
   ```

   You can use this IP to access the cluster.


### Running Locally using Kubernetes

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/car-showroom-3d-demo.git
   cd car-showroom-3d-demo
   ```

2. **Deploy the app using Skaffold**:
   ```bash
   skaffold dev
   ```

   Skaffold will automatically build, deploy, and watch your project, updating the Kubernetes environment as you make changes. The PostgreSQL database will also run inside the Kubernetes cluster, configured via Kubernetes manifests.

3. **Seed sample data**:
    ```bash
    kubectl apply -f k8s/seed-sample-data-job.yaml
    ```

   This creates the database and seeds it with the sample data.

4. **You can now access your cluster with cluster's IP address!**


### Running Locally using Docker

You can also directly run the project by issuing `docker run`s for all the images, but it requires you to manage building, port-forwarding and updating services by yourself.
