import { defineStyleConfig } from '@chakra-ui/react';

export const inputTheme = defineStyleConfig({
  variants: {
    outline: {
      field: {
        bgColor: 'white',
        _focus: {
          borderColor: 'brandPurple.500',
        },
      },
    },
  },
  defaultProps: {},
});
