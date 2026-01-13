# MBV E-Commerce Platform

Production-ready enterprise e-commerce platform with complete separation between Admin Management and Public E-Commerce.

## Architecture

### Backend (.NET 8)
- Clean Architecture
- Domain-Driven Design (DDD)
- CQRS with MediatR
- Entity Framework Core
- SQL Server
- JWT Authentication

### Frontend (React + TypeScript)
- Modern React 18
- TypeScript
- Tailwind CSS
- React Router
- Context API

## Quick Start

### Backend (.NET 8 Web API)

1. **Configure Database**
```bash
cd MBVProject.WebAPI
# Update connection string in appsettings.json
```

2. **Run Migrations**
```bash
dotnet ef migrations add InitialMigration --project ../MBVProject.Infrastructure
dotnet ef database update --project ../MBVProject.Infrastructure
```

3. **Run Backend**
```bash
dotnet run
```

Backend will run on `https://localhost:7001`

### Frontend (React + Vite)

1. **Install Dependencies**
```bash
npm install
```

2. **Configure Environment**
```bash
cp .env.example .env
# Edit .env and set VITE_API_URL
```

3. **Run Development Server**
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

4. **Build for Production**
```bash
npm run build
```

## Features

### Admin Dashboard (`/admin`)
- Product Management (CRUD)
- Order Management
- Category Management
- Brand Management
- Stock Management
- Campaign & Discount Management
- User Management
- Audit Logs
- Dashboard Metrics

### Public E-Commerce (`/`)
- Product Catalog
- Advanced Search & Filtering
- Shopping Cart
- Wishlist
- Checkout Process
- Order Tracking
- User Profile
- Product Reviews

## Technology Stack

### Backend
- .NET 8
- C# 12
- EF Core 8
- SQL Server
- MediatR
- FluentValidation
- Serilog
- JWT Bearer

### Frontend
- React 18
- TypeScript 5
- Vite 5
- React Router 7
- Axios
- Tailwind CSS 4
- Context API

## Project Structure

```
MBVProject/
├── MBVProject.Domain/          # Domain Layer
│   ├── Entities/
│   ├── ValueObjects/
│   ├── Enums/
│   └── Interfaces/
├── MBVProject.Application/     # Application Layer
│   ├── Admin/                  # Admin Context
│   ├── Public/                 # Public Context
│   └── Common/
├── MBVProject.Infrastructure/  # Infrastructure Layer
│   ├── Persistance/
│   ├── Repositories/
│   └── Services/
├── MBVProject.WebAPI/          # API Layer
│   └── Controllers/
│       ├── Admin/
│       └── Public/
└── Frontend/
    └── src/
        ├── components/
        ├── contexts/
        └── services/
```

## API Documentation

### Admin API (`/api/admin/*`)
Protected by Admin role authorization:
- `GET /api/admin/products` - List products
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/{id}` - Update product
- `DELETE /api/admin/products/{id}` - Delete product

### Public API (`/api/public/*`)
- `GET /api/public/products` - Product catalog
- `POST /api/public/orders` - Create order

### Authentication API (`/api/auth`)
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login
- `POST /api/auth/refresh` - Refresh token

## Environment Variables

### Backend (appsettings.json)
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=.;Database=MBVProject;Trusted_Connection=True;"
  },
  "Jwt": {
    "Key": "your-secret-key-min-32-characters",
    "Issuer": "MBVProject",
    "Audience": "MBVProject",
    "ExpireMinutes": 60
  }
}
```

### Frontend (.env)
```
VITE_API_URL=https://localhost:7001
```

## Authentication

### Admin Access
- Email: `admin@example.com`
- Redirects to: `/admin`

### Customer Access
- Any other email
- Redirects to: `/`

## Database Schema

Key entities:
- Products (with variants, images, attributes)
- Categories (hierarchical)
- Brands
- Orders (with items, payment, shipment)
- Users (with roles, addresses)
- Cart & Wishlist
- Reviews
- Coupons & Campaigns
- Stock Management
- Audit Logs

## Security Features

- JWT Bearer Authentication
- Role-based Authorization
- Soft Delete (never lose data)
- Audit Trail
- CORS Configuration
- Input Validation
- SQL Injection Prevention
- XSS Protection

## Performance Optimizations

- Entity Framework query optimization
- Pagination on all lists
- Caching (InMemory with Redis-ready)
- Lazy loading
- Code splitting
- Bundle optimization

## Development

### Run Backend in Watch Mode
```bash
dotnet watch run --project MBVProject.WebAPI
```

### Run Frontend in Dev Mode
```bash
npm run dev
```

### Build Both
```bash
# Backend
dotnet build MBVProject.WebAPI.sln

# Frontend
npm run build
```

## Testing

### Backend Tests
```bash
dotnet test
```

### Frontend Tests
```bash
npm test
```

## Deployment

### Backend
1. Publish: `dotnet publish -c Release`
2. Deploy to IIS/Azure/Docker
3. Update connection strings
4. Run migrations

### Frontend
1. Build: `npm run build`
2. Deploy `dist/` folder to CDN/Static hosting
3. Configure environment variables

## Documentation

- [Architecture Documentation](./ARCHITECTURE.md)
- [Frontend Documentation](./FRONTEND_README.md)
- [API Documentation](./swagger) - Available at `/swagger` when running

## Contributing

1. Follow Clean Architecture principles
2. Maintain CQRS separation
3. Add validators for all commands
4. Write unit tests
5. Update documentation

## License

Proprietary - MBV Project

## Support

For issues and questions, contact the development team.

---

**Built with ❤️ using Clean Architecture, DDD, and CQRS**
