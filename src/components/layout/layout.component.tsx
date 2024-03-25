import { routes } from '@/defaults/routes.default';
import { useSignOut } from '@/hooks/use-sign-out.hook';
import Cart from '@/modules/cart';
import LoginModal from '@/modules/login-modal';
import { useAuthStore } from '@/store';
import {
  Box,
  BoxProps,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  IconButton,
  useDisclosure,
  useMultiStyleConfig,
} from '@chakra-ui/react';
import { MdShoppingCart } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children, ...rest }: BoxProps) => {
  const { inner, wrapper, headerWrapper, main } = useMultiStyleConfig('Layout');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenLoginModal, onOpen: onOpenLoginModal, onClose: onCloseLoginModal } = useDisclosure();
  const authToken = useAuthStore((state) => state.token);
  const location = useLocation();
  const { signOut } = useSignOut();

  const breadcrumbs = {
    home: location.pathname === routes.home,
    group: location.pathname.split('/').includes('groups'),
    payment: location.pathname === routes.payment,
  };

  return (
    <Box __css={wrapper} {...rest}>
      <Box sx={headerWrapper}>
        <Box sx={inner}>
          <Box display="grid" gridTemplateColumns="1fr auto">
            <Breadcrumb>
              <BreadcrumbItem>
                <BreadcrumbLink as={Link} to="/">
                  Group list
                </BreadcrumbLink>
              </BreadcrumbItem>
              {breadcrumbs.group && (
                <BreadcrumbItem isCurrentPage={true}>
                  <BreadcrumbLink as={Link} to="#">
                    Group
                  </BreadcrumbLink>
                </BreadcrumbItem>
              )}
              {breadcrumbs.payment && (
                <BreadcrumbItem isCurrentPage={true}>
                  <BreadcrumbLink as={Link} to="#">
                    Payment
                  </BreadcrumbLink>
                </BreadcrumbItem>
              )}
            </Breadcrumb>
            <Box display="grid" gridTemplateColumns="1fr auto" justifySelf="end" gap=".5rem">
              <Button
                size="sm"
                variant="outline"
                colorScheme="brandPurple"
                borderRadius="base"
                onClick={authToken ? signOut : onOpenLoginModal}
              >
                {authToken ? 'Sign out' : 'Sign in'}
              </Button>
              {!!authToken && (
                <IconButton
                  onClick={onOpen}
                  variant="link"
                  colorScheme="brandPurple"
                  aria-label="Show cart"
                  icon={<MdShoppingCart size="22" />}
                />
              )}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={inner}>
        <Box sx={main}>{children}</Box>
      </Box>
      <Cart isOpen={isOpen} onClose={onClose} />
      <LoginModal isOpen={isOpenLoginModal} onClose={onCloseLoginModal} />
    </Box>
  );
};

export default Layout;
