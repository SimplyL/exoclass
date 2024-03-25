import { extendTheme } from '@chakra-ui/react';
import colors from './colors';
import { buttonTheme } from './components/button.styles';
import { radioTheme } from './components/radio.styles';
import { checkboxTheme } from './components/checkbox.styles';
import { inputTheme } from './components/input.styles';
import { selectTheme } from './components/select.styles';
import { tagTheme } from './components/tag.styles';
import GroupCard from '@/modules/group-list/components/group-card/group-card.styles';
import Layout from '@/components/layout/layout.styles';
import Group from '@/modules/group/group.styles';
import { spinnerTheme } from './components/spinner.styles';

const overrides = {
  styles: {
    global: {
      'html, body': {
        margin: 0,
      },
      a: {
        color: 'brandPurple.500',
      },
    },
  },
  fonts: {
    body: 'Helvetica, sans-serif',
  },
  colors,
  components: {
    Radio: radioTheme,
    Button: buttonTheme,
    Checkbox: checkboxTheme,
    Input: inputTheme,
    NumberInput: inputTheme,
    Select: selectTheme,
    Tag: tagTheme,
    Spinner: spinnerTheme,
    GroupCard,
    Group,
    Layout,
  },
};

export default extendTheme(overrides);
