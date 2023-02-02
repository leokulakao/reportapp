import React, { ReactNode, useEffect, useState } from 'react';
import {
  GestureResponderEvent,
  TouchableOpacity,
  StyleSheet,
  View,
  Appearance,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { StatusBar, StatusBarStyle } from 'expo-status-bar';
import { ThemeProvider } from '@shopify/restyle';

import HomeStack from '../screens/home/HomeStack';
import SettingsStack from '../screens/settings/SettingsStack';
import { useTheme } from '@shopify/restyle';
import Theme, { ThemeNames, themes } from '../theme';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { selectThemeState } from '../store/app/appSelectors';
import { useSelector } from 'react-redux';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

export type RootStackParamList = {
  Navigation: NavigatorScreenParams<NavigationTabParamList>;
};

export type NavigationTabParamList = {
  Home: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<NavigationTabParamList>();

const Navigation = () => {
  const appTheme: ThemeNames = useSelector(selectThemeState());
  const appearanceTheme = Appearance.getColorScheme();

  const [selectedTheme, setSelectedTheme] = useState<Theme>();

  useEffect(() => {
    appTheme === 'auto'
      ? setSelectedTheme(
          appearanceTheme === 'dark' ? themes.dark.theme : themes.light.theme
        )
      : appTheme === 'dark'
      ? setSelectedTheme(themes.dark.theme)
      : setSelectedTheme(themes.light.theme);
  }, [appTheme, appearanceTheme]);

  return (
    <ActionSheetProvider>
      <ThemeProvider theme={selectedTheme}>
        <BottomSheetModalProvider>
          <SafeAreaProvider>
            <NavigationContainer>
              <Stack.Navigator initialRouteName={'Navigation'}>
                <Stack.Screen
                  name="Navigation"
                  component={Tabs}
                  options={{ headerShown: false }}
                />
              </Stack.Navigator>
            </NavigationContainer>

            <StatusBar
              style={selectedTheme?.colors.statusBar as StatusBarStyle}
            />
          </SafeAreaProvider>
        </BottomSheetModalProvider>
      </ThemeProvider>
    </ActionSheetProvider>
  );
};

const Tabs = () => {
  const theme = useTheme<Theme>();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarButton: (props) => (
          <CustomTabBarButton
            onPress={props.onPress}
            children={props.children}
          />
        ),
        tabBarIcon: ({ focused }) => {
          let iconName: 'home' | 'cog' = 'home';
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Settings') {
            iconName = 'cog';
          }
          return <TabBarButtonIcon focused={focused} iconName={iconName} />;
        },
        lazy: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme.colors.tabBarColor,
          position: 'absolute',
          borderTopWidth: 0,
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          borderRadius: 10,
          height: 58,
          paddingVertical: 8,
          paddingHorizontal: 8,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStack}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

type CustomTabBarButtonProps = {
  children?: ReactNode;
  onPress?: (e: GestureResponderEvent) => void;
};

const CustomTabBarButton: React.FC<CustomTabBarButtonProps> = (props) => {
  const { onPress, children } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.customTabBarButton}
      activeOpacity={1}
    >
      {children}
    </TouchableOpacity>
  );
};

type TabBarButtonIconProps = {
  focused: boolean;
  iconName: string;
};

const TabBarButtonIcon: React.FC<TabBarButtonIconProps> = (props) => {
  const { focused, iconName } = props;
  const theme = useTheme<Theme>();

  return (
    <View
      style={[
        styles.tabBarButtonIcon,
        focused && { backgroundColor: theme.colors.tabBarActiveItemColor },
      ]}
    >
      <Icon
        name={iconName || 'alert'}
        size={23}
        // eslint-disable-next-line prettier/prettier
        color={focused ? theme.colors.secondaryIconColor : theme.colors.contrastIconColor}
      />
    </View>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  customTabBarButton: {
    flexGrow: 1,
    height: 42,
    borderRadius: 8,
    overflow: 'hidden',
  },

  tabBarButtonIcon: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
