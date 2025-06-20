# 🗄️ PH Aqui Storage Setup Guide

This document explains how to configure robust storage for your vehicle inventory system.

## 📖 Overview

The PH Acquiisitions and Maintenance admin system supports multiple storage backends with automatic fallback:

- **localStorage** (Browser-only, fallback)
- **File Storage** (Development, automatic)
- **External APIs** (Production, configured)

## 🚀 Quick Setup

### 1. Copy Environment Variables
```bash
cp .env.example .env.development
```

### 2. Choose Your Storage Backend

## 🔧 Storage Options

### Option 1: Firebase Firestore (Recommended)

**Pros:** Real-time sync, scalable, Google-backed
**Cons:** Requires Google account, learning curve

```bash
# .env.development
GATSBY_VEHICLES_API_URL=https://firestore.googleapis.com/v1/projects/YOUR_PROJECT_ID/databases/(default)/documents
GATSBY_VEHICLES_API_KEY=your_firebase_api_key
```

**Setup Steps:**
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create new project
3. Enable Firestore Database
4. Get API key from Project Settings
5. Update environment variables

### Option 2: Supabase (Easy Setup)

**Pros:** PostgreSQL-based, generous free tier, easy setup
**Cons:** Relatively new platform

```bash
# .env.development
GATSBY_VEHICLES_API_URL=https://your-project.supabase.co/rest/v1
GATSBY_VEHICLES_API_KEY=your_supabase_anon_key
```

**Setup Steps:**
1. Go to [Supabase](https://supabase.com)
2. Create new project
3. Create vehicles table:
```sql
CREATE TABLE vehicles (
  id TEXT PRIMARY KEY,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  price INTEGER NOT NULL,
  mileage INTEGER NOT NULL,
  transmission TEXT,
  fuel_type TEXT,
  drivetrain TEXT,
  vin TEXT,
  exterior_color TEXT,
  interior_color TEXT,
  condition TEXT,
  features JSONB,
  featured_image TEXT,
  gallery_images JSONB,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  source TEXT DEFAULT 'stored'
);
```
4. Get API URL and anon key from Settings > API
5. Update environment variables

### Option 3: Airtable (No-Code Option)

**Pros:** Visual interface, easy to manage, familiar spreadsheet format
**Cons:** Rate limits, requires Airtable account

```bash
# .env.development
GATSBY_VEHICLES_API_URL=https://api.airtable.com/v0/YOUR_BASE_ID
GATSBY_VEHICLES_API_KEY=your_airtable_api_key
```

**Setup Steps:**
1. Go to [Airtable](https://airtable.com)
2. Create new base with "Vehicles" table
3. Add columns: Make, Model, Year, Price, Mileage, etc.
4. Get Base ID from API documentation
5. Generate API key in Account settings
6. Update environment variables

### Option 4: JSONBin.io (Simple JSON Storage)

**Pros:** Extremely simple, no setup required
**Cons:** Limited features, not suitable for high traffic

```bash
# .env.development
GATSBY_VEHICLES_API_URL=https://api.jsonbin.io/v3/b/YOUR_BIN_ID
GATSBY_VEHICLES_API_KEY=your_jsonbin_api_key
```

**Setup Steps:**
1. Go to [JSONBin.io](https://jsonbin.io)
2. Create account and new bin
3. Initialize with empty array: `[]`
4. Get Bin ID and API key
5. Update environment variables

### Option 5: Custom API

For custom backends, implement these endpoints:

- `GET /vehicles` - Get all vehicles
- `POST /vehicles` - Create/update vehicle
- `DELETE /vehicles/:id` - Delete vehicle
- `DELETE /vehicles/clear` - Clear all vehicles
- `POST /vehicles/import` - Import vehicles

## 🔄 Development vs Production

### Development (Automatic)
- Uses file storage: `public/phaqui-vehicles.json`
- API endpoints created automatically
- No configuration required

### Production
- Requires environment variables
- Falls back to localStorage if not configured
- Recommended: Use external API for persistence

## 🛠️ Configuration

### Environment Variables

```bash
# Required for external storage
GATSBY_VEHICLES_API_URL=your_api_endpoint
GATSBY_VEHICLES_API_KEY=your_api_key

# Optional configuration
GATSBY_STORAGE_SYNC_ENABLED=true
GATSBY_STORAGE_SYNC_INTERVAL=300000
```

### Storage Manager Features

- **Automatic Fallback**: If primary storage fails, uses backup
- **Synchronization**: Keeps multiple storage systems in sync
- **Error Handling**: Graceful degradation when storage is unavailable
- **Status Monitoring**: Real-time storage status in admin panel

## 📊 Storage Adapters

### LocalStorageAdapter
- **Usage**: Browser storage, fallback
- **Persistence**: Browser session only
- **Capacity**: ~5-10MB
- **Sync**: No

### FileAdapter
- **Usage**: Development environment
- **Persistence**: Server file system
- **Capacity**: Unlimited
- **Sync**: Yes

### APIAdapter
- **Usage**: Production with external services
- **Persistence**: External database
- **Capacity**: Service-dependent
- **Sync**: Yes

## 🔒 Security Considerations

### API Keys
- Never commit API keys to version control
- Use environment variables only
- Rotate keys regularly
- Use least-privilege access

### Data Validation
- All vehicle data is validated before storage
- Prevents injection attacks
- Sanitizes user input

### CORS Configuration
Ensure your API allows requests from your domain:
```javascript
// Example CORS headers
Access-Control-Allow-Origin: https://your-domain.com
Access-Control-Allow-Methods: GET, POST, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
```

## 🚨 Troubleshooting

### Storage Not Working
1. Check environment variables are set
2. Verify API endpoints are accessible
3. Check browser console for errors
4. Confirm API keys have correct permissions

### Data Not Syncing
1. Check storage status in admin panel
2. Verify sync is enabled
3. Check network connectivity
4. Review sync interval settings

### Performance Issues
1. Monitor API rate limits
2. Consider caching strategies
3. Optimize data size
4. Use pagination for large datasets

## 📈 Monitoring

The admin panel shows:
- Active storage adapters
- Primary vs fallback status
- Last sync timestamp
- Connection status
- Error indicators

## 🔄 Migration

### From localStorage to External Storage
1. Export vehicles from admin panel
2. Configure new storage backend
3. Import vehicles to new system
4. Verify data integrity

### Between External Services
1. Export from current service
2. Update environment variables
3. Import to new service
4. Test functionality

## 🆘 Support

For storage setup help:
1. Check this documentation first
2. Review browser console errors
3. Verify API service status
4. Test with sample data

## 📚 Additional Resources

- [Firebase Firestore Docs](https://firebase.google.com/docs/firestore)
- [Supabase Documentation](https://supabase.com/docs)
- [Airtable API Guide](https://airtable.com/developers/web/api/introduction)
- [JSONBin Documentation](https://jsonbin.io/docs)

---

**Need help?** The storage system is designed to work out-of-the-box in development and degrade gracefully in production. Start with the default setup and add external storage when you're ready to scale.