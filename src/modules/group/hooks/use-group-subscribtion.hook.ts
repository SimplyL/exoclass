import { GroupItem } from '@/interfaces/group-list.interface';
import { Student } from '@/interfaces/student.interface';
import { useStudentsStore, useCartStore, useAuthStore } from '@/store';
import { useCallback, useState } from 'react';
import { GetPaymentOptionsReturn, getPaymentOptions } from '../helpers/mock-payments-options.helper';
import { formatMoney } from '@/helpers/format-money.helper';
import { SubscriptionPaymentType } from '@/types/group.type';
import { useDisclosure, useToast } from '@chakra-ui/react';

export interface UseGroupSubscribtionReturn {
  students: Student[];
  isAuthorized: boolean;
  selectedStudent: number | null;
  currency_code: string;
  paymentOptions: GetPaymentOptionsReturn[];
  isOpen: boolean;
  selectedSubscription: SubscriptionPaymentType;
  addToCart: (selectedStudents: Student[], price: number) => void;
  getTotalAmount: () => string | null;
  onAddToCart: () => void;
  selectStudent: (index: number) => void;
  handleRadioSelect: (value: SubscriptionPaymentType) => void;
  handleEditStudent: (index: number) => void;
  handleClose: () => void;
  onOpen: () => void;
}

export interface UseGroupSubscribtion {
  group: GroupItem;
}

export const useGroupSubscribtion = ({ group }: UseGroupSubscribtion): UseGroupSubscribtionReturn => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedSubscription, setSelectedSubscription] = useState<SubscriptionPaymentType>('one-month');
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
  const students = useStudentsStore((state) => state.students);
  const selectStudent = useStudentsStore((state) => state.selectStudent);
  const addItem = useCartStore((state) => state.addItem);
  const setCurrency = useCartStore((state) => state.setCurrency);
  const authToken = useAuthStore((state) => state.token);

  const { payment_intervals, provider } = group;
  const { currency_code } = provider;

  // Endpoint returns only one payment option. Since we are expecting 2 options, I am creating an extra mocked option here.
  const paymentOptions = getPaymentOptions(payment_intervals);

  const addToCart = useCallback(
    (selectedStudents: Student[], price: number) => {
      setCurrency(currency_code);

      selectedStudents.forEach((student) => {
        addItem({ student, group, group_price: price });
      });
    },
    [addItem, setCurrency, currency_code, group],
  );

  const handleRadioSelect = (value: SubscriptionPaymentType) => {
    setSelectedSubscription(value);
  };

  const handleEditStudent = (index: number) => {
    setSelectedStudent(index);
    onOpen();
  };

  const handleClose = () => {
    setSelectedStudent(null);
    onClose();
  };

  const displayToast = useCallback(() => {
    toast({
      description: 'Selected items have been added to your cart.',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
  }, [toast]);

  const getSelectedStudents = useCallback((): Student[] => students.filter(({ isSelected }) => isSelected), [students]);

  const getSelectedPaymentInterval = useCallback(
    () => paymentOptions.find(({ name }) => name === selectedSubscription),
    [selectedSubscription, paymentOptions],
  );

  const onAddToCart = useCallback(() => {
    const selectedStudents = getSelectedStudents();
    const { group_price = 0 } = getSelectedPaymentInterval() || {};

    addToCart(selectedStudents, group_price);
    displayToast();
  }, [getSelectedStudents, getSelectedPaymentInterval, displayToast, addToCart]);

  const getTotalAmount = useCallback((): string | null => {
    const selectedStudents = getSelectedStudents();
    const selectedOption = getSelectedPaymentInterval();
    const totalAmount = selectedOption ? selectedStudents.length * selectedOption?.group_price : 0;

    return formatMoney(totalAmount, currency_code);
  }, [getSelectedPaymentInterval, currency_code, getSelectedStudents]);

  return {
    students,
    selectStudent,
    addToCart,
    isAuthorized: !!authToken,
    currency_code,
    paymentOptions,
    onAddToCart,
    getTotalAmount,
    isOpen,
    selectedSubscription,
    handleRadioSelect,
    handleEditStudent,
    handleClose,
    selectedStudent,
    onOpen,
  };
};
