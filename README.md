# FinFlow - Frontend

FinFlow is a financial transaction submission and approval system built with a focus on simplicity, clarity, and role-based access. This is the frontend portion of the app, built using **Next.js**, **Tailwind CSS**, and **NextAuth.js** for authentication.

## Features

- User authentication using **NextAuth** with Google provider  
- Role-based access for **employees** and **managers**  
- Financial transaction submission for employees  
- Approval/rejection workflow for managers  
- Responsive and clean UI using **Tailwind CSS**  
- Transactions displayed using **TanStack Table**

## Tech Stack

- **Next.js** – React Framework for server-rendered apps  
- **Tailwind CSS** – Utility-first CSS framework  
- **NextAuth.js** – Authentication for Next.js  
- **TanStack Table** – Headless UI for tables  
- **Axios** – For API requests  
- **React Icons** – Icons used throughout the app

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (v18 or higher)  
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/your-username/finflow-frontend.git
cd finflow
```
### Install dependencies

npm install
# or
yarn install

- Set up environment variables



Create a .env.local file in the root directory and add the following:

NEXTAUTH_URL=https://your-deployment-url.com
NEXTAUTH_SECRET=your_nextauth_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# If connecting to backend API
NEXT_PUBLIC_API_URL=https://fin-flow-api.com

- Run the development server



npm run dev
# or
yarn dev

Visit http://localhost:3000 to view the app.
