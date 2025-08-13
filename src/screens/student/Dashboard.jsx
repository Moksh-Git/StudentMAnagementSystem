import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  SafeAreaView,
} from 'react-native';

const features = [
  {
    id: '1',
    label: 'Mark Attendance',
    image: require('../../images/mark_attendance.png'),
    screen: 'MarkAttendance',
  },
  {
    id: '2',
    label: 'Check Attendance',
    image: require('../../images/check_attendance.png'),
    screen: 'CheckAttendance',
  },
  {
    id: '3',
    label: 'My Course',
    image: require('../../images/my_course.png'),
    screen: 'MyCourse',
  },
  {
    id: '4',
    label: 'My Fees',
    image: require('../../images/my_fees.png'),
    screen: 'MyFees',
  },
];

const DashboardScreen = ({navigation, route}) => {
  const studentName = route.params?.data.name || 'Student';

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate(item.screen, {data: route.params?.data})
      }>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <Text style={styles.cardText}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.greeting}>Welcome, {studentName} 👋</Text>
      <FlatList
        data={features}
        keyExtractor={item => item.id}
        numColumns={2}
        renderItem={renderItem}
        contentContainerStyle={styles.grid}
      />
    </SafeAreaView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    backgroundColor: '#f9f9f9',
  },
  greeting: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 50,
    marginLeft: 20,
  },
  grid: {
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    elevation: 3,
  },
  image: {
    width: 60,
    height: 60,
  },
  cardText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});