import { defineStyleConfig } from '@chakra-ui/react';

export const selectTheme = defineStyleConfig({
  variants: {
    outline: {
      field: {
        bgColor: 'white',
        borderRadius: 'none',
        _focus: {
          borderColor: 'brandPurple.500',
        },
      },
    },
  },
  defaultProps: {},
});
