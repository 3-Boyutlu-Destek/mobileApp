/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import {View, Image, Text} from 'react-native';
import {Container, ButtonX} from '../../Components';
import NavigationService from '../../Navigation/index';
import Routes from '../../Navigation/Routes/index';
import AppIntroSlider from '../../Lib/AppIntroSlider';
import useTranslation from '../../i18n/index';
import {LOCALES} from '../../Constants/index';
import colors from '../../Themes/Colors';


const LanguageSlideItem = props => {
  const {t, localeProvider, changeLocale} = useTranslation();

  const _changeLocale = () => {
    changeLocale(
      localeProvider.id == LOCALES.TURKISH.id ? LOCALES.ENGLISH : LOCALES.TURKISH,
    );
  };

  return (
    <View style={{padding: 20}}>
      <Text
        style={{
          fontSize: 16,
          color: 'rgba(255,255,255,0.6)',
        }}>
        {t('selectLanguage')}
      </Text>
      <ButtonX
        dark={true}
        mode="outlined"
        color="white"
        label={localeProvider.label}
        onPress={_changeLocale}
      />
    </View>
  );
};


const slides =
[
  {
    key: 'Loren Ipsum...',
    title: "Sağlık Çalışanları",
    text: "Covid-19 pandemisi ile ön saflarda cesurca mücadele eden sağlık çalışanlarımızın virüsten korunmaları için bazı koruyucu ekipmanlara ekstra olarak ihtiyaçları olduğunu farkettik.",
    image:require('../../Assets/img/doktorlar.png'),
    backgroundColor: colors.red100,
  },
  {
    key: 'bla bla -dos',
    image:require('../../Assets/img/doktorlar.png'),
    title: '3 Boyutlu Yazıcı Sahipleri',
    text: 'Küçük bir ekiple hızlıca aksiyon alarak Türkiye genelindeki gönüllü 3 boyutlu yazıcı sahiplerini birleştirebileceğimiz 3 Boyutlu Destek organizasyonunu kurduk. Ardından hızlıca üretime başladık.',
    backgroundColor: colors.white,
  },

  {
    key: 'There is more-dos',
    image:require('../../Assets/img/doktorlar.png'),
    title: 'Gönüllü Teslimatçılar',
    text: 'Kısa bir sürede hızlıca büyüyen 3 Boyutlu Destek Organizasyonuna gönüllü teslimatçı arkadaşlarımızın da katılması ile organizasyonumuz daha da güçlendi. Türkiye Motosiklet Platformuna katkılarından dolayı teşekkür ederiz.\nFakat, halen sana ihtiyacımız var! :)',
    backgroundColor: colors.white,
  }
];
const AppIntro = props => {
  const _onDone = () => {
    console.log('done');

    NavigationService.navigate(Routes.LOGIN_SCREEN);
  };

  return (
    <Container>
      <AppIntroSlider
        slides={slides}
        onDone={_onDone}
        onSkip={_onDone}
        showPrevButton={true}
        showSkipButton={true}
      />
    </Container>
  );
};

const _renderItem = item => {
  return (
    <Container
      style={{
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: item.backgroundColor,
      }}>
      <Text style={styles.title}>{item.title}</Text>
      <Image source={item.image} />
      <Text style={styles.text}>{item.text}</Text>
    </Container>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginVertical: 10,
    color: 'white',
  },
  text: {
    fontSize: 16,
    color: 'white',
  },
});

export default AppIntro;
