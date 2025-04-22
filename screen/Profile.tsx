import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/type';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../navigation/AuthContext';

const Profile: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { user, updateUser, logout } = useAuth();
  
  // Request permission for image picker
  const requestPermission = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Sorry, we need camera roll permissions to make this work!');
        return false;
      }
      return true;
    }
    return true;
  };

  // Pick image from gallery
  const pickImage = async () => {
    const hasPermission = await requestPermission();
    
    if (hasPermission) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const imageUri = result.assets[0].uri;
        console.log("Selected image URI:", imageUri);
        
        // Update user profile image in context
        updateUser({ ...user, profileImage: imageUri });
        
        // Optional: Add a confirmation for the user
        Alert.alert("Success", "Profile picture updated successfully!");
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#a7f7c8", "#4dd0e1"]}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-left" size={24} color="#333" />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>Profile</Text>
          
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={() => {
              logout();
              navigation.navigate('Login');
            }}
          >
            <Icon name="sign-out-alt" size={24} color="#333" />
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.scrollView}>
          <View style={styles.profileCardContainer}>
            <LinearGradient
              colors={["#b3e5fc", "#e3f2fd"]}
              style={styles.profileCard}
            >
              <TouchableOpacity style={styles.profileImageContainer} onPress={pickImage}>
                {user && user.profileImage ? (
                  <Image 
                    source={{ uri: user.profileImage }} 
                    style={styles.profileImage} 
                    resizeMode="cover"
                  />
                ) : (
                  <View style={styles.placeholderImage}>
                    <Icon name="user" size={50} color="#777" />
                    <View style={styles.cameraIconContainer}>
                      <Icon name="camera" size={16} color="#444" />
                    </View>
                  </View>
                )}
                <View style={styles.cameraIconContainer}>
                  <Icon name="camera" size={16} color="#444" />
                </View>
              </TouchableOpacity>
              
              <View style={styles.profileInfo}>
                <Text style={styles.nameText}>NAME: {user?.name || 'N/A'}</Text>
                <Text style={styles.designationText}>DESIGNATION: {user?.designation || 'N/A'}</Text>
                <Text style={styles.ageText}>AGE: {user?.age || 'N/A'}</Text>
                <Text style={styles.contactText}>CONTACT NO: {user?.contactNo || 'N/A'}</Text>
                <Text style={styles.emailText}>EMAIL: {user?.email || 'N/A'}</Text>
              </View>
            </LinearGradient>
          </View>
          
          <View style={styles.sectionTitle}>
            <Text style={styles.sectionTitleText}>Settings</Text>
          </View>
          
          <TouchableOpacity style={styles.settingItem}>
            <Icon name="user-edit" size={24} color="#444" style={styles.settingIcon} />
            <Text style={styles.settingText}>Edit Profile</Text>
            <Icon name="chevron-right" size={16} color="#777" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => navigation.navigate('Notifications')}
          >
            <Icon name="bell" size={24} color="#444" style={styles.settingIcon} />
            <Text style={styles.settingText}>Notifications</Text>
            <Icon name="chevron-right" size={16} color="#777" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <Icon name="shield-alt" size={24} color="#444" style={styles.settingIcon} />
            <Text style={styles.settingText}>Privacy and Security</Text>
            <Icon name="chevron-right" size={16} color="#777" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => navigation.navigate('HelpAndSupport')}
          >
            <Icon name="question-circle" size={24} color="#444" style={styles.settingIcon} />
            <Text style={styles.settingText}>Help and Support</Text>
            <Icon name="chevron-right" size={16} color="#777" />
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  backButton: {
    width: 40,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  logoutButton: {
    width: 40,
    alignItems: 'flex-end',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  profileCardContainer: {
    marginBottom: 24,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileCard: {
    padding: 24,
    borderRadius: 20,
  },
  profileImageContainer: {
    alignSelf: 'center',
    marginBottom: 20,
    position: 'relative',
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: 'white',
  },
  placeholderImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#e1e1e1',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'white',
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#ddd',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    zIndex: 1,
  },
  profileInfo: {
    marginTop: 10,
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  designationText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  ageText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  contactText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  emailText: {
    fontSize: 16,
    color: '#333',
  },
  sectionTitle: {
    marginTop: 10,
    marginBottom: 16,
  },
  sectionTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  settingIcon: {
    marginRight: 16,
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
});

export default Profile;