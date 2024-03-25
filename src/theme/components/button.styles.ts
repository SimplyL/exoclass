import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const buttonBase = defineStyle({
  borderRadius: 'none',
});

export const buttonTheme = defineStyleConfig({
  baseStyle: buttonBase,
  defaultProps: {},
});
