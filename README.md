# 🚗 PH Acquisition and Maintenance - Premium Car Dealership Website

<p align="center">
  <img src="https://img.shields.io/badge/Built%20with-Gatsby-663399?style=for-the-badge&logo=gatsby" alt="Built with Gatsby" />
  <img src="https://img.shields.io/badge/Database-Firebase-FFCA28?style=for-the-badge&logo=firebase" alt="Firebase" />
  <img src="https://img.shields.io/badge/Storage-Firebase%20Storage-FFCA28?style=for-the-badge&logo=firebase" alt="Firebase Storage" />
  <img src="https://img.shields.io/badge/Styled%20with-CSS3-1572B6?style=for-the-badge&logo=css3" alt="CSS3" />
</p>

A modern, responsive car dealership website built for the Jamaican market with dynamic inventory management, image uploads, and real-time updates.

## ✨ Features

### 🏪 **For Customers**
- **Modern Homepage** with dynamic featured cars
- **Interactive Inventory** with search and filtering
- **Detailed Vehicle Pages** with image galleries
- **Contact Forms** and scheduling
- **Mobile-Responsive** design
- **JMD Currency** formatting for Jamaica

### 🛠️ **For Dealership Staff**
- **Admin Dashboard** for easy vehicle management
- **Drag & Drop Image Upload** with Firebase Storage
- **Real-time Inventory Updates** 
- **Multi-image Support** (thumbnails + gallery)
- **Authentication System** with password reset
- **No Technical Skills Required**

### 🔧 **Technical Features**
- **Firebase Integration** for cloud storage
- **Firestore Database** for vehicle data
- **Image Optimization** and compression
- **SEO Optimized** with Gatsby
- **Fast Loading** with static generation
- **Custom Car Placeholders** for vehicles without images

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Firebase project (for production)

### Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ph-aqui-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase (Optional for Development)**
   ```bash
   # Create src/utils/firebase.js with your Firebase config
   # See Firebase Setup section below
   ```

4. **Start development server**
   ```bash
   npm run develop
   ```

5. **Open in browser**
   ```
   http://localhost:8000
   ```

## 🔥 Firebase Setup

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create new project
3. Enable Firestore Database
4. Enable Storage
5. Enable Authentication (Email/Password)

### 2. Get Configuration
Copy your Firebase config from Project Settings → General → Your apps

### 3. Configure Application
Update `src/utils/firebase.js`:
```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.firebasestorage.app",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

## 📁 Project Structure

```
src/
├── components/           # Reusable React components
│   ├── CarCard/         # Vehicle display cards
│   ├── CarPlaceholder.js # Custom car placeholder SVG
│   ├── FeaturedCars.js  # Dynamic featured cars
│   ├── ImageUpload.js   # Single image upload
│   ├── MultiImageUpload.js # Multiple image upload
│   ├── AdminAuth.js     # Authentication wrapper
│   └── Layout.js        # Site layout wrapper
├── pages/               # Gatsby pages
│   ├── index.js         # Homepage
│   ├── inventory.js     # Vehicle listings
│   ├── admin.js         # Admin dashboard
│   ├── contact.js       # Contact page
│   └── vehicle/[id].js  # Dynamic vehicle pages
├── styles/              # CSS stylesheets
├── utils/               # Utility functions
│   ├── firebase.js      # Firebase configuration
│   ├── firestoreAdapter.js # Firestore operations
│   └── storageManager.js    # Storage management
└── hooks/               # Custom React hooks
    └── useVehicles.js   # Vehicle data hook
```

## 🎛️ Admin Dashboard

### Access
Navigate to `/admin` and login with credentials.

### Features
- **Add Vehicles**: Complete form with images
- **Edit Vehicles**: Update existing inventory
- **Delete Vehicles**: Remove sold vehicles
- **Image Management**: Upload thumbnails and gallery images
- **Storage Status**: Monitor Firebase connectivity
- **Real-time Updates**: Changes appear immediately

### Vehicle Fields
- Make, Model, Year, Price (JMD)
- Mileage, Condition, Transmission
- Fuel Type, Drivetrain, Colors
- VIN, Features, Description
- Thumbnail & Gallery Images

## 🖼️ Image Management

### Supported Formats
- JPEG, PNG, WebP
- Automatic compression
- Firebase Storage integration

### Image Types
- **Thumbnail**: Main vehicle image (1 per vehicle)
- **Gallery**: Additional photos (up to 6 per vehicle)
- **Fallback**: Custom car placeholder for vehicles without images

## 💾 Data Storage

### Multi-tier Architecture
1. **Primary**: Firebase Firestore (production)
2. **Fallback**: localStorage (development/offline)
3. **Legacy**: Markdown files (read-only)

### Benefits
- **Reliability**: Multiple storage layers
- **Offline Support**: Works without internet
- **Scalability**: Cloud-based primary storage
- **Migration**: Smooth transition from file-based system

## 🌐 Deployment

### Netlify (Recommended)
1. **Connect Repository**
   ```bash
   # Build command:
   npm run build
   
   # Publish directory:
   public
   ```

2. **Environment Variables**
   Add Firebase config to Netlify environment variables

3. **Deploy**
   Automatic deployment on git push

### Manual Build
```bash
npm run build
# Upload 'public' folder to your hosting provider
```

## 🔧 Available Scripts

```bash
npm run develop     # Start development server
npm run build      # Build for production  
npm run serve      # Preview production build
npm run clean      # Clean Gatsby cache
```

## 🎨 Customization

### Brand Colors
Update CSS variables in `src/styles/global.css`:
```css
:root {
  --primary: #1e293b;    /* Dark slate */
  --secondary: #e11d48;  /* Red */
  --accent: #0ea5e9;     /* Blue */
}
```

### Content Updates
- **Homepage**: Edit `src/pages/index.js`
- **About**: Edit `src/pages/about.js`
- **Contact**: Edit `src/pages/contact.js`
- **Styling**: Update CSS files in `src/styles/`

## 🇯🇲 Jamaica Localization

### Currency
- All prices display in JMD (J$)
- Automatic number formatting with commas
- "Contact for price" fallback

### Market-Specific Features
- Tropical climate considerations (A/C prominence)
- Local buying preferences
- Jamaican English terminology

## 🔒 Security

### Authentication
- Password-protected admin area
- Password reset functionality
- Session management

### Data Protection
- Firebase security rules
- Input validation
- Image upload restrictions

## 🐛 Troubleshooting

### Common Issues

**Firebase Connection Issues**
- Check Firebase configuration
- Verify project permissions
- Check network connectivity

**Images Not Loading**
- Verify Firebase Storage rules
- Check image file formats
- Clear browser cache

**Build Errors**
- Clear Gatsby cache: `npm run clean`
- Check Node.js version (18+)
- Verify all dependencies installed

### Getting Help
1. Check browser console for errors
2. Review Firebase console for data/storage issues
3. Verify all environment variables are set

## 📈 Performance

### Optimization Features
- **Image Compression**: Automatic optimization
- **Static Generation**: Fast loading with Gatsby
- **Code Splitting**: Optimized bundle sizes
- **Caching**: Intelligent cache strategies
- **Mobile-First**: Responsive design

### Monitoring
- Firebase Analytics integration ready
- Performance metrics available
- SEO optimization built-in

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

This project is proprietary software for PH Aqui Car Dealership.

## 🆘 Support

For technical support or questions:
- Check this README for common solutions
- Review component documentation
- Contact development team

---

**🇯🇲 Built for Jamaica's Car Market | PH Aqui Car Dealership**

*Last Updated: June 2025*