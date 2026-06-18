# Dzencode test challange

Next.js application with Socket.io for real-time communication.

## Prerequisites

- [Node.js](https://nodejs.org/) (v20 or later recommended)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) and Docker Compose (optional, for containerized deployment)

## Getting Started

First, clone the repository:

```bash
git clone https://github.com/rocolusso/dzencode-test-challange.git
cd dzencode-test-challange
```

### Local setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Build the project:

   ```bash
   npm run build
   ```

3. Start the project:

   ```bash
   npm run start
   ```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Development mode

To run the project in development mode with hot reload:

```bash
npm run dev
```

## Docker

To build the Docker image and run the container in the background:

```bash
docker compose up -d
```

The application will be available at [http://localhost:3000](http://localhost:3000).

To stop the container:

```bash
docker compose down
```
