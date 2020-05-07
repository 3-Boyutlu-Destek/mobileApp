/* eslint-disable react-native/no-inline-styles */
import React, { useRef } from 'react';
import { Text, Keyboard, Image, View } from 'react-native';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { STATUS } from '../../Constants';
import LoadingActionContainer from '../../Components/LoadingActionContainer';
import {
  Section,
  Container,
  PasswordInputX,
  InputX,
  ButtonX,
} from '../../Components';

import useAppTheme from '../../Themes/Context';
import useAuth from '../../Services/Auth';
import { showInfoToast } from '../../Lib/Toast';
import BottomPanel from '../../Components/Panel';
import useTranslation from '../../i18n';
import Fonts from '../../Themes/Fonts';
import CheckboxGroup from '../../Components/checkboxGroup'


export default () => {
  const onChange = useStoreActions(actions => actions.create.onLoginInputChange);
  const { t } = useTranslation();
  const { userCreate } = useAuth();
  const { theme } = useAppTheme();

  const inputUserName = useRef();
  const inputPassword = useRef();
  const onSubmit = () => {
    inputPassword.current.focus();
  };

  const { email, password,passwordAgain,username,firstname,last_name,phone,city,role,status } = useStoreState(state => ({
    email: state.create.email,
    password: state.create.password,
    passwordAgain: state.create.passwordAgain,
    username: state.create.username,
    firstname: state.create.firstname,
    last_name: state.create.last_name,
    role: state.create.selectedRole=1,
    phone: state.create.phone,
    city: state.create.city,
    status: state.create.status,
  }));

  const createUser = () => {
    Keyboard.dismiss();
    if (!email || !password || !passwordAgain||!firstname||!city||!role||!status) {
      showInfoToast('Fields are mandatory, try again !');
    }
    else if(password !== passwordAgain){
      showInfoToast('Password not match, try again !');
    }

    //FIXME: firstname and lastname
    userCreate({
      email,password, passwordAgain,firstname,firstname,firstname,city,role,phone
    });
  };

  const loading = status === !STATUS.FETCHING;
  return (
    <Container>
      <Section style={{ flex: 0.1, padding: 0, justifyContent: "center" }}>
        <Text style={{ color: "#002d44", alignSelf: "center", fontSize: 18 }} >KAYIT OL</Text>
      </Section>
      <View style={{ flex: 0.9 }}>
        <Section style={{ flex: 1, borderTopLeftRadius: 40, borderTopRightRadius: 40, backgroundColor: "white", padding: 7.5 }}>
          <View style={{ width: 110, height: 3, backgroundColor: "#e9e5e5", alignSelf: "center" }} />
          <Section style={{ marginTop: 10 }}>
            <InputX
              label="Ad Soyad"
              // mode="outlined"
              style={{ backgroundColor: '#ffffff' }}
              autoCapitalize="none"
              returnKeyType={'next'}
              onSubmitEditing={onSubmit}
              onChangeText={text =>
                onChange({
                  key: 'firstname',
                  value: text,
                })
              }
              value={firstname}
            />
            <PasswordInputX
              value={password}
              // mode="outlined"
              style={{ backgroundColor: '#ffffff' }}
              label="Şifre"
              returnKeyType={'go'}
              onSubmitEditing={createUser}
              onChangeText={text =>
                onChange({
                  key: 'password',
                  value: text,
                })
              }
            />
            <PasswordInputX
              value={passwordAgain}
              // mode="outlined"
              style={{ backgroundColor: '#ffffff' }}
              label="Şifre (Tekrar)"
              returnKeyType={'go'}
              onSubmitEditing={createUser}
              onChangeText={text =>
                onChange({
                  key: 'passwordAgain',
                  value: text,
                })
              }
            />
            <InputX
              label="İl"
              // mode="outlined"
              style={{ backgroundColor: '#ffffff' }}
              autoCapitalize="none"
              returnKeyType={'next'}
              onSubmitEditing={onSubmit}
              onChangeText={text =>
                onChange({
                  key: 'city',
                  value: text,
                })
              }
              value={city}
            />
            <InputX
              label="E-posta"
              // mode="outlined"
              style={{ backgroundColor: '#ffffff' }}
              autoCapitalize="none"
              returnKeyType={'next'}
              onSubmitEditing={onSubmit}
              onChangeText={text =>
                onChange({
                  key: 'email',
                  value: text,
                })
              }
              value={email}
            />
            <InputX
              label="Telefon"
              // mode="outlined"
              style={{ backgroundColor: '#ffffff' }}
              autoCapitalize="none"
              returnKeyType={'next'}
              onSubmitEditing={onSubmit}
              onChangeText={text =>
                onChange({
                  key: 'phone',
                  value: text,
                })
              }
              value={phone}
            />

          </Section>
          <Section style={{ flex: 1,padding:7}}>
            <CheckboxGroup
              callback={(selected) => { console.log(selected); onChange({
                key: 'role',
                value: role,
              })}}
              iconColor={"#002d44"}
              iconSize={30}
              checkedIcon="ios-checkbox-outline"
              uncheckedIcon="ios-square-outline"
              checkboxes={[
                {
                  label: "Gönüllü Üreticiyim", // label for checkbox item
                  value: 1, // selected value for item, if selected, what value should be sent?
                  selected: true // if the item is selected by default or not.
                },
                {
                  label: "Hammadde Destekçisiyim",
                  value: 2
                },
                {
                  label: "Ziyaretçiyim",
                  value: -1
                },
              ]}
              labelStyle={{
                color: '#002d44',
                marginLeft:7,
                alignSelf:"center"
              }}
              rowStyle={{
                flexDirection: 'row'
              }}
              rowDirection={"column"}
            />
          </Section>
          <Section style={{ flexDirection: 'row', alignSelf: "center", justifyContent: "center" }}>
            <ButtonX
              loading={loading}
              style={{padding:0,width:"100%"}}
              dark={true}
              color={loading ? theme.colors.accent : theme.colors.primary}
              onPress={createUser}
              label={"Kaydı Tamamla"}
            />
            </Section>
        </Section>
      </View>
    </Container>
  );
};
