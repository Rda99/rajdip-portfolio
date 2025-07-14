# Data Analyst & Engineer Portfolio Website

## Overview

This is a modern, interactive portfolio website built with React, TypeScript, and Framer Motion to showcase professional experience, technical skills, and projects in data analysis and engineering. The application features a full-stack architecture with a React frontend and Express.js backend, designed to highlight Rajdip Dutta's expertise in data analytics and engineering.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a modern full-stack architecture with clear separation between frontend and backend concerns:

### Frontend Architecture
- **Framework**: React.js with TypeScript for type safety
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent design
- **Animations**: Framer Motion for smooth, interactive animations
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state management
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript for full-stack type safety
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: Express sessions with PostgreSQL store

## Key Components

### Frontend Structure
- **Single Page Application**: Portfolio sections (Hero, Skills, Experience, Projects, Contact)
- **Interactive Elements**: Expandable experience cards, animated background elements (SpiderWeb, Globe)
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Component Library**: Extensive shadcn/ui components for consistent UI patterns

### Backend Structure
- **API Routes**: RESTful API endpoints (prefixed with `/api`)
- **Database Schema**: Contact form submissions storage
- **Storage Interface**: Abstracted storage layer with in-memory fallback
- **Development Setup**: Vite integration for development with HMR support

### Data Models
- **Contact**: Stores contact form submissions (id, name, email, message)
- **User**: Basic user model structure (prepared for future authentication)

## Data Flow

1. **Static Content**: Portfolio data (skills, experience, projects) is statically defined in React components
2. **Contact Form**: User submissions flow through React Hook Form → API endpoint → PostgreSQL database
3. **Real-time Feedback**: Toast notifications provide immediate user feedback
4. **Query Management**: TanStack React Query handles API state management and caching

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS, Radix UI primitives, shadcn/ui components
- **Animations**: Framer Motion for interactive animations
- **3D Graphics**: Three.js for the animated globe component
- **Forms**: React Hook Form with Zod validation
- **Icons**: React Icons library

### Backend Dependencies
- **Database**: Neon Database (serverless PostgreSQL)
- **ORM**: Drizzle ORM with Drizzle Kit for migrations
- **Session Store**: connect-pg-simple for PostgreSQL session storage
- **Development**: tsx for TypeScript execution, esbuild for production builds

### Development Tools
- **Build System**: Vite with React plugin
- **Type Checking**: TypeScript with strict configuration
- **Code Quality**: ESLint configuration
- **Database Tools**: Drizzle Kit for schema management and migrations

## Deployment Strategy

### Production Build Process
1. **Frontend Build**: Vite builds the React application to `dist/public`
2. **Backend Build**: esbuild bundles the Express server to `dist/index.js`
3. **Database Migration**: Drizzle Kit pushes schema changes to production database

### Environment Configuration
- **Database**: Configured via `DATABASE_URL` environment variable
- **Session Management**: PostgreSQL-backed sessions for scalability
- **Static Assets**: Served from Express in production, Vite dev server in development

### Scalability Considerations
- **Database**: Serverless PostgreSQL (Neon) for automatic scaling
- **Frontend**: Static assets can be served via CDN
- **Backend**: Stateless Express server suitable for horizontal scaling
- **Session Storage**: PostgreSQL-backed sessions support multiple server instances

The architecture prioritizes developer experience with TypeScript throughout, modern tooling, and clear separation of concerns while maintaining simplicity for a portfolio website's requirements.