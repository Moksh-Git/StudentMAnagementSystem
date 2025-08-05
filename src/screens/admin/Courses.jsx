import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const Courses = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addCourseBtn}
        onPress={() => {
          navigation.navigate('AddCourse');
        }}
      >
        <Text style={styles.btnText}>+ Add Course</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Courses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  addCourseBtn: {
    width: 200,
    height: 50,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 50,
    right: 20,
    borderRadius: 30,
  },
  btnText: {
    color: 'white',
    fontSize: 20,
  },
});
