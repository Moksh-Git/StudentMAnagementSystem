import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {markAttendance} from '../../db/Database';

const MarkAttendance = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [isSunday, setIsSunday] = useState(false);
  const navigation = useNavigation();
  const [attendanceTime, setAttendanceTime] = useState('');
  const route = useRoute();
  const data = route.params?.data;
  useEffect(() => {
    const date = new Date('2025-08-11');
    const mDate = date.toISOString().split('T')[0];
    console.log('mDate', mDate);
    setAttendanceTime(mDate);
    const day = date.getDay();
    setIsSunday(day === 0);
    const formattedDate = date.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      weekday: 'long',
    });
    setCurrentDate(formattedDate);
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.date}>{`Today: ${currentDate} `}</Text>
      <TouchableOpacity
        disabled={isSunday}
        onPress={() => {
          markAttendance(
            currentDate,
            data.id,
            'PRESENT',
            () => {
              Alert.alert('Marked Your attendence');
              navigation.goBack();
            },
            err => {
              Alert.alert('error', err);
            },
          );
        }}
        style={[styles.btn, {backgroundColor: isSunday ? '#9e9e9e' : 'green'}]}>
        <Text style={styles.btnTxt}>Mark Present</Text>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={isSunday}
        onPress={() => {
          markAttendance(
            currentDate,
            data.id,
            'ABSENT',
            () => {
              navigation.goBack();
            },
            err => {
              Alert.alert('error', err);
            },
          );
        }}
        style={[styles.btn, {backgroundColor: isSunday ? '#9e9e9e' : 'red'}]}>
        <Text style={styles.btnTxt}>Mark Absent</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MarkAttendance;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
  },
  date: {
    fontSize: 20,
  },
  btn: {
    width: '80%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  btnTxt: {color: 'white', fontSize: 18},
});