import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import {
  getCourses,
  getSubjectbyCourseId,
  getSubjects,
} from '../../db/Database';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';
import { Dropdown } from 'react-native-element-dropdown';

const Subjects = () => {
  const isFocused = useIsFocused();
  const [selectedTab, setSelectedTab] = useState(0);
  const [subjects, setSubjects] = useState([]);

  const [courses, setCourses] = useState([]);

  const [selectedCourse, setSelectedCourse] = useState('');
  const [subject, setSubject] = useState('');

  useEffect(() => {
    getCourseList();
  }, [isFocused]);

  const getCourseList = () => {
    getCourses(result => {
      const list = [];
      for (let i = 0; i < result.length; i++) {
        list.push({
          label: result[i].name,
          value: result[i].id,
        });
      }
      setCourses(list);
      if (list.length > 0) setSelectedCourse(list[0].value);
    });
  };

  useEffect(() => {
    getAllSubjects();
  }, [isFocused]);

  const getAllSubjects = () => {
    try {
      getSubjects(
        res => {
          console.log('subjects: ', res);
          setSubjects(res);
        },
        err => {
          console.log('err: ', err);
        },
      );
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const getSubjectsByCourse = courseId => {
    try {
      getSubjectbyCourseId(
        courseId,
        res => {
          console.log('subjects: ', res);
          setSubjects(res);
        },
        err => {
          setSubjects([]);
          console.log('err: ', err);
        },
      );
    } catch (error) {
      console.log('error: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.allCoursesBtn,
            { backgroundColor: selectedTab === 0 ? 'black' : 'white' },
          ]}
          onPress={() => {
            setSelectedTab(0);
            getAllSubjects();
          }}
        >
          <Text style={{ color: selectedTab === 0 ? 'white' : 'black' }}>
            All Subjects
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.allCoursesBtn,
            { backgroundColor: selectedTab === 1 ? 'black' : 'white' },
          ]}
          onPress={() => {
            setSelectedTab(1);
            setSubjects([]);
          }}
        >
          <Text style={{ color: selectedTab === 1 ? 'white' : 'black' }}>
            Subjects By Course
          </Text>
        </TouchableOpacity>
      </View>

      {selectedTab === 1 && (
        <Dropdown
          style={styles.dropdown}
          data={courses}
          labelField={'label'}
          valueField={'value'}
          onChange={item => {
            setSelectedCourse(item.value);
            getSubjectsByCourse(item.value);
          }}
        />
      )}

      <FlatList
        data={subjects}
        contentContainerStyle={{ marginTop: 50 }}
        renderItem={({ item }) => {
          return (
            <View style={styles.subjectItem}>
              <Text>{selectedTab === 0 ? item.subject_name : item.name}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Subjects;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    justifyContent: 'space-evenly',
  },
  allCoursesBtn: {
    padding: 10,
    borderWidth: 1,
  },
  subjectItem: {
    width: '90%',
    height: 100,
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
  },
});
