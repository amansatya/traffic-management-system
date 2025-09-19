# 🚦 Smart Traffic Management System

<div align="center">

**A Real-time Traffic Control and Monitoring Dashboard**

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat&logo=TypeScript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-61DAFB.svg?style=flat&logo=React&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF.svg?style=flat&logo=Vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC.svg?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-000000.svg?style=flat&logo=three.js&logoColor=white)](https://threejs.org/)

*Professional traffic management dashboard for real-time intersection monitoring and AI-driven optimization*

</div>

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running the Application](#running-the-application)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Authentication](#-authentication)
- [Contributing](#-contributing)
- [License](#-license)

## 🎯 Overview

The Smart Traffic Management System is a comprehensive web-based dashboard designed for real-time traffic monitoring and control at intersections. Built with modern web technologies, it provides traffic controllers and system administrators with powerful tools to monitor traffic flow, control signals, handle emergencies, and analyze system performance.

This system is specifically designed for urban traffic management with features like live video feeds from traffic cameras, 3D traffic light visualization, emergency response protocols, and detailed analytics reporting.

---

## ✨ Features

### 🚦 **Real-time Traffic Control**
- **Junction Management**: Monitor and control multiple traffic intersections
- **3D Traffic Light Visualization**: Interactive 3D models using Three.js
- **Live Video Feeds**: Real-time camera feeds from all four directions (North, South, East, West)
- **Manual Override**: Emergency controls for traffic signal management

### 📊 **Analytics & Monitoring**
- **Performance Charts**: Real-time traffic flow analytics and performance metrics
- **System Analytics**: Comprehensive dashboard with traffic patterns and statistics
- **Heatmap Visualization**: Traffic density visualization across different junctions
- **Historical Data**: Traffic trends and pattern analysis

### 🚨 **Emergency Response**
- **Emergency Alert System**: Instant alert notifications for traffic incidents
- **Priority Controls**: Emergency vehicle priority signal management
- **Incident Management**: Real-time incident reporting and response coordination

### 👥 **User Management**
- **Role-based Access Control**: Different access levels for administrators, controllers, and operators
- **Secure Authentication**: Multi-user login system with session management
- **User Profiles**: Personalized user settings and preferences
- **Activity Logging**: User action tracking and audit trails

### 🎨 **Modern UI/UX**
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Theme**: Customizable theme preferences
- **Interactive Components**: Modern UI components with shadcn/ui
- **Real-time Updates**: Live data refresh and notifications

---

## 🛠 Tech Stack

### **Frontend**
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe JavaScript
- **Vite** - Next-generation frontend tooling
- **TailwindCSS** - Utility-first CSS framework
- **shadcn/ui** - Modern React component library

### **3D & Visualization**
- **Three.js** - 3D graphics and visualization
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for react-three-fiber
- **Recharts** - Chart and analytics visualization

### **State Management & Routing**
- **React Router DOM** - Client-side routing
- **TanStack Query** - Server state management
- **React Hook Form** - Form state management
- **Zustand** - Lightweight state management

### **Development Tools**
- **ESLint** - Code linting and quality
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes
- **TypeScript ESLint** - TypeScript-specific linting rules

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your system:

- **Node.js** (version 18.0 or higher)
- **npm** (version 8.0 or higher) or **Yarn** (version 1.22 or higher)
- A modern web browser (Chrome, Firefox, Safari, or Edge)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/amansatya/traffic-management-system.git
   cd traffic-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables** (if needed)
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

### Running the Application

1. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

2. **Open your browser**
   Navigate to `http://localhost:8080` (or the port shown in your terminal)

3. **Build for production**
   ```bash
   npm run build
   # or
   yarn build
   ```

---

## 🔧 Usage

### Main Features

1. **Junction Control**
    - Select different traffic junctions from the dropdown
    - Monitor real-time traffic light status
    - View live camera feeds from all directions
    - Access manual override controls for emergencies

2. **System Analytics**
    - Switch to analytics view for performance metrics
    - View traffic flow patterns and statistics
    - Generate reports and export data
    - Monitor system health and performance

3. **Emergency Management**
    - Activate emergency protocols when needed
    - Receive real-time notifications and alerts
    - Coordinate with emergency response teams
    - Override normal traffic patterns for emergency vehicles

---

## 📁 Project Structure

```
traffic-management-system/
├── 📋 .gitignore                 # Git ignore rules
├── 📖 README.md                  # Project documentation
├── 🔒 bun.lockb                  # Bun package lock file
├── ⚙️ components.json            # shadcn/ui component configuration
├── 🔍 eslint.config.js           # ESLint configuration
├── 🌐 index.html                 # Main HTML entry point
├── 📦 package-lock.json          # NPM lock file
├── 📋 package.json               # Project dependencies & scripts
├── 🎨 postcss.config.js          # PostCSS configuration
├── 📁 public/                    # Static assets
│   ├── 🎥 EAST.mp4              # Camera feed - East direction  
│   ├── 🎥 NORTH.mp4             # Camera feed - North direction
│   ├── 🎥 SOUTH.mp4             # Camera feed - South direction
│   ├── 🎥 WEST.mp4              # Camera feed - West direction
│   ├── 🗺️ map.png               # Junction map visualization
│   ├── 🖼️ placeholder.svg        # Placeholder image
│   └── 🤖 robots.txt             # Search engine directives
├── 📁 src/                      # Source code
│   ├── 🎨 App.css               # Global application styles
│   ├── 🎯 App.tsx               # Main application component
│   ├── 📁 components/           # React components
│   │   ├── 🛣️ ApproachLane.tsx      # Traffic approach lane visualization
│   │   ├── 🚫 BlockedPage.tsx       # Access blocked page
│   │   ├── 🚨 EmergencyAlert.tsx    # Emergency alert system
│   │   ├── 🎛️ JunctionControl.tsx   # Junction control panel
│   │   ├── 🔥 JunctionHeatmap.tsx   # Traffic density heatmap
│   │   ├── 🔐 LoginPage.tsx         # User authentication
│   │   ├── 📢 NotificationModal.tsx # System notifications
│   │   ├── 📊 PerformanceChart.tsx  # Performance metrics visualization
│   │   ├── 👤 ProfileDropdown.tsx   # User profile menu
│   │   ├── 👤 ProfileModal.tsx      # User profile management
│   │   ├── ⚙️ SettingsModal.tsx     # System settings
│   │   ├── 📈 SystemAnalytics.tsx   # Analytics dashboard
│   │   ├── 🚦 TrafficLight3D.tsx    # 3D traffic light visualization
│   │   ├── 🎥 VideoPlayer.tsx       # Video feed component
│   │   └── 📁 ui/                   # Reusable shadcn/ui components
│   │       ├── 🎵 accordion.tsx     # Collapsible content
│   │       ├── ⚠️ alert-dialog.tsx  # Modal alerts
│   │       ├── 🚨 alert.tsx         # Alert messages
│   │       ├── 📐 aspect-ratio.tsx  # Aspect ratio container
│   │       ├── 👤 avatar.tsx        # User avatar component
│   │       ├── 🏷️ badge.tsx         # Status badges
│   │       ├── 🍞 breadcrumb.tsx    # Navigation breadcrumb
│   │       ├── 🔘 button.tsx        # Interactive buttons
│   │       ├── 📅 calendar.tsx      # Date picker
│   │       ├── 🃏 card.tsx          # Content cards
│   │       ├── 🎠 carousel.tsx      # Image/content carousel
│   │       ├── 📊 chart.tsx         # Chart components
│   │       ├── ☑️ checkbox.tsx      # Checkbox input
│   │       ├── ⏫ collapsible.tsx   # Expandable content
│   │       ├── ⌨️ command.tsx       # Command palette
│   │       ├── 📝 context-menu.tsx  # Right-click menu
│   │       ├── 💬 dialog.tsx        # Modal dialogs
│   │       ├── 📱 drawer.tsx        # Slide-out panel
│   │       ├── ⬇️ dropdown-menu.tsx # Dropdown menus
│   │       ├── 📄 form.tsx          # Form components
│   │       ├── 🎈 hover-card.tsx    # Hover information
│   │       ├── 🔢 input-otp.tsx     # OTP input field
│   │       ├── ✏️ input.tsx         # Text input field
│   │       ├── 🏷️ label.tsx         # Form labels
│   │       ├── 📋 menubar.tsx       # Menu bar
│   │       ├── 🧭 navigation-menu.tsx # Navigation menu
│   │       ├── 📄 pagination.tsx    # Page navigation
│   │       ├── 💭 popover.tsx       # Popup content
│   │       ├── 📊 progress.tsx      # Progress indicators
│   │       ├── ⚪ radio-group.tsx   # Radio button group
│   │       ├── 🔄 resizable.tsx     # Resizable panels
│   │       ├── 📜 scroll-area.tsx   # Custom scrollbar
│   │       ├── 🔽 select.tsx        # Dropdown select
│   │       ├── ➖ separator.tsx     # Visual separator
│   │       ├── 📋 sheet.tsx         # Side sheet
│   │       ├── 📊 sidebar.tsx       # Navigation sidebar
│   │       ├── ⚪ skeleton.tsx      # Loading placeholders
│   │       ├── 🎚️ slider.tsx        # Range slider
│   │       ├── 🔔 sonner.tsx        # Toast notifications
│   │       ├── 🔄 switch.tsx        # Toggle switch
│   │       ├── 📊 table.tsx         # Data tables
│   │       ├── 📑 tabs.tsx          # Tab navigation
│   │       ├── 📝 textarea.tsx      # Multi-line text input
│   │       ├── 🍞 toast.tsx         # Toast messages
│   │       ├── 🍞 toaster.tsx       # Toast container
│   │       ├── 🔘 toggle-group.tsx  # Toggle button group
│   │       ├── 🔘 toggle.tsx        # Toggle button
│   │       ├── 💡 tooltip.tsx       # Hover tooltips
│   │       └── 🍞 use-toast.ts      # Toast hook
│   ├── 📁 hooks/                # Custom React hooks
│   │   ├── 📱 use-mobile.tsx        # Mobile detection hook
│   │   └── 🍞 use-toast.ts          # Toast notification hook
│   ├── 🎨 index.css             # Global styles with Tailwind
│   ├── 📁 lib/                  # Utility functions
│   │   ├── 🗄️ supabase.ts           # Supabase client configuration
│   │   └── 🔧 utils.ts              # Utility functions
│   ├── 🎯 main.tsx              # Application entry point
│   ├── 📁 pages/                # Main application pages
│   │   ├── 🏠 Index.tsx             # Main dashboard page
│   │   └── 🚫 NotFound.tsx          # 404 error page
│   └── ⚙️ vite-env.d.ts         # Vite environment types
├── 🎨 tailwind.config.ts        # TailwindCSS configuration
├── 📋 tsconfig.app.json         # TypeScript app configuration
├── 📋 tsconfig.json             # TypeScript base configuration
├── 📋 tsconfig.node.json        # TypeScript Node.js configuration
└── ⚡ vite.config.ts            # Vite build tool configuration
```

### 🔧 Key Components

- **`TrafficLight3D.tsx`** - Interactive 3D traffic light models using Three.js
- **`JunctionControl.tsx`** - Main control interface for traffic management
- **`SystemAnalytics.tsx`** - Real-time analytics and performance monitoring
- **`EmergencyAlert.tsx`** - Emergency response and alert management
- **`VideoPlayer.tsx`** - Live video feed display from traffic cameras
- **`LoginPage.tsx`** - User authentication and role management
- **`ApproachLane.tsx`** - Traffic approach lane visualization and vehicle flow monitoring
- **`JunctionHeatmap.tsx`** - Traffic density heatmap showing congestion patterns
- **`PerformanceChart.tsx`** - Performance metrics visualization using Recharts
- **`NotificationModal.tsx`** - System notifications and real-time alerts management
- **`ProfileDropdown.tsx`** - User profile menu with quick access to settings
- **`ProfileModal.tsx`** - Comprehensive user profile management and preferences
- **`SettingsModal.tsx`** - System configuration and administrative settings panel
- **`BlockedPage.tsx`** - Access control page for unauthorized users

---

## 🔐 Authentication

The system implements a secure multi-user authentication system:

### User Roles & Permissions

| Role | Username | Access Level | Capabilities |
|------|----------|--------------|--------------|
| **Administrator** | `admin` | Full Access | System configuration, user management, full control |
| **Traffic Controller** | `controller` | Control Access | Traffic control, emergency response, monitoring |
| **System Operator** | `operator` | Monitor Access | View-only access, basic monitoring, reporting |

### Security Features

- **Session Management**: Secure session handling with automatic timeout
- **Failed Login Protection**: Account lockout after 3 failed attempts (24-hour block)
- **Role-based Authorization**: Different UI elements based on user permissions
- **Local Storage Security**: Encrypted session data storage

### Login Process

1. Enter your assigned username and password
2. System validates credentials and role permissions
3. Redirects to appropriate dashboard based on user role
4. Session remains active until logout or timeout

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and commit: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Guidelines

- Follow the existing code style and conventions
- Add TypeScript types for new features
- Include appropriate comments and documentation
- Test your changes thoroughly before submitting
- Update README.md if you add new features

### Reporting Issues

If you find a bug or have a feature request:

1. Check existing issues first
2. Create a detailed issue with steps to reproduce
3. Include screenshots or videos if applicable
4. Tag the issue appropriately
5. Contributions, issues, and feature requests are welcome!  
   Feel free to [open an issue](https://github.com/amansatya/traffic-management-system/issues) or submit a pull request.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **shadcn/ui** - For the beautiful UI component library
- **Three.js** - For 3D visualization capabilities
- **React Three Fiber** - For React-based 3D rendering
- **TailwindCSS** - For the utility-first CSS framework
- **Vite** - For the fast development build tool
- **Lucide React** - For the comprehensive icon set

---