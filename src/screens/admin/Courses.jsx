import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { deleteCourse, getCourses } from '../../db/Database';

const Courses = () => {
  const navigation = useNavigation();
  const [courses, setCourses] = useState([]);
  const isFocused = useIsFocused()

  useEffect(() => {
    getCourseList();
  }, [isFocused]);

  const getCourseList = () => {
    getCourses(result => setCourses(result));
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.courseItem}>
        <View>
          <Text style={styles.courseName}>{item.name}</Text>
          <Text style={styles.fees}>₹ {item.fees}</Text>
        </View>
        <View style={styles.icons}>
          <TouchableOpacity
            onPress={() => {
              deleteCourse(
                item.id,
                res => {
                  Alert.alert(item.name + ' deleted successfully');
                  getCourseList();
                },
                err => {
                  Alert.alert('Error Occured');
                },
              );
            }}
          >
            <Text>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AddCourse', { type: 'edit', data: item });
            }}
          >
            <Text>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList data={courses} renderItem={renderItem} />
      
    </View>
  );
};

export default Courses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  courseItem: {
    width: '90%',
    height: 100,
    borderRadius: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    marginTop: 10,
  },
  fees: {
    color: 'green',
    fontSize: 20,
    fontWeight: '600',
  },
  courseName: {
    fontSize: 30,
    fontWeight: '600',
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
  icons: {
    rowGap: 10,
  },
});
