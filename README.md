# Queue Management System

A modern, responsive queue management system built with Next.js, TypeScript, and Material-UI. This application provides an intuitive interface for both customers and managers to handle queue operations efficiently.

## 🚀 Features

### Customer View
- Take a new queue number with animated feedback
- Real-time display of currently serving number
- Visual status of all service counters
- Animated counter displays with status indicators
- Responsive design for all screen sizes

### Manager View
- Toggle counter status (online/offline)
- Monitor queue status and waiting numbers
- Serve next customer in queue
- Complete current service
- Real-time queue management

## 🛠️ Technologies Used

- **Frontend Framework:** Next.js 14
- **Language:** TypeScript
- **UI Framework:** Material-UI (MUI)
- **Styling:** Styled Components with MUI
- **State Management:** React useState
- **Animations:** CSS Keyframes & MUI Transitions

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository

2. Install dependencies

3. Run the development server

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 💻 Usage

### Customer Interface
- Click "Take a Number" to get a new queue number
- Monitor your position through the "Now Serving" display
- Check counter status through the visual indicators
  - 🟢 Green: Counter is online and available
  - 🔴 Red: Counter is currently serving
  - ⚫ Grey: Counter is offline

### Manager Interface
- Switch to manager view using the toggle button
- Control counter status using the switches
- Manage queue flow with "Serve Next" and "Complete" buttons
- Monitor waiting queue and current service status

## 🎨 Customization

The application uses Material-UI's theming system and styled-components for styling. You can customize the appearance by:

- Modifying the gradient colors in `StyledTicketButton`
- Adjusting animations in the `pulse` keyframes
- Updating the theme colors and shadows
- Customizing the Paper components' styling

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile devices

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.


