import { Dimensions, PixelRatio, Platform } from "react-native";

const isIOS = Platform.OS === 'ios';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const scale = SCREEN_WIDTH / 320;

// Use for email validate ex: onotrak@mail.com
export const validateEmail = email => {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(email).toLowerCase());
};

// Use for currency ex : IDR 1.500.00
export const convertCurrency = (nominal = 0, currency) => {
  let rupiah = '';
  const nominalref = nominal
    .toString()
    .split('')
    .reverse()
    .join('');
  for (let i = 0; i < nominalref.length; i++)
    if (i % 3 === 0) rupiah += nominalref.substr(i, 3) + '.';

  if (currency) {
    return (
      currency +
      rupiah
        .split('', rupiah.length - 1)
        .reverse()
        .join('')
    );
  } else {
    return rupiah
      .split('', rupiah.length - 1)
      .reverse()
      .join('');
  }
};

export const splitSpace = data => {
  return data.split(' ')
}

export const groupBy = (array, f) => {
  let groups = {};
  array.forEach(function(o) {
    let group = JSON.stringify(f(o));
    groups[group] = groups[group] || [];
    groups[group].push(o);
  });
  return Object.keys(groups).map(function(group) {
    return groups[group];
  });
};

// Use for text in android and ios
export const normalize = size => {
  const newSize = size * scale;
  if (isIOS) {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};
