import { radioAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(radioAnatomy.keys);

const baseStyle = definePartsStyle({
  control: {
    borderColor: 'brandPurple.500',
  },
  label: {
    width: 'full',
  },
});

export const radioTheme = defineMultiStyleConfig({ baseStyle });
