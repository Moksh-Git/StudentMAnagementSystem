import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/student/Login';
import Register from '../screens/student/Register';
import Dashboard from '../screens/student/Dashboard';
import MarkAttendance from '../screens/student/MarkAttendance';
import CheckAttendance from '../screens/student/CheckAttendance';
import MyCourse from '../screens/student/MyCourse';
import MyFees from '../screens/student/MyFees';
const Stack = createStackNavigator();
const StudentNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{headerShown: false}}
      />
      <Stack.Screen name="MarkAttendance" component={MarkAttendance} />
      <Stack.Screen name="CheckAttendance" component={CheckAttendance} />
      <Stack.Screen name="MyCourse" component={MyCourse} />
      <Stack.Screen name="MyFees" component={MyFees} />
    </Stack.Navigator>
  );
};

export default StudentNavigator;