import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Courses from '../screens/admin/Courses';
import AddCourse from '../screens/admin/AddCourse';
import AddSubject from '../screens/admin/AddSubject';
import Subjects from '../screens/admin/Subjects';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
const Stack = createStackNavigator();
const Bottom = createBottomTabNavigator();

const AdminNavigator = () => {
  return (
    <Bottom.Navigator>
      <Bottom.Screen
        name="Courses"
        component={Courses}
        options={{
          tabBarIcon: ({ size, color }) => {
            return (
              <Image
                source={require('../../Images/courses.png')}
                style={{
                  width: size,
                  height: size,
                  tintColor: color,
                  resizeMode: 'contain',
                }}
              />
            );
          },
        }}
      />
      <Bottom.Screen
        name="Subjects"
        component={Subjects}
        options={{
          tabBarIcon: ({ size, color }) => {
            return (
              <Image
                source={require('../../Images/subjects.png')}
                style={{
                  width: size,
                  height: size,
                  tintColor: color,
                  resizeMode: 'contain',
                }}
              />
            );
          },
        }}
      />
      <Bottom.Screen
        name="AddCourse"
        component={AddCourse}
        options={{
          tabBarIcon: ({ size, color }) => {
            return (
              <Image
                source={require('../../Images/addcourse.png')}
                style={{
                  width: size,
                  height: size,
                  tintColor: color,
                  resizeMode: 'contain',
                }}
              />
            );
          },
        }}
      />
      <Bottom.Screen
        name="AddSubject"
        component={AddSubject}
        options={{
          tabBarIcon: ({ size, color }) => {
            return (
              <Image
                source={require('../../Images/addsubject.png')}
                style={{
                  width: size,
                  height: size,
                  tintColor: color,
                  resizeMode: 'contain',
                }}
              />
            );
          },
        }}
      />
    </Bottom.Navigator>
  );
};

export default AdminNavigator;
