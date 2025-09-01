import generalConstants from '@constants/general';
import { statusConstantInverse } from '@constants/status';
import { formatCurrency, getConditionalColor } from '@helpers/general.helper';
import notify from '@helpers/notification.helper';
import {
  Badge,
  Drawer,
  LoadingOverlay,
  ScrollArea,
  useMantineColorScheme,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import storeService from '@services/store.service';
import dayjs from 'dayjs';
import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';

interface Transaction {
  _id: string;
  store: {
    _id: string;
    name: string;
    sub_domain: string;
  };
  order: {
    _id: string;
    customer_full_name: string;
    customer_phone_number: string;
    order_number: number;
  };
  payment_method: number;
  amount: number;
  service_charge: number;
  is_billed: boolean;
  wallet_referance_code: string;
  status: number;
  quick_receipt_id: string;
  created_at: string;
}

interface Settlement {
  _id: string;
  store: string;
  transactions: string[];
  settlement_id: string;
  total_paid: number;
  total_service_charge: number;
  total_transactions: number;
  created_at: string;
  __v: number;
}

interface SettlementDetailDrawerProps {
  open: boolean;
  onClose: () => void;
  settlement_id: string;
  onRefresh?: () => void;
}

interface SettlementData {
  settlement: Settlement;
  transactions: Transaction[];
}

export default function SettlementDetailDrawer({
  open,
  onClose,
  settlement_id,
  onRefresh,
}: SettlementDetailDrawerProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isMobile = useMediaQuery('(max-width: 767px)', false);
  const [allData, setAllData] = useState<SettlementData | null>(null);

  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  const fetchSetlements = async () => {
    try {
      setIsLoading(true);

      const data = await storeService.getSettlementById(settlement_id);

      setAllData(data);
    } catch (err) {
      notify.genericError('Error', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (open && settlement_id) {
      fetchSetlements();
    }
  }, [open, settlement_id]);

  return (
    <>
      <Drawer
        opened={open}
        onClose={onClose}
        size={isMobile ? '90dvh' : '70%'}
        withCloseButton={false}
        position={isMobile ? 'bottom' : 'right'}
        styles={{
          content: {
            background: getConditionalColor(colorScheme, 'gray-1', 'dark-8'),
          },
          body: { padding: 0 },
          title: {
            fontWeight: 600,
          },
        }}>
        <ScrollArea
          p={isMobile ? 10 : 18}
          style={
            {
              height: isMobile ? '90dvh' : '100vh',
              '--scrollarea-scrollbar-size': '0.25rem',
            } as React.CSSProperties
          }>
          <LoadingOverlay visible={isLoading} />

          <div className='flex flex-col gap-4'>
            <p className='text-base font-bold'>Settlement Details</p>

            <div className='flex flex-col text-sm'>
              <span>
                Total transaction amount:
                <span className='font-bold ml-2'>
                  {formatCurrency(allData?.settlement?.total_paid || 0)}
                </span>
                <br />
                Total received amount:
                <span className='font-bold ml-2'>
                  {formatCurrency(
                    (allData?.settlement?.total_paid || 0) -
                      (allData?.settlement?.total_service_charge || 0),
                  )}
                </span>
              </span>
            </div>
          </div>

          <DataTable
            borderRadius='sm'
            records={allData?.transactions || []}
            columns={[
              {
                accessor: 'order.customer_full_name',
                title: 'Customer',
                sortable: false,
                render: (el: any, i) => (
                  <>
                    <Text fz={14}>{el?.order?.customer_full_name}</Text>
                    <Text c='blue' fz={11}>
                      {el?.order?.customer_phone_number}
                    </Text>
                  </>
                ),
              },
              {
                accessor: 'amount',
                render: (record: Transaction) => (
                  <>
                    <Text>{formatCurrency(record.amount)}</Text>
                    <Text>{formatCurrency(record.service_charge || 0)}</Text>
                  </>
                ),
                title: 'Prices',
              },
              {
                accessor: 'order_number',
                render: (record: Transaction) => (
                  <Text>{record?.order?.order_number || '-'}</Text>
                ),
                title: 'Order Number',
              },
              {
                accessor: 'amount',
                render: (record: Transaction) => (
                  <>
                    <Text>
                      {formatCurrency(
                        record.amount - (record.service_charge || 0),
                      )}
                    </Text>
                  </>
                ),
                title: 'Settlement Amount',
              },
              {
                accessor: 'wallet_referance_code',
                render: (record: Transaction) => (
                  <Text>{record.wallet_referance_code}</Text>
                ),
                title: 'Reference Code',
              },
              {
                accessor: 'status',
                render: (record: Transaction) => (
                  <Badge>
                    {statusConstantInverse.transaction_status[record.status]}
                  </Badge>
                ),
              },
              {
                accessor: 'payment_method',
                render: (record: Transaction) => (
                  <Badge>
                    {
                      statusConstantInverse.payment_methods[
                        record.payment_method
                      ]
                    }
                  </Badge>
                ),
              },
              {
                accessor: 'created_at',
                render: (record: Transaction) => (
                  <Text>
                    {dayjs(record.created_at).format(
                      generalConstants.date_format.full_readable,
                    )}
                  </Text>
                ),
                title: 'Created',
              },
            ]}
            fetching={isLoading}
            highlightOnHover
            idAccessor='_id'
            minHeight={!allData?.transactions?.length ? 220 : 0}
            mt='md'
            onRowClick={(rowData) => {}}
            selectedRecords={allData?.transactions || []}
            styles={{
              pagination: {
                background:
                  colorScheme === 'light' ? '#fff' : theme.colors.dark[7],
              },
            }}
            withTableBorder
          />
        </ScrollArea>
      </Drawer>
    </>
  );
}
