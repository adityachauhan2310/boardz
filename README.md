# BoardZ - Project Management Board

BoardZ is a powerful, self-hosted project management tool inspired by Trello, Jira, and other kanban-style applications. It allows teams to organize tasks, track progress, and collaborate effectively.


## Features

- **Kanban Boards**: Create and manage tasks using customizable boards and lists
- **Card System**: Detailed cards with descriptions, comments, attachments, and more
- **User Management**: Add team members with different permission levels
- **Custom Fields**: Create custom fields to store additional information
- **Notifications**: Get notified about important updates via webhooks (Slack, Discord, etc.)
- **Labels & Due Dates**: Organize and prioritize tasks with visual indicators
- **Task Lists**: Break down complex tasks into manageable sub-tasks
- **Responsive Design**: Works on desktop and mobile devices

## Installation

### Docker (Recommended)

The easiest way to get started is using Docker:

```bash
# Clone the repository
git clone https://github.com/adityachauhan2310/boardz.git
cd boardz

# Start the application using Docker Compose
docker-compose up -d
```

The application will be available at http://localhost:1337.

### Manual Installation

#### Prerequisites

- Node.js 18+
- PostgreSQL 12+
- Git

#### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/adityachauhan2310/boardz.git
   cd boardz
   ```

2. Install server dependencies:
   ```bash
   cd server
   npm install
   ```

3. Install client dependencies:
   ```bash
   cd ../client
   npm install
   ```

4. Configure the database:
   ```bash
   cd ../server
   cp .env.sample .env
   # Edit .env file with your database credentials
   ```

5. Initialize the database:
   ```bash
   npm run db:init
   ```

6. Create an admin user:
   ```bash
   npm run db:create-admin-user
   ```

7. Start the server:
   ```bash
   npm start
   ```

8. In a separate terminal, start the client:
   ```bash
   cd ../client
   npm start
   ```

The application will be available at http://localhost:3000.

## Configuration

BoardZ can be configured using environment variables. See the sample `.env` file for available options.

### Important Environment Variables

- `DATABASE_URL`: PostgreSQL connection string
- `SECRET_KEY`: Secret key for JWT token generation
- `BASE_URL`: Base URL of your BoardZ installation
- `ADMIN_EMAIL`: Default admin email (used during initialization)

## Usage

### Creating a Project

1. Log in with your admin account
2. Click "Create Project" button
3. Enter project details and select a background
4. Invite team members (optional)

### Creating a Board

1. Open a project
2. Click "Create Board" button
3. Enter board details
4. Start adding lists and cards

### Adding Tasks

1. Open a board
2. Click "Add card" in any list
3. Enter card details
4. Add attachments, labels, or assign members as needed

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

