import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { insertCourse } from '../../db/Database';

const AddCourse = () => {
  const [name, setName] = useState('');
  const [fees, setFees] = useState('');
  const [message, setMessage] = useState({
    type: '',
    msg: '',
  });

  return (
    <View style={styles.container}>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Enter Course name.."
        style={styles.input}
      />
      <TextInput
        value={fees}
        onChangeText={setFees}
        placeholder="Enter Fees.."
        style={styles.input}
      />
      {message.msg != '' && (
        <Text
          style={[
            {
              color: message.type === 'error' ? 'red' : 'green',
            },
            styles.messageStyle,
          ]}
        >
          {message.msg}
        </Text>
      )}

      <TouchableOpacity
        onPress={() => {
          insertCourse(
            name,
            parseInt(fees),
            res => {
              console.log('response: ', res);
              setName('');
              setFees('');
              setMessage({ type: 'success', msg: 'course added succesfully' });
            },
            err => {
              setMessage({ type: 'error', msg: err });
              console.log('error: ', err);
            },
          );
        }}
        style={styles.submitBtn}
      >
        <Text style={styles.btnText}>Submit Course</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddCourse;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
    paddingLeft: 10,
    input: 'black',
    marginTop: 20,
  },
  submitBtn: {
    width: '90%',
    height: 50,
    marginTop: 20,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  messageStyle: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 10,
  },
  btnText: {
    color: 'white',
    fontSize: 20,
  },
});
