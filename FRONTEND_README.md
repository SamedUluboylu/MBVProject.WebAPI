# E-Shop Frontend

Modern React + TypeScript frontend for the MBV E-Commerce Platform with complete separation between Admin Dashboard and Public Store.

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Context API** - State management

## Features

### Admin Dashboard (`/admin/*`)
- Product management (list, create, update, delete)
- Order management (coming soon)
- Category management (coming soon)
- Real-time pagination and search
- Protected routes with role-based access
- Clean data tables with actions

### Public E-Commerce (`/`)
- Product catalog with filtering
- Shopping cart with quantity management
- Product search
- Responsive design
- Clean checkout flow (ready for integration)
- User authentication

## Project Structure

```
src/
├── components/
│   ├── admin/              # Admin Dashboard components
│   │   ├── AdminLayout.tsx
│   │   └── ProductList.tsx
│   ├── public/             # Public Store components
│   │   ├── PublicLayout.tsx
│   │   ├── ProductCatalog.tsx
│   │   └── Cart.tsx
│   └── auth/
│       └── Login.tsx
├── contexts/
│   ├── AuthContext.tsx     # Authentication state
│   └── CartContext.tsx     # Shopping cart state
├── services/
│   ├── api.ts              # Base API client
│   ├── adminApi.ts         # Admin API endpoints
│   └── publicApi.ts        # Public API endpoints
├── App.tsx                 # Root component with routing
├── main.tsx               # Entry point
└── index.css              # Global styles
```

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create a `.env` file:
```
VITE_API_URL=https://localhost:7001
```

### 3. Run Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 4. Build for Production
```bash
npm run build
```

## Authentication

The app supports two user types:

### Admin Access
- Email: `admin@example.com` (or any email with 'admin')
- Password: any
- Redirects to: `/admin`

### Customer Access
- Email: any email without 'admin'
- Password: any
- Redirects to: `/`

## Routes

### Public Routes
- `/` - Home / Product Catalog
- `/products` - Product Catalog
- `/cart` - Shopping Cart
- `/login` - Login Page

### Protected Admin Routes
- `/admin` - Admin Dashboard
- `/admin/products` - Product Management
- `/admin/orders` - Order Management (coming soon)
- `/admin/categories` - Category Management (coming soon)

## API Integration

The frontend is configured to connect to the .NET 8 backend API:

### Admin Endpoints
- `GET /api/admin/products` - List products (paginated)
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/{id}` - Update product
- `DELETE /api/admin/products/{id}` - Delete product

### Public Endpoints
- `GET /api/public/products` - Product catalog (paginated)
- `POST /api/public/orders` - Create order

## State Management

### AuthContext
- Manages user authentication state
- Stores JWT token in localStorage
- Provides login/logout functions
- Determines admin vs customer access

### CartContext
- Manages shopping cart items
- Persists cart to localStorage
- Calculates totals
- Add/remove/update quantity

## Styling

Uses Tailwind CSS v4 for utility-first styling:
- Responsive design
- Custom color schemes
- Hover states
- Loading states
- Form validation styles

## Features in Detail

### Product Catalog
- Grid layout with responsive columns
- Search functionality
- Price display with compare prices
- Discount percentage badges
- Stock availability indicators
- Add to cart buttons
- Pagination controls

### Shopping Cart
- Item list with thumbnails
- Quantity adjustment
- Remove items
- Price calculations
- Continue shopping link
- Proceed to checkout

### Admin Product List
- Data table with sorting
- Search filter
- Status badges (Draft, Active, etc.)
- Edit/Delete actions
- Pagination
- Stock quantity display
- Price with margins

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

### Hot Module Replacement
Vite provides instant HMR for fast development.

### Type Safety
Full TypeScript coverage with strict mode enabled.

### Code Organization
- Separated concerns (Admin vs Public)
- Reusable components
- Context for global state
- Service layer for API calls

## Next Steps

1. **Connect to Backend**: Update `VITE_API_URL` to your backend URL
2. **Real Authentication**: Integrate with backend auth endpoints
3. **Complete Order Flow**: Implement full checkout process
4. **Add More Admin Features**: Orders, Categories, Users management
5. **Image Upload**: Add product image upload
6. **Search Enhancement**: Add advanced filters
7. **Payment Integration**: Stripe/PayPal integration
8. **Testing**: Add unit and integration tests

## Security Notes

- JWT tokens stored in localStorage (consider httpOnly cookies for production)
- CORS configured for development
- Protected routes with authentication checks
- Admin-only routes with role verification

## Performance

- Code splitting with React Router
- Lazy loading ready
- Optimized bundle size
- Efficient re-renders with proper memoization

## Troubleshooting

### API Connection Issues
- Ensure backend is running
- Check CORS configuration
- Verify `VITE_API_URL` in `.env`

### Build Issues
- Clear `node_modules` and reinstall
- Check Node.js version (>=18)
- Verify all dependencies are installed

## License

This project is part of the MBV E-Commerce Platform.
