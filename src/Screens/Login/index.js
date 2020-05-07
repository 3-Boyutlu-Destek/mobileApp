/* eslint-disable react-native/no-inline-styles */
import React, { useRef } from 'react';
import { Text, Keyboard, Image, View } from 'react-native';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { STATUS } from '../../Constants';
import NavigationService from "../../Navigation/index"
import Routes from '../../Navigation/Routes/index';
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

export default () => {
  const onChange = useStoreActions(actions => actions.login.onLoginInputChange);
  const { t } = useTranslation();
  const { login } = useAuth();
  const { theme } = useAppTheme();

  const inputUserName = useRef();
  const inputPassword = useRef();

  const panelRef = useRef();

  const onSubmit = () => {
    inputPassword.current.focus();
  };

  const { email, password, status } = useStoreState(state => ({
    email: state.login.email,
    password: state.login.password,
    status: state.login.status,
  }));

  const loginUser = () => {
    Keyboard.dismiss();

    if (!email || !password) {
      showInfoToast('Username and password are mandatory, try again !');
    }

    login({
      email,
      password,
    });
  };

  const loading = status === STATUS.FETCHING;

  return (
    <Container>
      <Section style={{flex:0.1,padding:0}}>
          <View style={{flex:1}}/>
          <Image source={require("../../Assets/img/doktorlar.png")} style={{ width: 180, height: 90, justifyContent: "center", alignSelf: "center" }} />
        </Section>
        <View style={{flex:0.8}}>
          <Section style={{flex:1,borderTopLeftRadius: 40, borderTopRightRadius: 40, backgroundColor: "white",padding:7.5}}>
          <View style={{width:110,height:3,backgroundColor:"#e9e5e5",alignSelf:"center"}} />
          <Image source={require("../../Assets/img/logo.jpg")} style={{ width: 170, height: 150, justifyContent: "center", alignSelf: "center",marginTop:25}} />
           <Section style={{marginTop:10}}>
              <InputX
                label="Kullanıcı Adı"
                // mode="outlined"
                ref={inputUserName}
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
              <PasswordInputX
                ref={inputPassword}
                value={password}
                // mode="outlined"
                style={{ backgroundColor: '#ffffff' }}
                label="Şifre"
                returnKeyType={'go'}
                onSubmitEditing={loginUser}
                onChangeText={text =>
                  onChange({
                    key: 'password',
                    value: text,
                  })
                }
              />
            </Section>
            <Section style={{flexDirection: 'row',justifyContent:"space-around",margin:7,padding:2}}>
              <ButtonX
                loading={loading}
                
                color={loading ? theme.colors.accent : theme.colors.primary}
                onPress={loginUser}
                label={t('login')}
              />

              <ButtonX
              dark={true}
              color={loading ? theme.colors.accent : theme.colors.primary}
                onPress={() => NavigationService.navigate(Routes.SIGNUP_SCREEN)}
                label={t('signup')}
              />
            </Section>
          </Section>
        </View>
        <BottomPanel ref={panelRef} />
    </Container>
  );
};
