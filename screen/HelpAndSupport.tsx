import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking,StatusBar,Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  headerIcon: {
    backgroundColor: '#fff',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4db6ac',
    letterSpacing: 1,
  },
  aboutSection: {
    position: 'relative',
    marginBottom: 30,
  },
  aboutHeaderContainer: {
    backgroundColor: '#4db6ac',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 15,
    alignSelf: 'flex-start',
    marginBottom: 15,
  },
  aboutHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  aboutBubble: {
    backgroundColor: '#e0f7fa',
    borderRadius: 20,
    padding: 20,
    marginBottom: 10,
  },
  aboutText: {
    color: '#0277bd',
    lineHeight: 22,
    fontSize: 14,
  },
  contactSection: {
    marginTop: 20,
  },
  contactButton: {
    backgroundColor: '#4db6ac',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  contactButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
  contactInfo: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  contactText: {
    marginLeft: 15,
    color: '#0277bd',
    fontSize: 14,
  },
  questionText: {
    color: '#757575',
    marginBottom: 20,
    fontSize: 14,
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

export const HelpAndSupport = () => {
  const handleEmailPress = () => {
    Linking.openURL('mailto:sanitrax@gmail.com');
  };

  const handlePhonePress = () => {
    Linking.openURL('tel:0452256871');
  };
  const TopBar = () => {   
      const navigation = useNavigation();
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

  return (
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
            <View style={styles.headerIcon}>
              <Icon name="headset" size={20} color="#4db6ac" />
            </View>
            <Text style={styles.headerText}>HELP AND SUPPORT</Text>
          </View>
          
          {/* About Us Section */}
          <View style={styles.aboutSection}>
            <View style={styles.aboutHeaderContainer}>
              <Text style={styles.aboutHeaderText}>ABOUT US</Text>
            </View>
            
            <View style={styles.aboutBubble}>
              <Text style={styles.aboutText}>
                Sanitrax is a smart hygiene monitoring app that provides real-time data on unclean bathrooms. We help users and authorities track sanitation levels and take action to improve cleanliness. Our goal is to create a cleaner, healthier environment for everyone. Stay informed, stay clean with Sanitrax!
              </Text>
            </View>
          </View>
          
          {/* Contact Section */}
          <View style={styles.contactSection}>
            <TouchableOpacity style={styles.contactButton} onPress={handlePhonePress}>
              <Icon name="phone-alt" size={16} color="#fff" />
              <Text style={styles.contactButtonText}>CONTACT US</Text>
            </TouchableOpacity>
            
            <Text style={styles.questionText}>Have questions or feedback?</Text>
            
            <TouchableOpacity style={styles.contactInfo} onPress={handleEmailPress}>
              <Icon name="envelope" size={16} color="#0277bd" />
              <Text style={styles.contactText}>sanitrax@gmail.com</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.contactInfo} onPress={handlePhonePress}>
              <Icon name="phone" size={16} color="#0277bd" />
              <Text style={styles.contactText}>0452-256871</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default HelpAndSupport;