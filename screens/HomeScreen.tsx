// screens/HomeScreen.tsx
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView,
  Alert,
  RefreshControl,
  Keyboard,
} from 'react-native';
import { format, fromUnixTime } from 'date-fns'; // For date formatting

// You'll need to install date-fns:
// npm install date-fns
// OR
// yarn add date-fns

// --- IMPORTANT: REPLACE WITH YOUR ACTUAL OPENWEATHERMAP API KEY ---
const OPENWEATHER_API_KEY = '83d9e2ff4c4b51abc07342e9f25eedba'; // Your actual API key is here!
// --- IMPORTANT: REPLACE WITH YOUR ACTUAL OPENWEATHERMAP API KEY ---

interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  dt: number; // Time of data calculation, Unix, UTC
}

interface ForecastItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  dt_txt: string;
}

interface ForecastData {
  list: ForecastItem[];
}

export default function HomeScreen(): JSX.Element {
  const [city, setCity] = useState<string>(''); // Changed default city to empty string
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(
    null,
  );
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false); // For pull-to-refresh

  const fetchWeatherData = useCallback(async (searchCity: string) => {
    // Check if API key is missing
    if (!OPENWEATHER_API_KEY) {
      setError(
        'OpenWeatherMap API key is missing. Please provide a valid key.',
      );
      setLoading(false);
      setRefreshing(false);
      return;
    }

    // Do not fetch if searchCity is empty (e.g., on initial render with empty default city)
    if (!searchCity.trim()) {
      setError(null); // Clear any previous city not found error
      setCurrentWeather(null);
      setForecast(null);
      setLoading(false);
      setRefreshing(false);
      return;
    }

    setLoading(true);
    setError(null);
    Keyboard.dismiss(); // Dismiss keyboard when fetching

    try {
      // Fetch current weather
      const currentWeatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${OPENWEATHER_API_KEY}&units=metric`,
      );
      const currentWeatherData: WeatherData & {
        cod?: string | number;
        message?: string;
      } = await currentWeatherResponse.json();

      if (currentWeatherData.cod === '404') {
        // OpenWeatherMap returns cod: '404' for city not found
        setError(`City not found: ${searchCity}`);
        setCurrentWeather(null);
        setForecast(null);
        setLoading(false);
        setRefreshing(false);
        return;
      }
      if (!currentWeatherResponse.ok) {
        throw new Error(
          currentWeatherData.message || 'Failed to fetch current weather',
        );
      }
      setCurrentWeather(currentWeatherData);

      // Fetch 5-day forecast
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&appid=${OPENWEATHER_API_KEY}&units=metric`,
      );
      const forecastData: ForecastData = await forecastResponse.json();

      if (!forecastResponse.ok) {
        throw new Error(
          (forecastData as any).message || 'Failed to fetch forecast',
        );
      }
      setForecast(forecastData);
    } catch (err: any) {
      console.error('Error fetching weather:', err);
      setError(`Failed to fetch weather: ${err.message || 'Network error'}`);
      setCurrentWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []); // Added OPENWEATHER_API_KEY to dependency array for useCallback

  useEffect(() => {
    // Removed 'city' from dependency array. fetchWeatherData will only be called
    // when handleSearch is explicitly triggered.
    // This useEffect will now only run once on component mount.
    // If you want to fetch initial weather for a specific city on mount,
    // you would call fetchWeatherData('DefaultCityName') here.
    // As 'city' is initialized to '', no initial fetch will happen.
  }, []); // Empty dependency array means this useEffect runs once on mount

  const onRefresh = useCallback(() => {
    // Only refresh if there's a city currently set
    if (city.trim()) {
      setRefreshing(true);
      fetchWeatherData(city);
    } else {
      setRefreshing(false); // Stop refreshing if no city to search
    }
  }, [city, fetchWeatherData]);

  const handleSearch = () => {
    // Only fetch if city input is not empty
    if (city.trim()) {
      fetchWeatherData(city);
    } else {
      Alert.alert('Invalid City', 'Please enter a city name to search.');
    }
  };

  const getWeatherIconUrl = (iconCode: string) =>
    `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  // Filter forecast to show one entry per day (around noon)
  const dailyForecast = forecast?.list
    .filter((item, index, self) => {
      const date = format(fromUnixTime(item.dt), 'yyyy-MM-dd');
      const nextItemDate = self[index + 1]
        ? format(fromUnixTime(self[index + 1].dt), 'yyyy-MM-dd')
        : '';
      // Take the first entry for each day, or the one closest to noon
      return date !== nextItemDate || item.dt_txt.includes('12:00:00');
    })
    .slice(0, 5); // Get up to 5 days

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.searchSection}>
        <TextInput
          style={styles.searchInput}
          placeholder="Enter city name"
          value={city}
          onChangeText={setCity}
          onSubmitEditing={handleSearch} // Trigger search on keyboard submit
          returnKeyType="search"
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007bff" />
          <Text style={styles.loadingText}>Fetching weather data...</Text>
        </View>
      )}

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            onPress={() => setError(null)}
            style={styles.clearErrorButton}
          >
            <Text style={styles.clearErrorButtonText}>Clear Error</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Display a message or empty state if no weather data and not loading/error */}
      {!loading && !error && !currentWeather && (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>
            Enter a city to get weather updates!
          </Text>
        </View>
      )}

      {currentWeather && (
        <View style={styles.currentWeatherCard}>
          <Text style={styles.cityName}>
            {currentWeather.name}, {currentWeather.sys.country}
          </Text>
          <Text style={styles.dateText}>
            {format(fromUnixTime(currentWeather.dt), 'EEEE, MMM d, yyyy')}
          </Text>
          <View style={styles.weatherMain}>
            <Image
              style={styles.weatherIcon}
              source={{
                uri: getWeatherIconUrl(currentWeather.weather[0].icon),
              }}
            />
            <Text style={styles.temperature}>
              {Math.round(currentWeather.main.temp)}°C
            </Text>
          </View>
          <Text style={styles.description}>
            {currentWeather.weather[0].description.charAt(0).toUpperCase() +
              currentWeather.weather[0].description.slice(1)}
          </Text>
          <View style={styles.detailsRow}>
            <Text style={styles.detailText}>
              Feels like: {Math.round(currentWeather.main.feels_like)}°C
            </Text>
            <Text style={styles.detailText}>
              Humidity: {currentWeather.main.humidity}%
            </Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.detailText}>
              Wind: {currentWeather.wind.speed} m/s
            </Text>
            <Text style={styles.detailText}>
              Pressure: {currentWeather.main.pressure} hPa
            </Text>
          </View>
        </View>
      )}

      {dailyForecast && dailyForecast.length > 0 && (
        <View style={styles.forecastSection}>
          <Text style={styles.forecastTitle}>5-Day Forecast</Text>
          {dailyForecast.map(item => (
            <View key={item.dt} style={styles.forecastItem}>
              <Text style={styles.forecastDate}>
                {format(fromUnixTime(item.dt), 'EEE, MMM d')}
              </Text>
              <Image
                style={styles.forecastIcon}
                source={{ uri: getWeatherIconUrl(item.weather[0].icon) }}
              />
              <Text style={styles.forecastTemp}>
                {Math.round(item.main.temp)}°C
              </Text>
              <Text style={styles.forecastDescription}>
                {item.weather[0].description}
              </Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
  },
  contentContainer: {
    padding: 20,
    alignItems: 'center',
    paddingBottom: 50, // Add some padding at the bottom for scroll
  },
  searchSection: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  searchInput: {
    flex: 1,
    padding: 15,
    fontSize: 16,
    color: '#333',
  },
  searchButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10, // Apply rounded corners to the button as well
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  errorContainer: {
    backgroundColor: '#ffdddd',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ffaaaa',
  },
  errorText: {
    color: '#cc0000',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  clearErrorButton: {
    backgroundColor: '#cc0000',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  clearErrorButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  currentWeatherCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 8,
  },
  cityName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  dateText: {
    fontSize: 16,
    color: '#777',
    marginBottom: 15,
  },
  weatherMain: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
  temperature: {
    fontSize: 60,
    fontWeight: '200',
    color: '#333',
    marginLeft: 10,
  },
  description: {
    fontSize: 22,
    color: '#555',
    marginBottom: 15,
    textTransform: 'capitalize',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 16,
    color: '#666',
  },
  forecastSection: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 8,
  },
  forecastTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  forecastItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  forecastDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    flex: 2,
  },
  forecastIcon: {
    width: 50,
    height: 50,
    flex: 1,
  },
  forecastTemp: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'right',
  },
  forecastDescription: {
    fontSize: 14,
    color: '#777',
    flex: 2,
    textAlign: 'right',
    textTransform: 'capitalize',
  },
  noDataContainer: {
    padding: 20,
    alignItems: 'center',
    marginTop: 50,
  },
  noDataText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
  },
});
