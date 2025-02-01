import { useIntl } from 'react-intl';

export function useGetOrderType() {
  const { formatMessage } = useIntl();
  const getOrderStatusData = (orderType: string) => {
    switch (orderType.toUpperCase()) {
      case 'COMPLETED':
        return {
          color: 'green',
          text: formatMessage({ id: 'myOrder.completed' }),
        };
      case 'PENDING':
        return {
          color: 'orange',
          text: formatMessage({ id: 'myOrder.pending' }),
        };
      case 'CANCELED':
        return {
          color: 'red',
          text: formatMessage({ id: 'myOrder.cancelled' }),
        };
      default:
        return {
          color: 'orange',
          text: formatMessage({ id: 'myOrder.pending' }),
        };
    }
  };

  return { getOrderStatusData };
}
