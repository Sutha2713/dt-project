import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/type';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 70,
    paddingHorizontal: 16,
    zIndex: 1000,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  logo: {
    width: 90,
    height: 70,
    resizeMode: 'contain',
  },
  iconContainer: {
    paddingRight: 10,
  },
  welcomeBoxContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    paddingHorizontal: 20,
  },
  welcomeBox: {
    width: '100%',
    padding: 30,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  welcomeSubText: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontStyle: 'italic',
  },
  userNameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  buttonsContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 30,
  },
  button: {
    borderRadius: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
  },
  buttonIcon: {
    marginRight: 15,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'Roboto',
  }
});

const Homescreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [userData, setUserData] = useState<{
    username: string;
    name: string;
    email: string;
    designation: string;
    age: string;
    contactNo: string;
    profileImage?: string;
  } | null>(null);

  useEffect(() => {
    // Fetch user data when component mounts
    const getUserData = async () => {
      try {
        const userDataString = await AsyncStorage.getItem('userData');
        if (userDataString) {
          const data = JSON.parse(userDataString);
          setUserData(data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    getUserData();
  }, []);

  const TopBar = () => {
    return (
      <LinearGradient colors={["#b3e5fc", "#e3f2fd"]} style={styles.topBar}>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/images/Logo.png')} style={styles.logo} />
        </View>
        <TouchableOpacity 
          style={styles.iconContainer}
          onPress={() => navigation.navigate('Profile')}
        >
          <Icon name="user-circle" size={40} color="#3e4a59" />
        </TouchableOpacity>
      </LinearGradient>
    );
  };

  const WelcomeBox = () => {
    return (
      <View style={styles.welcomeBoxContainer}>
        <LinearGradient
          colors={["#b3e5fc", "#e3f2fd"]}
          style={styles.welcomeBox}
        >
          <Text style={styles.welcomeText}>Welcome to SaniTrax!</Text>
          {userData?.name && (
            <Text style={styles.userNameText}>{userData.name}</Text>
          )}
          <Text style={styles.welcomeSubText}>Track and manage your restroom cleanliness</Text>
        </LinearGradient>
      </View>
    );
  };

  interface AppButtonProps {
    title: string;
    icon: string;
    colors: [string, string, ...string[]];
    onPress?: () => void;
  }

  const AppButton: React.FC<AppButtonProps> = ({ title, icon, colors, onPress }) => {
    return (
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <LinearGradient
          colors={colors}
          style={styles.buttonContent}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Icon name={icon} size={24} color="black" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <TopBar />
      <LinearGradient
        colors={["#a7f7c8", "#4dd0e1"]}
        style={{ flex: 1 }}
      >
        <WelcomeBox />

        <View style={styles.buttonsContainer}>
          <AppButton
            title="Notifications"
            icon="bell"
            colors={["#7f7fd5", "#91eae4"]}
            onPress={() => navigation.navigate('Notifications')}
          />
          <AppButton
            title="Statistical Report"
            icon="chart-bar"
            colors={["#b3e5fc", "#e3f2fd"]}
            onPress={() => navigation.navigate('StatisticalReport')}
          />
          <AppButton
            title="Help and Support"
            icon="question-circle"
            colors={["#7f7fd5", "#91eae4"]}
            onPress={() => navigation.navigate('HelpAndSupport')}
          />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Homescreen;