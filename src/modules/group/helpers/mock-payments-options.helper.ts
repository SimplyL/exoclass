import { GroupItemPaymentIntervals } from '@/interfaces/group-list.interface';

export interface GetPaymentOptionsReturn extends GroupItemPaymentIntervals {
  label: string;
  description: string;
}

export const getPaymentOptions = (paymentIntervals: GroupItemPaymentIntervals[]): GetPaymentOptionsReturn[] => {
  const [interval] = paymentIntervals;
  const paymentOptions: GroupItemPaymentIntervals[] = [
    interval,
    { ...interval, name: '3-months', group_price: interval.group_price * 3 },
  ];

  return paymentOptions.map((option) => {
    if (option.name === 'one-month') {
      return {
        ...option,
        label: 'Monthly payment',
        description:
          'Charged every month on 3rd of the month. Initial payment is for 1 month upfront, subsequent payments are adjusted every month for the actual number of lessons',
      };
    }

    return {
      ...option,
      label: 'Quarterly payment',
      description:
        'Charged every 3 months on 3rd of the month. Initial payment is for 3 months upfront, subsequent payments are adjusted every 3 months for the actual number of lessons',
    };
  });
};
