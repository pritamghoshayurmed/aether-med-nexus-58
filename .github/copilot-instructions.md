# Copilot Instructions for Aether Med Nexus

## Project Overview
**Aether Med Nexus** is a comprehensive telemedicine platform built by team NeuralNerds. This is a React + TypeScript + Vite application with shadcn/ui components, featuring role-based dashboards for patients, doctors, hospitals, and super admins.

## Architecture & Key Patterns

### Dashboard-Centric Architecture
- **Role-based routing**: `/dashboard/{role}` pattern with dedicated dashboards for `patient`, `doctor`, `hospital`, and `admin`
- **Nested routing structure**: Each role has specialized sub-routes (e.g., `/dashboard/patient/appointments`, `/dashboard/doctor/analytics`)
- **Main dashboards**: `PatientDashboard.tsx`, `DoctorDashboard.tsx`, `HospitalDashboard.tsx`, `SuperAdminDashboard.tsx`

### Medical-Themed Component System
- **Custom medical components**: Use `MedicalCard` and `MedicalButton` instead of default shadcn components
- **Medical variants**: Components support medical-specific variants like `medical`, `glass`, `glow`, `floating`
- **Consistent theming**: Medical teal color palette (`--primary: 175 70% 45%`) with glass morphism effects

### CSS Architecture
- **CSS custom properties**: Extensive medical color system defined in `src/index.css`
- **Glass morphism**: `.glass-card` class provides backdrop blur and transparency effects
- **Medical animations**: `.medical-glow`, `.animate-float`, `.animate-pulse-glow` for interactive elements
- **Gradient system**: `--gradient-primary`, `--gradient-glass` for consistent medical aesthetics

### Component Patterns
```tsx
// Always use medical-themed components for healthcare UI
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from "@/components/ui/medical-card";
import { MedicalButton } from "@/components/ui/medical-button";

// Use medical variants for consistent theming
<MedicalCard variant="glass" size="lg">
  <MedicalButton variant="medical" size="xl">
```

## Development Workflow

### Build Commands
- `npm run dev` - Development server (port 8080)
- `npm run build` - Production build
- `npm run build:dev` - Development mode build
- `npm run lint` - ESLint validation

### Path Aliases
- `@/` maps to `src/` (configured in `vite.config.ts`)
- Import paths: `@/components`, `@/lib`, `@/hooks`, `@/pages`

## Key Technologies & Dependencies

### Core Stack
- **React 18** with TypeScript
- **Vite** as build tool with SWC plugin
- **React Router DOM** for routing
- **TanStack Query** for data fetching
- **shadcn/ui** as base component library

### Styling & UI
- **Tailwind CSS** with custom medical theme
- **Radix UI** primitives (extensive usage)
- **Lucide React** for icons
- **class-variance-authority** for component variants
- **tailwind-merge** + **clsx** via `cn()` utility

### Forms & Validation
- **React Hook Form** with **Zod** validation
- **@hookform/resolvers** for schema integration

## Component Structure Rules

### UI Components Location
- **Base components**: `src/components/ui/` (shadcn/ui components)
- **Layout components**: `src/components/layout/` (Header, Footer)
- **Navigation**: `src/components/navigation/` (BottomNavigation)
- **Sections**: `src/components/sections/` (HeroSection, FeaturesSection, RoleSection)

### Dashboard Page Structure
Each dashboard follows this pattern:
```tsx
// State management for active tabs/views
const [activeTab, setActiveTab] = useState("overview");

// Data arrays for appointments, patients, etc.
const upcomingAppointments = [...];

// Consistent layout with BottomNavigation
return (
  <div className="min-h-screen bg-gradient-background p-4 pb-24">
    {/* Dashboard content */}
    <BottomNavigation />
  </div>
);
```

## Development Guidelines

### Styling Conventions
- Use `glass-card` class for modern medical aesthetics
- Apply `medical-glow` for interactive elements requiring attention
- Utilize medical color variants: `text-success`, `text-warning`, `text-primary`
- Implement consistent spacing with Tailwind's medical theme values

### Component Naming
- Medical-specific components prefixed with "Medical" (e.g., `MedicalCard`, `MedicalButton`)
- Dashboard pages follow `{Role}Dashboard.tsx` pattern
- Sub-dashboard pages in `src/pages/dashboard/{role}/` directories

### Integration Points
- **Lovable platform**: Uses `lovable-tagger` in development mode
- **Route structure**: All custom routes must be added ABOVE the catch-all "*" route in `App.tsx`
- **Bottom navigation**: Consistent across all dashboard views using `BottomNavigation` component

## Mobile-First Design Principles

### Primary Mobile Audience
**Users are primarily mobile users** - design and develop with mobile-first approach, then enhance for larger screens. Prioritize mobile usability, touch interactions, and performance.

### Mobile-First Responsive Strategy
- **Base styles for mobile**: Write CSS/Tailwind classes for mobile first, then add `sm:`, `md:`, `lg:` breakpoints
- **Touch targets**: Minimum 44px (2.75rem) touch targets for all interactive elements
- **Thumb-friendly zones**: Place critical actions in easy-to-reach areas (bottom ⅓ of screen)
- **One-handed use**: Design for single-hand operation with thumb navigation

### Layout Patterns
```tsx
// Mobile-first container with progressive enhancement
<div className="min-h-screen px-4 py-4 sm:px-6 md:px-8 lg:px-12">
  {/* Content scales up from mobile */}
</div>

// Mobile-first grid systems
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Single column on mobile, expands on larger screens */}
</div>

// Mobile-first spacing
<div className="space-y-4 sm:space-y-6 md:space-y-8">
  {/* Tighter spacing on mobile, more generous on desktop */}
</div>
```

### Navigation & Interaction
- **Bottom navigation priority**: Critical navigation in fixed bottom bar for mobile users
- **Hamburger menu**: Use collapsible navigation for desktop, but prioritize mobile navigation patterns
- **Swipe gestures**: Consider implementing swipe navigation between sections where appropriate
- **Pull-to-refresh**: Implement on scrollable content areas for mobile users

### Typography & Readability
- **Mobile font sizes**: Base font size 16px minimum, scale up for larger screens
- **Line height**: 1.5 minimum for mobile readability
- **Touch-friendly text**: Ensure text links and buttons meet 44px minimum touch targets

### Performance Optimization
- **Mobile-first loading**: Optimize for slow mobile connections
- **Image optimization**: Use responsive images with proper sizing
- **Lazy loading**: Implement for content below the fold
- **Bundle splitting**: Load critical mobile content first

### Form Design
- **Mobile input types**: Use appropriate input types (`tel`, `email`, `date`) for mobile keyboards
- **Input sizing**: Ensure form inputs are at least 44px tall
- **Validation**: Real-time validation with mobile-friendly error messages
- **Autocomplete**: Enable autocomplete for better mobile UX

### Dashboard Mobile Patterns
```tsx
// Mobile-first dashboard layout
<div className="min-h-screen bg-gradient-background pb-20">
  {/* Header - compact on mobile */}
  <div className="px-4 py-4 sm:px-6">
    <h1 className="text-xl sm:text-2xl lg:text-3xl">Dashboard</h1>
  </div>
  
  {/* Content - single column on mobile */}
  <div className="px-4 space-y-4 sm:px-6 sm:space-y-6">
    {/* Cards stack vertically on mobile */}
  </div>
  
  {/* Fixed bottom navigation */}
  <BottomNavigation userRole={userRole} />
</div>
```

### Testing & Validation
- **Mobile testing priority**: Test on actual mobile devices first, then desktop
- **Touch testing**: Verify all interactions work with touch
- **Performance testing**: Test on 3G connections to ensure mobile performance
- **Cross-device testing**: iOS Safari, Chrome Mobile, Samsung Internet

### Breakpoint Strategy
- **Mobile first**: Base styles for 320px+ screens
- **Small (sm)**: 640px+ - tablet portrait
- **Medium (md)**: 768px+ - tablet landscape  
- **Large (lg)**: 1024px+ - desktop
- **Extra large (xl)**: 1280px+ - large desktop

### Accessibility (Mobile Focus)
- **WCAG AA compliance**: Ensure 44px minimum touch targets
- **Color contrast**: Maintain contrast ratios for mobile viewing conditions
- **Focus indicators**: Clear focus states for keyboard navigation
- **Screen reader support**: Proper ARIA labels for mobile screen readers