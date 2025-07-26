# CRAS Paulista Mobile App

A React Native mobile application for the CRAS (Centro de Referência de Assistência Social) Paulista, built with Expo and TypeScript. This app provides a digital platform for social assistance services, appointment scheduling, and service management.

## 👨‍💻 Creators
```
Arthur Rodrigues
Maria Morais
Athos Lima
Matheus Santos
Rafael Luna
```

## 🎯 Project Overview

The CRAS Paulista mobile app is designed to streamline social assistance services by providing users with easy access to:
- Service scheduling and management
- Location-based CRAS center discovery
- Appointment tracking and status updates
- User profile management
- Real-time notifications

## ✨ Features

### 🔐 Authentication
- Secure login system with JWT tokens
- Token-based authentication with refresh capabilities
- User session management

### 📍 Location Services
- Interactive maps for location selection
- Automatic CRAS center discovery based on proximity
- Address validation and geocoding

### 📅 Appointment Management
- Schedule appointments with social services
- View appointment history and status
- Real-time status updates (pending, confirmed, completed, cancelled)
- Service categorization and filtering

### 🏢 Service Directory
- Browse available social services
- Service descriptions and requirements
- Category-based service organization

### 👤 User Profile
- Personal information management
- Profile picture upload and management
- Contact information updates

### 🔔 Notifications
- Real-time appointment updates
- Service availability notifications
- System announcements

## 🛠 Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: Expo Router
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **State Management**: React Hooks
- **Storage**: AsyncStorage
- **Maps**: React Native Maps
- **Icons**: Expo Vector Icons
- **Image Handling**: Expo Image Picker

## 📱 Supported Platforms

- iOS (iPhone and iPad)
- Android
- Web (limited functionality)

## 🚀 Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mobile
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install Expo CLI globally** (if not already installed)
   ```bash
   npm install -g @expo/cli
   ```

4. **Start the development server**
   ```bash
   npm start
   # or
   expo start
   ```

5. **Run on specific platform**
   ```bash
   # iOS
   npm run ios
   
   # Android
   npm run android
   
   # Web
   npm run web
   ```

## 🔧 Configuration

### Environment Setup

The app connects to the CRAS Digital API. Ensure you have the correct API endpoints configured:

- **Base URL**: `https://cras-digital.fly.dev/api/v1/`
- **Authentication**: JWT token-based
- **Endpoints**:
  - `/authentication/token/` - Login
  - `/services/` - Get services
  - `/appointments/` - Appointment management
  - `/cras-locations` - CRAS center locations

### Tailwind Configuration

The app uses NativeWind for styling. Custom colors are defined in `tailwind.config.js`:

```javascript
colors: {
  primary: '#154e85',  // Main brand color
  fundo: '#F3F5FD',    // Background color
}
```

## 📖 Usage

### Getting Started

1. **Launch the app** - The app will show the CRAS Paulista splash screen
2. **Login** - Enter your username and password
3. **Welcome screen** - View available services and quick actions
4. **Navigate** - Use the bottom tabs to access different features

### Main Features

#### Scheduling Appointments
1. Navigate to the Actions tab
2. Select a service category
3. Choose your location
4. Confirm appointment details
5. Receive confirmation

#### Viewing Appointments
1. Go to the Scheduling tab
2. Switch between "Em Aberto" (Open) and "Histórico" (History)
3. View appointment status and details

#### Location Services
1. Access location selection from appointment flow
2. Use maps to select your address
3. App will automatically find the nearest CRAS center

## 🏗 Project Structure

```
mobile/
├── app/                    # Main application screens
│   ├── (bottomtabs)/      # Bottom tab navigation screens
│   ├── (drawer)/          # Drawer navigation screens
│   ├── (profile)/         # Profile-related screens
│   ├── _layout.tsx        # Root layout
│   ├── index.tsx          # Entry point
│   ├── login.tsx          # Authentication screen
│   └── welcome.tsx        # Welcome screen
├── assets/                # Static assets (images, icons)
├── components/            # Reusable components
├── scripts/               # Build and utility scripts
├── app.json              # Expo configuration
├── package.json          # Dependencies and scripts
└── tailwind.config.js    # Styling configuration
```

## 🔍 Key Components

### Authentication Flow
- `app/login.tsx` - User authentication
- JWT token management with AsyncStorage
- Automatic token refresh

### Navigation Structure
- **Bottom Tabs**: Actions, Scheduling, Notifications
- **Drawer**: Dashboard, Profile, Settings
- **Stack Navigation**: Modal screens and flows

### State Management
- React Hooks for local state
- AsyncStorage for persistent data
- API integration for remote data

## 🐛 Troubleshooting

### Common Issues

1. **Metro bundler issues**
   ```bash
   npm start --reset-cache
   ```

2. **iOS build problems**
   ```bash
   cd ios && pod install && cd ..
   ```

3. **Android build issues**
   ```bash
   npx expo run:android --clear
   ```

4. **TypeScript errors**
   ```bash
   npm run lint
   ```

### Development Tips

- Use Expo DevTools for debugging
- Enable hot reload for faster development
- Use React Native Debugger for advanced debugging
- Check Expo documentation for platform-specific issues

## 🤝 Contributing

We welcome contributions to improve the CRAS Paulista mobile app!

### Contribution Guidelines

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Test thoroughly**
   - Test on both iOS and Android
   - Ensure TypeScript compilation passes
   - Run linting checks
5. **Commit your changes**
   ```bash
   git commit -m "feat: add new feature description"
   ```
6. **Push to your branch**
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Create a Pull Request**

### Code Style

- Follow TypeScript best practices
- Use functional components with hooks
- Implement proper error handling
- Add appropriate comments for complex logic
- Follow the existing naming conventions

### Testing

- Test on multiple devices and screen sizes
- Verify API integration works correctly
- Test offline functionality where applicable
- Ensure accessibility features work properly

## 📄 License

This project is proprietary software developed for CRAS Paulista. All rights reserved.

## 📞 Support

For technical support or questions about the CRAS Paulista mobile app:

- **Email**: [support-email]
- **Documentation**: [documentation-url]
- **Issues**: Use GitHub Issues for bug reports

## 🔄 Version History

- **v1.0.0** - Initial release with core functionality
  - Authentication system
  - Appointment scheduling
  - Service directory
  - Location services

---

**Built with ❤️ for CRAS Paulista**
