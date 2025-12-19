# Shopping Cart

A modern, responsive e-commerce shopping cart application built with React. Browse products, view details, and manage your shopping cart with a beautiful, intuitive interface.

## Features

- **Product Browsing**: Browse a catalog of products with images, prices, and categories
- **Product Details**: View detailed information about individual products
- **Shopping Cart**: Add items to cart, adjust quantities, and remove items
- **Persistent Cart**: Cart data persists across browser sessions using localStorage
- **Responsive Design**: Fully responsive design that works on desktop, tablet, and mobile devices
- **Modern UI**: Clean, modern interface built with Tailwind CSS
- **Fast Performance**: Built with Vite for lightning-fast development and optimized builds

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 18.0.0 or higher)
- **npm** (version 9.0.0 or higher) or **yarn** (version 1.22.0 or higher)

You can check your versions by running:
```bash
node --version
npm --version
```

If you don't have Node.js installed, download it from [nodejs.org](https://nodejs.org/).

## Installation

1. **Clone or download the project**
   ```bash
   cd assignment2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   
   This will install all required packages listed in `package.json`, including:
   - React and React DOM
   - React Router for navigation
   - Tailwind CSS for styling
   - Lucide React for icons
   - Testing libraries (Jest, React Testing Library)
   - Build tools (Vite, Babel)

## Running the Application

### Development Mode

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is occupied).

The development server includes:
- **Hot Module Replacement (HMR)**: Changes are reflected instantly without page refresh
- **Fast Refresh**: React components update while preserving state
- **Error Overlay**: Helpful error messages displayed in the browser

### Production Build

To create an optimized production build:

```bash
npm run build
```

This creates a `dist` folder with optimized, minified files ready for deployment.

To preview the production build locally:

```bash
npm run preview
```

## Running Tests

### Run All Tests

```bash
npm test
```

This runs all test suites once and displays the results.

### Watch Mode

To run tests in watch mode (automatically re-runs tests when files change):

```bash
npm run test:watch
```

### Test Coverage

The test suite includes:
- Empty cart state verification
- Cart total price calculation
- Quantity increase/decrease functionality
- Item removal from cart

Tests are located in `src/pages/Cart.test.jsx` and use:
- **Jest** as the test runner
- **React Testing Library** for component testing
- **jsdom** for DOM simulation

## Project Structure

```
ensign-shopping-cart/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable components
│   │   └── Navbar.jsx     # Navigation bar component
│   ├── context/           # React Context providers
│   │   └── CartContext.jsx # Cart state management
│   ├── pages/             # Page components
│   │   ├── Home.jsx       # Product listing page
│   │   ├── ProductDetail.jsx # Product detail page
│   │   ├── Cart.jsx       # Shopping cart page
│   │   └── Cart.test.jsx  # Cart component tests
│   ├── App.jsx            # Main app component with routing
│   ├── main.jsx          # Application entry point
│   └── index.css          # Global styles and Tailwind imports
├── babel.config.cjs       # Babel configuration for Jest
├── jest.config.cjs        # Jest test configuration
├── jest.setup.js          # Jest setup file
├── package.json           # Project dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
├── vite.config.js         # Vite build configuration
└── README.md              # This file
```

## Application Routes

- `/` - Home page displaying all products
- `/product/:id` - Product detail page for a specific product
- `/cart` - Shopping cart page

## Technologies Used

- **React 19.2.0** - UI library
- **Vite 7.2.4** - Build tool and development server
- **React Router DOM 7.10.1** - Client-side routing
- **Tailwind CSS 3.4.14** - Utility-first CSS framework
- **Lucide React 0.561.0** - Icon library
- **Jest 30.2.0** - Testing framework
- **React Testing Library 16.3.1** - Component testing utilities

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run preview` | Preview production build |
| `npm test` | Run tests once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | Run ESLint to check code quality |

## Configuration Files

- **`vite.config.js`**: Vite build configuration
- **`tailwind.config.js`**: Tailwind CSS customization
- **`jest.config.cjs`**: Jest test runner configuration
- **`babel.config.cjs`**: Babel transpilation settings for tests
- **`jest.setup.js`**: Jest environment setup and utilities

## External Dependencies

The application fetches product data from the **FakeStore API**:
- API Endpoint: `https://fakestoreapi.com/products`
- No authentication required
- Provides realistic product data for demonstration

## Additional Documentation

For detailed information about technical decisions and architecture choices, see [TECHNICAL_DECISIONS.md](./TECHNICAL_DECISIONS.md).

---

**Happy Shopping!**
