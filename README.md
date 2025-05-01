# The Calendar

A modern web application with authentication and 2FA built with React, TypeScript, and Supabase.

## Quick Start Guide

### Prerequisites

1. Node.js (v18 or higher) - [Download here](https://nodejs.org/)
2. A Supabase account (free) - [Sign up here](https://supabase.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/pkheni123/the-calendar.git
   cd the-calendar
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
   This will also create a `.env` file from `.env.example` automatically.

### Setting up Supabase

1. Go to [Supabase](https://supabase.com/) and create a new account or sign in
2. Create a new project
3. Once your project is ready, go to Project Settings > API
4. Copy these values from the API settings page:
   - Project URL (anon/public)
   - anon/public key
5. Update your `.env` file with these values:
   ```
   VITE_SUPABASE_URL=your-project-url
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

### Running the Application

1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open your browser and navigate to the URL shown in your terminal (usually `http://localhost:5173`)

### Test Credentials

For testing the application:
- Any email format will work for registration
- Use code `123456` for 2FA verification (this is a demo implementation)

### Features

- User authentication (sign up, sign in, sign out)
- Two-factor authentication (demo)
- Password reset flow (demo)
- Protected routes
- Modern UI with Tailwind CSS
- TypeScript for type safety

### Project Structure

- `src/components/` - Reusable UI components
- `src/contexts/` - React contexts (including authentication)
- `src/pages/` - Application pages/routes
- `src/lib/` - Utility functions and configurations

### Technologies Used

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Supabase
- React Router DOM

### Troubleshooting

1. **Node.js version issues:**
   - Make sure you have Node.js v18 or higher installed
   - Run `node --version` to check your version

2. **Module not found errors:**
   - Run `npm install` again
   - If the error persists, try deleting `node_modules` and `package-lock.json`, then run `npm install`

3. **Environment variable errors:**
   - Make sure `.env` file exists (it should be created automatically during installation)
   - Verify the variable names match exactly: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
   - Make sure there are no spaces around the `=` in the `.env` file

4. **Supabase connection issues:**
   - Verify your Supabase project is active
   - Check that your URL and anon key are correct in `.env`
   - Make sure you're using the anon/public key, not the service role key

### Production Notes

This is a demo application with simplified authentication flows. In a production environment, you would want to:
- Implement proper email verification
- Use real 2FA with TOTP or SMS
- Add proper password reset functionality
- Implement rate limiting
- Add additional security measures

## License

MIT 