import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const brand = defineStyle({
  borderWidth: 6,
  color: 'brandPurple.500',
  boxSize: 50,
});

export const spinnerTheme = defineStyleConfig({
  variants: { brand },
});
