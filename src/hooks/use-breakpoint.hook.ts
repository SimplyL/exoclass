import { useBreakpoint as useChakraBreakpoint } from '@chakra-ui/react';

export interface UseBreakpointReturn {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

export const useBreakpoint = (): UseBreakpointReturn => {
  const breakpoint = useChakraBreakpoint({ ssr: false });

  switch (breakpoint) {
    case 'base':
    case 'sm':
      return {
        isMobile: true,
        isTablet: false,
        isDesktop: false,
      };
    case 'md':
      return {
        isMobile: true,
        isTablet: true,
        isDesktop: false,
      };
    default:
      return {
        isMobile: true,
        isTablet: true,
        isDesktop: true,
      };
  }
};
