import { tagAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(tagAnatomy.keys);

const brandVariant = definePartsStyle({
  container: {
    bg: 'gray.900',
    color: 'white',
    opacity: 0.8,
    px: '1rem',
    borderRadius: '2rem',
    fontSize: '0.825rem',
    display: 'flex',
    justifyContent: 'center',
  },
});

export const tagTheme = defineMultiStyleConfig({
  variants: {
    brand: brandVariant,
  },
});
