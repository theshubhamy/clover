import React from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const Icon =
  name =>
  ({color, size}) =>
    <Ionicons name={name} color={color} size={size} />;

export const MIcon =
  name =>
  ({color, size}) =>
    <MaterialIcons name={name} color={color} size={size} />;
