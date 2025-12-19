# Technical Decisions and Assumptions

This document outlines the key technical decisions made during the development of the Ensign Shopping Cart application, along with the reasoning behind each choice.

---

## Build Tool & Development Environment

### **Vite** (v7.2.4)

**Decision:** Chose Vite over Create React App (CRA) or other bundlers.

**Reasoning:**
- **Performance:** Vite uses native ES modules and esbuild for pre-bundling, resulting in significantly faster development server startup and hot module replacement (HMR)
- **Modern Tooling:** Built for modern JavaScript projects with native ESM support
- **Smaller Bundle Size:** Better tree-shaking and optimization compared to Webpack-based solutions
- **Developer Experience:** Instant server start, lightning-fast HMR, and excellent TypeScript support
- **Future-Proof:** Active development and alignment with modern web standards

---

## State Management

### **React Context API** (Built-in)

**Decision:** Implemented custom `CartContext` using React's built-in Context API instead of external state management libraries (Redux).

**Reasoning:**
- **Simplicity:** The cart state is relatively simple and doesn't require complex state management patterns
- **No External Dependencies:** Reduces bundle size and avoids adding unnecessary complexity
- **Sufficient for Scope:** Context API is perfectly adequate for managing cart state across a small-to-medium application
- **Performance:** Combined with `useMemo` for computed values (cartCount, cartTotal), performance is optimal for this use case
- **Learning Curve:** Easier for developers to understand and maintain compared to Redux

**Implementation Details:**
- Used `useState` for cart state management
- Implemented `useMemo` to prevent unnecessary recalculations of cart totals
- Created custom `useCart` hook for cleaner component API

**When to Reconsider:**
- If the application grows significantly and requires complex state management
- If we need time-travel debugging or middleware capabilities
- If state needs to be shared across multiple unrelated features

**Alternatives Considered:**
- **Redux:** Overkill for this project size, adds complexity and bundle size

---

## Routing

### **React Router DOM** (v7.10.1)

**Decision:** Used React Router for client-side routing.

**Reasoning:**
- **Industry Standard:** Most widely adopted routing solution for React applications
- **Feature-Rich:** Provides all necessary routing features (nested routes, route parameters, navigation hooks)
- **Active Development:** Well-maintained with regular updates and community support
- **Simple API:** Easy to implement and understand
- **Browser History:** Supports browser back/forward buttons and URL sharing

**Routes Implemented:**
- `/` - Home page (product listing)
- `/product/:id` - Product detail page
- `/cart` - Shopping cart page

---

## Styling Solution

### **Tailwind CSS** (v3.4.14)

**Decision:** Used Tailwind CSS utility-first CSS framework instead of CSS Modules, styled-components, or plain CSS.

**Reasoning:**
- **Rapid Development:** Utility classes enable fast UI development without writing custom CSS
- **Consistency:** Pre-defined design system ensures consistent spacing, colors, and typography
- **Maintainability:** Styles are co-located with components, making it easier to understand component styling
- **Responsive Design:** Built-in responsive utilities make mobile-first design straightforward
- **Modern Features:** Includes modern CSS features like gradients, shadows, and transitions out of the box

**Configuration:**
- Configured to scan all JSX/TSX files for class names
- Uses PostCSS for processing
- Minimal custom theme extensions (can be extended as needed)

**Alternatives Considered:**
- **CSS Modules:** More verbose, requires separate CSS files

---

## Icon Library

### **Lucide React** (v0.561.0)

**Decision:** Used Lucide React for icon components instead of Font Awesome, Material Icons, or SVG files.

**Reasoning:**
- **Tree-Shakeable:** Only imports icons that are actually used, reducing bundle size
- **React Components:** Icons are React components, making them easy to style and integrate
- **Modern Design:** Clean, modern icon set that fits the application's aesthetic
- **TypeScript Support:** Full TypeScript support with autocomplete
- **Customizable:** Easy to customize size, color, and stroke width via props
- **Lightweight:** Smaller bundle size compared to icon fonts

**Icons Used:**
- `ShoppingBag` - Empty cart state
- `ShoppingCart` - Cart button
- `Plus` / `Minus` - Quantity controls
- `Trash2` - Remove item button

---

## Data Persistence

### **localStorage**

**Decision:** Used browser's localStorage API for cart persistence instead of cookies, sessionStorage, or a backend database.

**Reasoning:**
- **No Backend Required:** Simplifies architecture for a frontend-only assignment
- **Persistence:** Data persists across browser sessions (unlike sessionStorage)
- **Simple API:** Easy to implement with minimal code
- **Performance:** Synchronous API, no network requests
- **User Experience:** Cart persists even if user closes the browser

**Implementation:**
- Cart state automatically saved to localStorage on every change
- Cart state loaded from localStorage on application initialization
- Key: `ensign-cart` (namespaced to avoid conflicts)

**When to Reconsider:**
- If cart needs to sync across devices
- If real-time inventory validation is required
- If cart data needs to be shared with backend for analytics

---

## Testing Framework

### **Jest + React Testing Library** (Jest v30.2.0, RTL v16.3.1)

**Decision:** Used Jest as the test runner with React Testing Library for component testing.

**Reasoning:**
- **Industry Standard:** Most widely used testing setup for React applications
- **React Testing Library Philosophy:** Tests user behavior, not implementation details
- **Good Documentation:** Extensive documentation and community support
- **Integration:** Works seamlessly with React and modern tooling

**Configuration:**
- **Babel:** Configured to transpile JSX and modern JavaScript
- **jsdom:** Simulates browser DOM environment
- **jest-dom:** Adds custom matchers (`.toBeInTheDocument()`, etc.)
- **Module Mappers:** Handles CSS and image imports in tests

**Testing Approach:**
- Tests focus on user interactions and visible outcomes
- Uses `screen` queries that mirror how users interact with the app
- Tests cart functionality with localStorage mocking
- Verifies UI state changes after user actions

---

## Performance Optimizations

### **useMemo for Computed Values**

**Decision:** Used `useMemo` to memoize `cartCount` and `cartTotal` calculations.

**Reasoning:**
- **Prevents Unnecessary Recalculations:** Cart totals only recalculate when cart array changes
- **Performance:** Avoids recalculating totals on every render
- **Best Practice:** React-recommended pattern for expensive computations
- **Minimal Overhead:** `useMemo` overhead is negligible compared to array reduce operations

**Implementation:**
```javascript
const cartCount = useMemo(() => 
  cart.reduce((total, item) => total + item.quantity, 0), [cart]
);

const cartTotal = useMemo(() => 
  cart.reduce((total, item) => total + (item.price * item.quantity), 0), [cart]
);
```

**When to Reconsider:**
- If calculations become more complex, consider moving to a reducer pattern
- If performance issues arise, profile and optimize further

---

## Assumptions

### **Project Scope & Requirements**
1. **Frontend-Only Application:** Assumed no backend integration is required
2. **Single-User Experience:** Cart is per-device, no multi-user scenarios
3. **No Authentication:** No user accounts or login functionality needed
4. **No Payment Processing:** Checkout button is present but doesn't process payments
5. **Product Availability:** Assumed all products are always available (no inventory management)

### **Browser Support**
1. **Modern Browsers:** Assumed support for ES6+ features and modern APIs
2. **localStorage Support:** Assumed all target browsers support localStorage
3. **CSS Grid & Flexbox:** Used modern CSS features without fallbacks

### **Data Assumptions**
1. **Product Data Structure:** Assumed FakeStore API structure remains consistent
2. **Price Format:** Prices are stored as numbers, formatted as currency in display
3. **Image URLs:** All product images are valid and accessible

### **User Experience**
1. **Cart Persistence:** Users expect cart to persist across sessions
2. **Quantity Limits:** Minimum quantity of 1 (no zero or negative quantities)
3. **No Cart Expiration:** Cart items don't expire or become invalid

### **Development Assumptions**
1. **Development Environment:** Assumed Node.js and npm are available
2. **Build Process:** Production build uses Vite's optimized build
3. **Code Quality:** ESLint configured for code quality (basic setup)

---

## Future Considerations

If this application were to scale or be productionized, consider:

1. **State Management:** Migrate to Zustand or Redux Toolkit if state becomes more complex
2. **Backend Integration:** Add real backend API for cart persistence and product management
3. **Authentication:** Implement user accounts for cross-device cart sync
4. **Error Handling:** Add comprehensive error boundaries and user-friendly error messages
5. **Loading States:** Implement skeleton loaders and better loading indicators
6. **Accessibility:** Add ARIA labels, keyboard navigation improvements
7. **Performance:** Implement code splitting, lazy loading, and image optimization
8. **Analytics:** Add user behavior tracking and cart abandonment analytics
9. **Testing:** Expand test coverage, add E2E tests, and integration tests
10. **TypeScript:** Consider migrating to TypeScript for better type safety

---

## Summary

This application prioritizes:
- **Simplicity:** Minimal dependencies, straightforward architecture
- **Developer Experience:** Fast development with modern tooling
- **User Experience:** Fast, responsive, and intuitive interface
- **Maintainability:** Clean code structure, easy to understand and extend

The technical stack chosen balances functionality, performance, and development speed while keeping the codebase maintainable and scalable for future enhancements.
