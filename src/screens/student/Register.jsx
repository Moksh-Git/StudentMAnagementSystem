import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {getCourses, insertStudent} from '../../db/Database';
import {useIsFocused} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';

const Register = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [courses, setCourses] = useState([]);
  const isFocused = useIsFocused();
  const [selectedCourse, setSelectedCourse] = useState('');
  useEffect(() => {
    getCourseList();
  }, [isFocused]);
  const getCourseList = () => {
    getCourses(result => {
      console.log('response', result);
      const list = [];
      for (let i = 0; i < result.length; i++) {
        list.push({label: result[i].name, value: result[i].id});
      }
      setCourses(list);
      if (list.length > 0) selectedCourse(list[0].value);
    });
  };
  const handleRegister = () => {
    if (!name || !email || !password || selectedCourse === '') {
      Alert.alert('Please fill all fields');
      return;
    }
    console.log('selectedCourse', selectedCourse);
    insertStudent(
      name,
      email,
      password,
      selectedCourse,
      res => {
        Alert.alert('user registered');
      },
      err => {
        Alert.alert('error');
        console.log(err)
      },
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput
        placeholder="Full Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <Dropdown
        style={styles.dropdown}
        data={courses}
        labelField={'label'}
        placeholder="Select Course"
        valueField={'value'}
        onChange={item => {
          setSelectedCourse(item.value);
        }}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.toggleText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', padding: 24},
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#FFF',
    padding: 14,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CCC',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {color: '#FFF', fontWeight: '600'},
  toggleText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#007BFF',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: '100%',
    alignSelf: 'center',
    marginBottom: 20,
  },
});