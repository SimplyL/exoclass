import { useCartStore } from '@/store';
import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerProps,
  Text,
} from '@chakra-ui/react';
import CartItem from './components/cart-item.component';
import { formatMoney } from '@/helpers/format-money.helper';
import { useNavigate } from 'react-router-dom';
import { routes } from '@/defaults/routes.default';

const Cart = ({ isOpen, onClose }: Omit<DrawerProps, 'children'>) => {
  const navigate = useNavigate();
  const cartItems = useCartStore((state) => state.cartItems);
  const currency = useCartStore((state) => state.currency_code);
  const removeItem = useCartStore((state) => state.removeItem);

  const getTotalAmount = (): number => {
    return cartItems.reduce((a, c) => {
      const { group_price } = c;
      return a + group_price;
    }, 0);
  };

  const handleCheckout = () => {
    onClose();
    navigate(`${routes.payment}`);
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent bg="gray.100">
        <DrawerCloseButton />
        <DrawerHeader>My cart</DrawerHeader>
        <Divider borderColor="gray.300" mb=".5rem" />
        <DrawerBody display="grid" gap="1rem">
          {cartItems.map((item, index) => (
            <CartItem key={index} item={item} onRemove={() => removeItem(index)} />
          ))}
        </DrawerBody>
        <DrawerFooter display="grid" justifyContent="stretch" gridTemplateColumns="auto">
          <Divider borderColor="gray.300" />
          <Box display="grid" gridTemplateColumns="1fr auto" py="1rem" fontSize={20} fontWeight={600}>
            <Text>Total:</Text>
            <Text color="brandPurple.500">{formatMoney(getTotalAmount(), currency)}</Text>
          </Box>
          <Button borderRadius="base" colorScheme="brandPurple" w="full" onClick={handleCheckout}>
            Checkout
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Cart;
