import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import {
  getCourseDetail,
  getPaymentHistory,
  getRemainingFees,
  submitFees,
} from '../../db/Database';

const MyFees = () => {
  const route = useRoute();
  const [detail, setDetail] = useState('');
  const [remainingFees, setRemainingFees] = useState(0);
  const [showFrom, setShowFrom] = useState(false);
  const [fees, setFees] = useState('');
  const [paymentHistory,setPaymentHistory] = useState([])
  useEffect(() => {
    getCourseDetail(
      route.params.data.course_id,
      res => {
        console.log(res);
        setDetail(res);
        getFees(res.fees);
      },
      err => {
        console.log(err);
      },
    );
  }, []);

  const getFees = total => {
    getRemainingFees(route.params.data.id, res => {
      setRemainingFees(total - res);
      getPayments()
    });
  };

  const getPayments = () => {
    getPaymentHistory(
      route.params.data.id,
      res=>{
        setPaymentHistory(res)
      },
      err=>{
        Alert.alert("Error",JSON.stringify(err))
      }
  )
  }

  return (
    <View>
      <Text style={styles.totalFees}>{`Total Course Fees: ${
        detail && detail.fees
      } INR`}</Text>
      <Text
        style={styles.totalFees}
      >{`Remaining Course Fees: ${remainingFees} INR`}</Text>

      <FlatList 
        data={paymentHistory}
        ListHeaderComponent={()=>{
          return(
            <View style={styles.paymentItem}>
              <View style={styles.column}>
                <Text>{'Date'}</Text>
              </View>
              <View style={styles.column}>
                <Text>{'Amount Paid'}</Text>
              </View>
            </View>
          )
        }}
        contentContainerStyle={{marginTop:20}}
        renderItem={({item,index})=>{
          return(
            <View style={styles.paymentItem}>
              <View style={styles.column}>
                <Text>{item.date}</Text>
              </View>
              <View style={styles.column}>
                <Text>{item.amount_paid}</Text>
              </View>
            </View>
          ) 
        }}
      />

      <View style={styles.bottom}>
        {showFrom && (
          <TextInput
            value={fees}
            onChangeText={setFees}
            placeholder="Enter Amount"
            style={styles.input}
          />
        )}
        <TouchableOpacity
          disabled={!remainingFees > 0}
          style={[
            styles.submitFees,
            { backgroundColor: remainingFees > 0 ? 'green' : '#9e9e9e' },
          ]}
          onPress={() => {
            if (showFrom) {
              const date = new Date().toISOString();
              if (fees <= remainingFees) {
                submitFees(
                  route.params.data.id,
                  fees,
                  date,
                  res => {
                    Alert.alert('res', JSON.stringify(res));
                    getFees(detail.fees);
                    setFees('');
                  },
                  err => {
                    Alert.alert('error', JSON.stringify(err));
                  },
                );
              } else {
                Alert.alert('Please Enter Valid Fees Amount');
              }
            } else {
              setShowFrom(true);
            }
          }}
        >
          <Text>{showFrom ? 'Submit Fees' : 'Process Fees'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MyFees;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  totalFees: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 20,
    marginTop: 20,
  },
  submitFees: {
    width: '90%',
    height: 48,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  bottom: {
    position: 'absolute',
    bottom: -200,
    width: '100%',
    backgroundColor: 'white',
  },
  input: {
    width: '90%',
    height: 48,
    borderWidth: 1,
    alignSelf: 'center',
    marginBottom: 20,
    paddingLeft: 20,
    borderRadius: 10,
  },
  paymentItem:{
    width:'100%',
    justifyContent:'space-between',
    flexDirection:'row',
    height: 50
  },
  column:{
    width: '50%',
    height: '100%',
    justifyContent:'center',
    alignItems:'center',
    borderWidth:1
  }
});
