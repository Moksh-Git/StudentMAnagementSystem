import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const UserSelection = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Choose User Type</Text>
      
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          navigation.navigate('AdminNavigator');
        }}>
        <Text>I am Admin</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          navigation.navigate('StudentNavigator');
        }}>
        <Text>I am Student</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserSelection;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    borderRadius: 10,
    borderWidth: 1,
    width: '90%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  heading: {
    fontSize: 25,
    fontWeight: '600',
  },
});