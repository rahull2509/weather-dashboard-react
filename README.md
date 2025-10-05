# 🌤️ Weather Dashboard

A beautiful, feature-rich weather dashboard built with React that provides real-time weather information with intelligent day/night detection and dynamic animations.

![Weather Dashboard](https://img.shields.io/badge/React-18.x-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Features

- **Real-time Weather Data** - Current weather conditions from OpenWeatherMap API
- **5-Day Forecast** - Detailed weather predictions with 3-hour intervals
- **Day/Night Detection** - Intelligent sunrise/sunset based icon switching
- **Geolocation Support** - Get weather for your current location
- **Dynamic Backgrounds** - Background changes based on weather conditions and time of day
- **Animated Weather Icons** - Beautiful animations for different weather conditions
- **Comprehensive Weather Details** - Temperature, humidity, wind speed, pressure, and visibility
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices

## 🌟 Weather Conditions Supported

- ☀️ **Clear Sky** - Sun icon during day, Moon icon at night
- ☁️ **Clouds** - Cloud icon with dynamic styling
- 🌧️ **Rain** - Animated rain cloud
- 🌦️ **Drizzle** - Light rain animation
- ⛈️ **Thunderstorm** - Lightning bolt with flash effect
- ❄️ **Snow** - Snowflake with falling animation
- 🌫️ **Fog/Mist/Haze** - Fog cloud with drift effect

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenWeatherMap API key

### Installation

1. Clone the repository
```bash
git clone https://github.com/rahull2509/weather-dashboard-react.git
cd weather-dashboard
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory and add your OpenWeatherMap API key
```env
REACT_APP_WEATHER_API_KEY=your_api_key_here
```

4. Start the development server
```bash
npm start
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🛠️ Built With

- **React** - Frontend framework
- **Lucide React** - Beautiful icon library
- **OpenWeatherMap API** - Weather data provider
- **CSS3** - Styling with animations
- **Geolocation API** - Location services

## 📁 Project Structure

```
weather-dashboard/
├── public/
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx          # Search and location input
│   │   ├── CurrentWeather.jsx     # Main weather display
│   │   ├── WeatherIcon.jsx        # Dynamic weather icons
│   │   ├── WeatherCard.jsx        # Forecast card component
│   │   └── Forecast.jsx           # 5-day forecast grid
│   ├── services/
│   │   └── weatherApi.js          # API integration
│   ├── utils/
│   │   └── weatherUtils.js        # Helper functions
│   ├── App.js                     # Main application
│   ├── App.css                    # Styles and animations
│   └── index.js                   # Entry point
├── .env                           # Environment variables
├── package.json
└── README.md
```

## 🎨 Key Components

### WeatherIcon Component
Dynamically renders weather icons based on:
- Current weather condition
- Time of day (sunrise/sunset)
- Includes animations for each weather type

### CurrentWeather Component
Displays:
- Location name and country
- Current temperature and "feels like" temperature
- Weather description
- Day/night indicator
- Humidity, wind speed, pressure, visibility
- Sunrise and sunset times

### Forecast Component
Shows 8 forecast cards (24 hours) with:
- Date and time
- Weather icon (day/night aware)
- Min/max temperature
- Weather description
- Humidity and wind speed
- Day/night badge

## 🎭 Animations

- **Sun** - Gentle rotation animation
- **Moon** - Glowing effect
- **Rain** - Falling droplets
- **Thunder** - Flashing lightning
- **Drizzle** - Light movement
- **Snow** - Falling and rotating
- **Fog** - Drifting effect

## 🌈 Dynamic Backgrounds

Backgrounds change based on weather and time:
- **Clear Day** - Purple gradient
- **Clear Night** - Dark blue gradient
- **Rainy** - Blue-grey gradient
- **Thunderstorm** - Dark storm gradient
- **Snowy** - Light grey gradient
- **Cloudy** - Different shades for day/night
- **Foggy** - Grey gradient

## 🔧 Configuration

### API Setup

Get your free API key from [OpenWeatherMap](https://openweathermap.org/api)

Add to `.env`:
```env
REACT_APP_WEATHER_API_KEY=your_api_key_here
```

### Customization

You can customize:
- Colors in `App.css`
- Weather backgrounds in `weatherUtils.js`
- Animation speeds in CSS
- Number of forecast cards in `Forecast.jsx`

## 📱 Responsive Design

The dashboard is fully responsive with breakpoints for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for weather data
- [Lucide](https://lucide.dev/) for beautiful icons
- [React](https://reactjs.org/) for the amazing framework

## 📧 Contact

Your Name - [Rahul Gangwar](www.linkedin.com/in/rahullgangwar)

Project Link: [https://github.com/yourusername/weather-dashboard](https://github.com/rahull2509/weather-dashboard-react)

---

Made with ❤️ and React
