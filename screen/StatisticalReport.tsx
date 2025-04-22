import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions,Image,StatusBar} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Picker } from '@react-native-picker/picker';
import { BarChart, LineChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

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
    color: '#2e7d32',
    letterSpacing: 1,
  },
  filterContainer: {
    marginBottom: 20,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 5,
    marginBottom: 20,
  },
  pickerLabel: {
    backgroundColor: '#333',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 3,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  pickerLabelText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  chartContainer: {
    marginBottom: 25,
    alignItems: 'center',
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#555',
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

export const StatisticalReport = () => {
  // State for dropdown selections
  const [topTimeFrame, setTopTimeFrame] = useState('weekly');
  const [topMetric, setTopMetric] = useState('most_used');
  const [bottomTimeFrame, setBottomTimeFrame] = useState('weekly');
  const [bottomMetric, setBottomMetric] = useState('datetime');
  
  // Sample data - replace this with your API call results
  const [barChartData, setBarChartData] = useState({
    labels: ["Q1F0101", "Q2M0209", "Q3F0106"],
    datasets: [
      {
        data: [5, 13, 17]
      }
    ]
  });
  const TopBar = () => {   
    const navigation = useNavigation(); // Use the useNavigation hook
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
  const [lineChartData, setLineChartData] = useState({
    labels: ["00:00", "03:00", "09:00"],
    datasets: [
      {
        data: [18, 27, 23],
        color: (opacity = 1) => `rgba(26, 117, 159, ${opacity})`,
        strokeWidth: 2
      }
    ]
  });
  
  // This would be your API call to fetch data based on filter selections
  useEffect(() => {
    // Example function to fetch bar chart data
    const fetchBarChartData = async () => {
      try {
        // Replace with actual API call
        // const response = await fetch(`your-api/statistics?timeframe=${topTimeFrame}&metric=${topMetric}`);
        // const data = await response.json();
        
        // For demo, we'll just update with some random data when filters change
        const newData = {
          labels: ["Q1F0101", "Q2M0209", "Q3F0106"],
          datasets: [{
            data: [
              Math.floor(Math.random() * 20),
              Math.floor(Math.random() * 20) + 5,
              Math.floor(Math.random() * 20) + 10
            ]
          }]
        };
        
        setBarChartData(newData);
      } catch (error) {
        console.error("Error fetching bar chart data:", error);
      }
    };
    
    fetchBarChartData();
  }, [topTimeFrame, topMetric]);
  
  useEffect(() => {
    // Example function to fetch line chart data
    const fetchLineChartData = async () => {
      try {
        // Replace with actual API call
        // const response = await fetch(`your-api/statistics?timeframe=${bottomTimeFrame}&metric=${bottomMetric}`);
        // const data = await response.json();
        
        // For demo, we'll just update with some random data when filters change
        const newData = {
          labels: ["00:00", "03:00", "09:00"],
          datasets: [{
            data: [
              Math.floor(Math.random() * 15) + 15,
              Math.floor(Math.random() * 15) + 20,
              Math.floor(Math.random() * 15) + 15
            ],
            color: (opacity = 1) => `rgba(26, 117, 159, ${opacity})`,
            strokeWidth: 2
          }]
        };
        
        setLineChartData(newData);
      } catch (error) {
        console.error("Error fetching line chart data:", error);
      }
    };
    
    fetchLineChartData();
  }, [bottomTimeFrame, bottomMetric]);

  // Chart configuration
  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(26, 117, 159, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.6,
    decimalPlaces: 0,
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
            <Icon name="chart-bar" size={24} color="#2e7d32" style={styles.headerIcon} />
            <Text style={styles.headerText}>STATISTICAL DATA</Text>
          </View>
          
          {/* Top Chart - Bar Chart */}
          <View style={styles.filterContainer}>
            <View style={styles.pickerContainer}>
              <View style={styles.pickerLabel}>
                <Text style={styles.pickerLabelText}>{topTimeFrame.toUpperCase()}</Text>
              </View>
              <Picker
                selectedValue={topTimeFrame}
                onValueChange={(value: string) => setTopTimeFrame(value)}
                style={{ height: 40 }}
              >
                <Picker.Item label="Weekly" value="weekly" />
                <Picker.Item label="Monthly" value="monthly" />
              </Picker>
            </View>
            
            <View style={styles.pickerContainer}>
              <View style={styles.pickerLabel}>
                <Text style={styles.pickerLabelText}>MOST FREQUENTLY USED</Text>
              </View>
              <Picker
                selectedValue={topMetric}
                onValueChange={(value: string) => setTopMetric(value)}
                style={{ height: 40 }}
              >
                <Picker.Item label="Most Frequently Used" value="most_used" />
                <Picker.Item label="Least Used" value="least_used" />
              </Picker>
            </View>
          </View>
          
          <View style={styles.chartContainer}>
            <BarChart
              data={barChartData}
              width={width - 40}
              height={180}
              chartConfig={chartConfig}
              style={{
                borderRadius: 10,
              }}
              fromZero
              showValuesOnTopOfBars
              yAxisLabel="$"
              yAxisSuffix=""
            />
          </View>
          
          {/* Bottom Chart - Line Chart */}
          <View style={styles.filterContainer}>
            <View style={styles.pickerContainer}>
              <View style={styles.pickerLabel}>
                <Text style={styles.pickerLabelText}>{bottomTimeFrame.toUpperCase()}</Text>
              </View>
              <Picker
                selectedValue={bottomTimeFrame}
                onValueChange={(value: string) => setBottomTimeFrame(value)}
                style={{ height: 40 }}
              >
                <Picker.Item label="Weekly" value="weekly" />
                <Picker.Item label="Monthly" value="monthly" />
              </Picker>
            </View>
            
            <View style={styles.pickerContainer}>
              <View style={styles.pickerLabel}>
                <Text style={styles.pickerLabelText}>DATE AND TIME INTERVAL</Text>
              </View>
              <Picker
                selectedValue={bottomMetric}
                onValueChange={(value: string) => setBottomMetric(value)}
                style={{ height: 40 }}
              >
                <Picker.Item label="Date and Time Interval" value="datetime" />
                <Picker.Item label="Usage by Hour" value="hourly" />
              </Picker>
            </View>
          </View>
          
          <View style={styles.chartContainer}>
            <LineChart
              data={lineChartData}
              width={width - 40}
              height={180}
              chartConfig={chartConfig}
              bezier
              style={{
                borderRadius: 10,
              }}
            />
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default StatisticalReport;