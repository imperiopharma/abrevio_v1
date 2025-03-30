
# Abrev.io - URL Shortener & QR Code Generator

A modern web application for shortening URLs and generating QR codes with analytics and user management.

## Project Overview

Abrev.io is a comprehensive URL shortening service that allows users to:
- Create shortened URLs
- Generate QR codes
- Track link analytics
- Manage user profiles
- Access different plan tiers (free and premium)

## Technology Stack

- **Frontend**: React with TypeScript
- **UI**: Tailwind CSS with shadcn/ui components
- **State Management**: React Context API and TanStack Query
- **Routing**: React Router
- **Animation**: Framer Motion
- **Authentication & Backend**: Supabase
- **Charts**: Recharts
- **QR Code**: qrcode library
- **Build Tool**: Vite

## Project Structure

### Root Directories

```
/
├── public/               # Static assets
├── src/                  # Source code
├── supabase/             # Supabase configuration and functions
├── components.json       # shadcn/ui components configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── vite.config.ts        # Vite configuration
└── package.json          # Project dependencies and scripts
```

### Source Code Organization (`/src/`)

```
src/
├── components/           # UI components
│   ├── admin/            # Admin dashboard components
│   ├── animations/       # Animation components
│   ├── dashboard/        # User dashboard components
│   ├── links/            # Link management components
│   ├── ui/               # shadcn/ui component library
│   └── ...               # Other specific components
├── contexts/             # React context providers
├── hooks/                # Custom React hooks
├── integrations/         # Third-party service integrations
│   └── supabase/         # Supabase client setup
├── lib/                  # Utility functions and types
├── pages/                # Page components
└── services/             # API services
```

### Key Components

#### Authentication & User Management

- `src/contexts/AuthContext.tsx` - Auth context provider
- `src/services/auth.ts` - Authentication services
- `src/services/profile.ts` - User profile management
- `src/components/ProtectedRoute.tsx` - Route protection logic

#### URL Shortening & QR Codes

- `src/components/LinkShortener.tsx` - URL shortening form
- `src/components/QRCodeModal.tsx` - QR code display
- `src/components/WhatsAppQR.tsx` - WhatsApp link generator
- `src/services/links.ts` - Link management API
- `src/services/qrcodes.ts` - QR code generation

#### Dashboard & Analytics

- `src/pages/Dashboard.tsx` - Main dashboard page
- `src/components/DashboardHome.tsx` - Dashboard overview
- `src/components/MyLinks.tsx` - User's links management
- `src/components/dashboard/*.tsx` - Analytics charts and components

#### Admin Section

- `src/pages/AdminDashboard.tsx` - Admin main page
- `src/components/admin/*.tsx` - Admin-specific components

### Supabase Structure

```
supabase/
├── config.toml           # Supabase configuration
└── functions/            # Edge functions
    ├── redirect/         # Link redirection function
    └── table_exists/     # Utility function
```

## Authentication Flow

1. User signup/login via `src/pages/Register.tsx` or `src/pages/Login.tsx`
2. Authentication state managed by `AuthContext`
3. Protected routes check auth status via `ProtectedRoute` component

## Database Schema

### Main Tables

- `auth.users` - Supabase Auth users table
- `profiles` - Extended user information
- `links` - Shortened URL data
- `clicks` - Link click analytics
- `plans` - Subscription plans information

## Development Workflow

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

The project is deployed using Lovable's built-in deployment system. You can access the deployment options by clicking on the Publish button in the Lovable interface.

## Maintenance Guidelines

### Adding New Features

1. Create new components in the appropriate subdirectory under `src/components/`
2. Update services in `src/services/` if API interaction is needed
3. Add new pages in `src/pages/` and update routes in `src/App.tsx`

### Authentication Updates

Any changes to authentication logic should be made in:
- `src/contexts/AuthContext.tsx`
- `src/services/auth.ts`
- `src/components/ProtectedRoute.tsx`

### Styling Guidelines

- Use Tailwind CSS classes for styling
- For complex components, create new shadcn/ui components
- Follow the existing color scheme defined in `tailwind.config.ts`

### API Integration

- All Supabase database interactions should go through service files in `src/services/`
- Handle errors consistently using toast notifications

## Contributing

1. Create focused components with a single responsibility
2. Maintain TypeScript type safety throughout the project
3. Write clear, concise code with proper comments
4. Follow the existing folder structure and naming conventions

## License

This project is proprietary and confidential.

---

For questions or support, please contact the project maintainers.
