import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator ,StatusBar} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/type';

// Define the notification item structure
interface Notification {
  id: string;
  message: string;
  timestamp: string;
  read: boolean;
  locationId: string;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  headerIcon: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    letterSpacing: 1,
  },
  notificationItem: {
    borderRadius: 25,
    marginBottom: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    overflow: 'hidden',
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  iconContainer: {
    backgroundColor: '#fff',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  locationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  timestampText: {
    fontSize: 14,
    color: '#fff',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
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
  rightButton: {     
    padding: 5,  

    top: '25%',
    transform: [{ translateY: -12 }],
  }
});

export const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // This will be replaced with your actual API call
    fetchNotifications();
  }, []);

  // Mock function to fetch notifications - replace with your API call
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      
      // Mock data - replace with actual API call
      // Example: const response = await fetch('your-api-url/notifications');
      // const data = await response.json();
      
      // Simulating API response delay
      setTimeout(() => {
        const mockData: Notification[] = [
          {
            id: '1',
            message: 'unclean!!!',
            timestamp: '3:56 pm',
            read: false,
            locationId: 'Q3M0106'
          },
          {
            id: '2',
            message: 'unclean!!!',
            timestamp: '3:42 pm',
            read: false,
            locationId: 'Q1M1014'
          },
          {
            id: '3',
            message: 'unclean!!!',
            timestamp: '3:35 pm',
            read: false,
            locationId: 'Q5F0208'
          },
          {
            id: '4',
            message: 'unclean!!!',
            timestamp: '2:53 pm',
            read: false,
            locationId: 'Q2M0106'
          }
        ];
        
        setNotifications(mockData);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setLoading(false);
    }
  };
  const TopBar = () => {   
    const navigation = useNavigation(); // Access navigation object using useNavigation hook
    return (
      <LinearGradient colors={["#b3e5fc", "#e3f2fd"]} style={styles.topBar}>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/images/Logo.png')} style={styles.logo} />
        </View>
        
        <TouchableOpacity
          style={styles.rightButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-right" size={24} color="#333" />
        </TouchableOpacity>
      </LinearGradient>
      );
    };
  

  // Function to mark notification as read - implement when you connect to backend
  const markAsRead = (id: string) => {
    // This will be your API call to update the notification status
    console.log(`Marking notification ${id} as read`);
    
    // Update local state
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };

  // Render each notification item
  const renderNotificationItem = ({ item }: { item: Notification }) => (
    <TouchableOpacity 
      style={styles.notificationItem}
      onPress={() => markAsRead(item.id)}
    >
      <LinearGradient
        colors={['#4facfe', '#00f2fe']}
        style={styles.notificationContent}
      >
        <View style={styles.iconContainer}>
          <Icon name="bell" size={20} color="black" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.locationText}>{item.locationId} {item.message}</Text>
          <Text style={styles.timestampText}>time: {item.timestamp}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (// <SafeAreaView style={styles.container}>       
        //<StatusBar translucent backgroundColor="transparent" />       
        //<TopBar /> 
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />       
      <TopBar /> 
      <LinearGradient
        colors={["#a7f7c8", "#91eae4"]}
        style={{ flex: 1 }}
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Icon name="bell" size={24} color="black" style={styles.headerIcon} />
            <Text style={styles.headerText}>NOTIFICATIONS</Text>
          </View>
          
          {loading ? (
            <View style={styles.emptyContainer}>
              <ActivityIndicator size="large" color="#fff" />
            </View>
          ) : notifications.length > 0 ? (
            <FlatList
              data={notifications}
              renderItem={renderNotificationItem}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                No notifications at this time. All monitored areas are clean.
              </Text>
            </View>
          )}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Notifications;