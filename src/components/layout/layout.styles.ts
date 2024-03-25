import { ComponentStyleConfig } from '@chakra-ui/react';

const Layout: ComponentStyleConfig = {
  parts: ['wrapper', 'inner', 'headerWrapper', 'headerInner', 'main'],
  baseStyle: {
    wrapper: {
      display: 'grid',
      minHeight: '100vh',
      gridTemplateRows: 'min-content 1fr min-content',
      bg: 'gray.200',
    },
    headerWrapper: {
      display: 'grid',
      width: 'full',
      position: 'sticky',
      top: 0,
      zIndex: 1,
      borderBottom: '1px solid',
      bg: 'gray.200',
      borderColor: 'gray.300',
    },
    main: {
      minHeight: 'full',
      width: 'full',
    },
    inner: {
      justifySelf: 'center',
      maxWidth: '80em',
      p: '1rem',
      w: 'full',
    },
  },
};

export default Layout;
