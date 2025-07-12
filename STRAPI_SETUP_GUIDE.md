# GaadiMech Strapi Backend Setup Guide

## 🚀 Getting Started

### 1. Install Dependencies

```bash
cd Strapi-PWA
npm install
```

### 2. Environment Configuration

Create a `.env` file in the Strapi-PWA directory:

```env
# Server Configuration
HOST=0.0.0.0
PORT=1337

# Database Configuration (SQLite for development)
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db

# Security
APP_KEYS=your-app-key-1,your-app-key-2,your-app-key-3,your-app-key-4
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
TRANSFER_TOKEN_SALT=your-transfer-token-salt
JWT_SECRET=your-jwt-secret

# CORS Settings
FRONTEND_URL=http://localhost:5173

# SMS Configuration (optional - for OTP)
SMS_PROVIDER=twilio  # or msg91
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
TWILIO_PHONE_NUMBER=your-twilio-number
```

### 3. Start the Development Server

```bash
npm run develop
```

Visit `http://localhost:1337/admin` to access the admin panel.

## 🔐 Admin Panel Setup

### 1. Create Admin User

On first run, create an admin user:
- Email: admin@gaadimech.com
- Password: Create a strong password
- First Name: Admin
- Last Name: GaadiMech

### 2. Content Type Permissions

#### A. Public Access (No Authentication Required)

Navigate to **Settings → Roles & Permissions → Public**

**Auth Routes:**
- ✅ `POST /api/auth/send-otp`
- ✅ `POST /api/auth/verify-otp`

**Service Types:**
- ✅ `GET /api/service-types` (find, findOne)
- ✅ `GET /api/service-categories` (find, findOne)
- ✅ `GET /api/doorstep-services` (find, findOne)

**Cities:**
- ✅ `GET /api/cities` (find, findOne)

**Coupons:**
- ✅ `POST /api/coupons/validate`

#### B. Authenticated Users

Navigate to **Settings → Roles & Permissions → Authenticated**

**Users:**
- ✅ `GET /api/users/me`
- ✅ `PUT /api/users/:id` (own profile only)

**Cars:**
- ✅ `GET /api/cars` (own cars only)
- ✅ `POST /api/cars` (create)
- ✅ `PUT /api/cars/:id` (own cars only)
- ✅ `DELETE /api/cars/:id` (own cars only)

**Addresses:**
- ✅ `GET /api/addresses` (own addresses only)
- ✅ `POST /api/addresses` (create)
- ✅ `PUT /api/addresses/:id` (own addresses only)
- ✅ `DELETE /api/addresses/:id` (own addresses only)

**Orders:**
- ✅ `GET /api/orders` (own orders only)
- ✅ `POST /api/orders` (create)
- ✅ `PUT /api/orders/:id` (own orders only)

**Express Services:**
- ✅ `GET /api/express-services` (own services only)
- ✅ `POST /api/express-services` (create)
- ✅ `PUT /api/express-services/:id` (own services only)

**Express Leads:**
- ✅ `GET /api/express-leads` (own leads only)
- ✅ `POST /api/express-leads` (create)
- ✅ `PUT /api/express-leads/:id` (own leads only)

**Reviews:**
- ✅ `GET /api/reviews` (find, findOne)
- ✅ `POST /api/reviews` (create)

**Contacts & Enquiries:**
- ✅ `POST /api/contacts` (create)
- ✅ `POST /api/enquiries` (create)

**Carts:**
- ✅ `GET /api/carts` (own carts only)
- ✅ `POST /api/carts` (create)
- ✅ `PUT /api/carts/:id` (own carts only)
- ✅ `DELETE /api/carts/:id` (own carts only)

**Notifications:**
- ✅ `GET /api/notifications` (own notifications only)
- ✅ `PUT /api/notifications/:id` (mark as read)

**Analytics Events:**
- ✅ `POST /api/analytics-events` (create)

**User Activities:**
- ✅ `POST /api/user-activities` (create)
- ✅ `GET /api/user-activities` (own activities only)

### 3. Advanced Permissions (Policy Configuration)

For user-specific data filtering, you may need to create custom policies:

Create `config/policies/isOwner.js`:

```javascript
module.exports = async (policyContext, config, { strapi }) => {
  const { state } = policyContext;
  const { params } = policyContext.request;

  if (!state.user) {
    return false;
  }

  // For routes like /api/cars/:id, check if the car belongs to the user
  if (params.id) {
    const entity = await strapi.entityService.findOne(
      config.contentType,
      params.id,
      { populate: ['user'] }
    );

    if (!entity || entity.user?.id !== state.user.id) {
      return false;
    }
  }

  return true;
};
```

## 🔄 Frontend Integration

### 1. Update Frontend Environment

Create/update `.env` in your React app:

```env
VITE_API_URL=http://localhost:1337
```

### 2. Test API Connection

Start both servers:

```bash
# Terminal 1 - Strapi Backend
cd Strapi-PWA
npm run develop

# Terminal 2 - React Frontend  
cd GaadiMech-pwa
npm run dev
```

### 3. Test Authentication Flow

1. Go to `http://localhost:5173/auth/login`
2. Enter a mobile number
3. Check Strapi logs for OTP (development mode)
4. Enter any 4-digit OTP to complete authentication
5. Verify user creation in Strapi admin panel

## 📊 Data Verification

### Check User Creation
1. Go to Strapi Admin → Content Manager → User (from users-permissions)
2. Verify new users are created with proper data

### Check Lead Tracking
1. Go to Content Manager → Express Lead
2. Verify leads are created when users interact

### Check Analytics
1. Go to Content Manager → Analytics Event
2. Verify events are tracked properly

## 🔧 Troubleshooting

### Common Issues

**1. CORS Errors**
- Ensure `FRONTEND_URL` is set correctly in `.env`
- Check `config/middlewares.ts` for CORS configuration

**2. Authentication Errors**
- Verify JWT secret is set in `.env`
- Check user permissions in admin panel

**3. Database Issues**
- Delete `.tmp/data.db` to reset database
- Run `npm run develop` to recreate

**4. Missing Content Types**
- Content types should auto-create on first run
- If missing, check `src/api/` directory structure

### Debug Mode

Enable debug logging in `config/logger.ts`:

```javascript
module.exports = {
  transports: [
    new winston.transports.Console({
      level: 'debug',
    }),
  ],
};
```

## 📈 Production Deployment

### Environment Variables for Production

```env
NODE_ENV=production
DATABASE_URL=your-postgres-url  # Replace SQLite with PostgreSQL
CLOUDINARY_NAME=your-cloudinary-name  # For file uploads
CLOUDINARY_KEY=your-cloudinary-key
CLOUDINARY_SECRET=your-cloudinary-secret
```

### Build for Production

```bash
npm run build
npm start
```

## 🧪 Testing API Endpoints

Use tools like Postman or curl to test endpoints:

### Test OTP Flow

```bash
# Send OTP
curl -X POST http://localhost:1337/api/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{"mobileNumber": "9876543210"}'

# Verify OTP (use sessionId from response above)
curl -X POST http://localhost:1337/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"sessionId": "session-id", "otpCode": "1234"}'
```

### Test Authenticated Endpoints

```bash
# Get current user (use JWT from verify-otp response)
curl -X GET http://localhost:1337/api/users/me \
  -H "Authorization: Bearer your-jwt-token"
```

## 🔐 Security Best Practices

1. **Change Default Secrets**: Generate new APP_KEYS and JWT_SECRET
2. **Enable Rate Limiting**: Configure in `config/middlewares.ts`
3. **Validate Input**: Ensure all inputs are validated
4. **Secure Headers**: Enable security headers
5. **Database Security**: Use environment variables for credentials
6. **HTTPS**: Always use HTTPS in production

## 📝 Next Steps

1. Set up SMS provider for real OTP sending
2. Configure file upload with Cloudinary
3. Set up email notifications
4. Implement push notifications
5. Add payment gateway integration
6. Set up monitoring and logging

---

For support or questions about this setup, refer to the Strapi documentation or create an issue in the project repository. 