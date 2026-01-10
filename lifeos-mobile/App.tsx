import './global.css';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import TodayScreen from './src/screens/TodayScreen';
import TimelineScreen from './src/screens/TimelineScreen';
import InsightsScreen from './src/screens/InsightsScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const queryClient = new QueryClient();

// Theme colors 
const COLORS = {
  background: '#0F172A',
  tabBar: '#1E293B',
  active: '#3B82F6',
  inactive: '#64748B',
};

export default function App() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <StatusBar style="light" />
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarStyle: {
                backgroundColor: COLORS.tabBar,
                borderTopColor: 'transparent',
                height: 60,
                paddingBottom: 8,
                paddingTop: 8,
              },
              tabBarActiveTintColor: COLORS.active,
              tabBarInactiveTintColor: COLORS.inactive,
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Today') {
                  iconName = focused ? 'create' : 'create-outline';
                } else if (route.name === 'Timeline') {
                  iconName = focused ? 'list' : 'list-outline';
                } else if (route.name === 'Insights') {
                  iconName = focused ? 'bulb' : 'bulb-outline';
                } else if (route.name === 'Settings') {
                  iconName = focused ? 'settings' : 'settings-outline';
                }

                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
          >
            <Tab.Screen name="Today" component={TodayScreen} />
            <Tab.Screen name="Timeline" component={TimelineScreen} />
            <Tab.Screen name="Insights" component={InsightsScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
