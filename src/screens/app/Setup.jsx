import React, {useState} from 'react';
import {useAuth} from '../../context/AuthContext';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
const Setup = () => {
  const {user} = useAuth();
  const [step1Data, setStep1Data] = useState({name: '', address: ''});
  const [step2Data, setStep2Data] = useState({email: '', username: ''});
  const [step3Data, setStep3Data] = useState({
    password: '',
    retypePassword: '',
  });
  const [step4Data, setStep4Data] = useState({
    password: '',
    retypePassword: '',
  });

  return (
    <View className="flex-1  bg-white items-center pt-1">
      <Text className="text-3xl font-bold  text-primary">CLOVER</Text>
      <Text className="text-lg font-bold  text-gray-900">
        Welcome {user.displayName} !
      </Text>
      <ProgressSteps
        scrollable={false}
        topOffset={30}
        borderWidth={6}
        progressBarColor="transparent"
        completedProgressBarColor="transparent"
        completedCheckColor="transparent"
        completedStepIconColor="transparent"
        completedLabelColor="transparent"
        disabledStepIconColor="transparent"
        activeStepNumColor="transparent"
        activeStepIconColor="transparent"
        activeStepIconBorderColor="transparent"
        disabledStepNumColor="transparent"
        borderStyle="none"
        completedStepNumColor="transparent"
        activeLabelColor="transparent"
        labelColor="transparent"
        marginBottom={0}>
        <ProgressStep label="">
          <View style={styles.stepContent}>
            <View>
              <Text className="text-3xl font-bold text-center mb-3 text-gray-800">
                Sign In
              </Text>
              <Text className="text-base text-center mb-6 text-gray-600">
                Hi! Welcome Back, You've been missed
              </Text>
            </View>
            <Text style={styles.label}>Name</Text>
            <TextInput
              className="h-12 border border-gray-300 rounded-full mb-4 px-3 w-full bg-white"
              placeholder="Name"
              value={step1Data.name}
              onChangeText={text => setStep1Data({...step1Data, name: text})}
            />
            <Text style={styles.label}>Address</Text>
            <TextInput
              className="h-12 border border-gray-300 rounded-full mb-4 px-3 w-full bg-white"
              placeholder="Address"
              value={step1Data.address}
              onChangeText={text => setStep1Data({...step1Data, address: text})}
            />
          </View>
        </ProgressStep>
        <ProgressStep label="">
          <View style={styles.stepContent}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              className="h-12 border border-gray-300 rounded-full mb-4 px-3 w-full bg-white"
              placeholder="Email"
              value={step2Data.email}
              onChangeText={text => setStep2Data({...step2Data, email: text})}
            />
            <Text style={styles.label}>Username</Text>
            <TextInput
              className="h-12 border border-gray-300 rounded-full mb-4 px-3 w-full bg-white"
              placeholder="Username"
              value={step2Data.username}
              onChangeText={text =>
                setStep2Data({...step2Data, username: text})
              }
            />
          </View>
        </ProgressStep>
        <ProgressStep label="">
          <View style={styles.stepContent}>
            <View></View>
            <Text style={styles.label}>Password</Text>
            <TextInput
              className="h-12 border border-gray-300 rounded-full mb-4 px-3 w-full bg-white"
              placeholder="Password"
              secureTextEntry={true}
              value={step3Data.password}
              onChangeText={text =>
                setStep3Data({...step3Data, password: text})
              }
            />
            <Text style={styles.label}>Retype Password</Text>
            <TextInput
              className="h-12 border border-gray-300 rounded-full mb-4 px-3 w-full bg-white"
              placeholder="Retype Password"
              secureTextEntry={true}
              value={step3Data.retypePassword}
              onChangeText={text =>
                setStep3Data({...step3Data, retypePassword: text})
              }
            />
          </View>
        </ProgressStep>
        <ProgressStep label="">
          <View style={styles.stepContent}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              className="h-12 border border-gray-300 rounded-full mb-4 px-3 w-full bg-white"
              placeholder="Password"
              secureTextEntry={true}
              value={step4Data.password}
              onChangeText={text =>
                setStep4Data({...step4Data, password: text})
              }
            />
            <Text style={styles.label}>Retype Password</Text>
            <TextInput
              className="h-12 border border-gray-300 rounded-full mb-4 px-3 w-full bg-white"
              placeholder="Retype Password"
              secureTextEntry={true}
              value={step4Data.retypePassword}
              onChangeText={text =>
                setStep4Data({...step4Data, retypePassword: text})
              }
            />
          </View>
        </ProgressStep>
      </ProgressSteps>
    </View>
  );
};
const styles = StyleSheet.create({
  stepContent: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginHorizontal: 5,
    marginTop: 10,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#e8f5e9',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    marginTop: 10,
  },
});

export default Setup;
