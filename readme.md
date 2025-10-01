# Amarachi Nwachukwu Portfolio Website

## Overview

This is a modern, interactive portfolio website for Amarachi Nwachukwu, a Frontend Developer and Data Enthusiast. The site features a mobile-first design with smooth animations, custom cursor effects, and glassmorphism UI elements. Built using vanilla HTML, Tailwind CSS, and JavaScript, the portfolio showcases professional experience, skills, projects, education, and provides contact functionality.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- Pure HTML5 for semantic markup
- Tailwind CSS (CDN) for utility-first styling with custom wine color palette
- Vanilla JavaScript for all interactions and animations
- Google Fonts (Inter) for typography

**Design Pattern:**
- Single-page application (SPA) architecture with smooth scroll navigation
- Mobile-first responsive design approach
- Section-based layout with seven main content areas (Hero, About, Skills, Projects, Experience, Education, Contact)

**Animation System:**
- Custom JavaScript animation loop using `requestAnimationFrame` for mouse follower effect
- Scroll-triggered reveal animations for content sections
- CSS-based gradient animations for background
- Hover-based micro-interactions on cards and buttons

**Rationale:** Vanilla stack chosen for lightweight performance, easy deployment, and no build process complexity. This allows for quick iterations and maximum compatibility across browsers without dependency management overhead.

### UI Component Architecture

**Glassmorphism Navigation:**
- Sticky header with backdrop blur effects
- Scrollspy functionality to highlight active sections
- Mobile hamburger menu with toggle functionality
- Smooth scroll anchors for internal navigation

**Interactive Elements:**
- Custom mouse follower with smooth easing animation (desktop only)
- Animated gradient background using CSS keyframes
- Scroll-reveal animations for sections using Intersection Observer pattern
- 3D tilt effects on project cards
- Timeline component with responsive layout transformation

**Custom Color System:**
- Extended Tailwind configuration with custom wine color palette (50-900 shades)
- Deep wine/burgundy (#aa1e42 - #771a36) as primary accent
- Dark background theme with gradient overlays

**Rationale:** Glassmorphism and modern UI trends provide a professional, contemporary aesthetic. Custom color palette ensures brand consistency and visual uniqueness.

### Content Structure

**Section Organization:**
1. **Hero Section** - Primary call-to-action with animated background and prominent name/title display
2. **About Section** - Personal introduction with avatar and micro-interactions
3. **Skills Section** - Technology grid showcasing HTML, CSS, JavaScript, React, Tailwind, Laravel, Supabase, MySQL, GitHub, Cloudinary, Chart.js, FullCalendar.js
4. **Projects Section** - Portfolio showcase featuring Edu Schola, Gluto International App, Trans-Sib Shipping, Embex Shipping, Yota Shipping, and Custom Dashboards
5. **Experience Timeline** - Professional history including SmakkTechnologies (2022-Present), Gluto International (2025), and Freelance Work (2024-2025)
6. **Education & Certifications** - Academic credentials (NIIT HND Software Engineering, ALX Data Science) and certifications (ALX Foundations, ALX Data Analytics, FreeCodeCamp)
7. **Contact Section** - Contact form and social links (GitHub, Email, Location)

**Rationale:** Logical flow from introduction to skills demonstration to work examples, then credentials, ending with contact - guides visitors through a narrative of professional capabilities.

### Responsive Design Strategy

**Breakpoint Approach:**
- Mobile-first base styles (< 640px)
- Progressive enhancement for tablet (sm:, md:) and desktop (lg:, xl:, 2xl:) screens
- Hamburger menu for mobile, horizontal navigation for desktop
- Grid layouts that collapse to single columns on mobile
- Timeline transforms from vertical to stacked list on small screens

**Rationale:** Mobile-first ensures optimal performance on constrained devices and provides a solid foundation that scales up gracefully.

### Animation Performance

**Optimization Techniques:**
- `requestAnimationFrame` for smooth 60fps mouse follower animation
- Easing function (0.1 multiplier) for natural movement
- CSS transforms for hardware-accelerated animations
- Lazy animation triggering based on scroll position
- Minimal DOM manipulation to reduce reflow/repaint

**Rationale:** Performance-conscious animation approach ensures smooth experience across devices while maintaining visual appeal.

## External Dependencies

### CDN-Based Libraries

**Tailwind CSS:**
- Source: `https://cdn.tailwindcss.com`
- Purpose: Utility-first CSS framework for rapid UI development
- Configuration: Custom wine color palette extended into Tailwind theme
- Rationale: No build step required, rapid prototyping, excellent mobile utilities

**Google Fonts:**
- Source: `https://fonts.googleapis.com/css2?family=Inter`
- Purpose: Professional typography with Inter font family (weights 300-900)
- Rationale: Clean, modern sans-serif optimized for digital interfaces

### No Backend Requirements

**Static Architecture:**
- Pure client-side rendering
- No server-side processing
- No database integration
- Contact form would require future integration with email service (e.g., FormSpree, EmailJS, or serverless function)

**Rationale:** Static site approach maximizes performance, reduces hosting costs, enables deployment to any static host (GitHub Pages, Netlify, Vercel, Replit), and eliminates server maintenance.

### Potential Future Integrations

**Form Handling:**
- EmailJS or FormSpree for contact form submissions
- Alternative: Serverless function (Netlify Functions, Vercel Edge Functions)

**Analytics:**
- Google Analytics or privacy-focused alternative (Plausible, Fathom)

**CMS Integration:**
- Headless CMS (Contentful, Sanity) for project/content management if dynamic updates needed

**Rationale:** Current static approach meets requirements, but modular architecture allows easy integration of services when needed without major refactoring.