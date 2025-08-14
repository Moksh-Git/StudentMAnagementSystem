import { View, Text, StyleSheet, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getCourseDetail, getStudentSubject } from '../../db/Database';
import { useRoute } from '@react-navigation/native';

const MyCourse = () => {
  const route = useRoute();
  const [detail, setDetail] = useState('');
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    getCourseDetail(
      route.params.data.course_id,
      res => {
        console.log(res);
        setDetail(res);
      },
      err => {
        console.log(err);
      },
    );
    getStudentSubject(
      route.params.data.course_id,
      res => {
        console.log(res);
        setSubjects(res);
      },
      err => {
        console.log(err);
      },
    );
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.course}>{`MyCourse: ${detail.name}`}</Text>
      <Text style={styles.fees}>{`Course Fees: ${detail.fees}`}</Text>
      <Text style={styles.heading}>{`Subjects`}</Text>
      <View style={{width: '100%'}}>
        <FlatList
        data={subjects}
        renderItem={({ item }) => {
          return (
            <View style={styles.subject}>
              <Text>{item.name}</Text>
            </View>
          );
        }}
      />
      </View>
    </View>
  );
};

export default MyCourse;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  course: {
    fontSize: 30,
    fontWeight: '600',
    marginTop: 50
  },
  fees: {
    fontSize: 20,
    marginTop: 10,
  },
  subject:{
    width: '90%',
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
    marginTop: 20
  },
  heading:{
    marginLeft: 20,
    alignSelf: 'flex-start',
    fontSize: 25,
    marginTop: 20
  }
});
