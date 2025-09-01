import KSlidingTabs from '@components/KSlidingTabs';
import generalConstants from '@constants/general';
import { statusConstant, statusConstantInverse } from '@constants/status';
import OrderDetailDrawer from '@features/orders/OrderDetailDrawer';
import { formatCurrency } from '@helpers/general.helper';
import notify from '@helpers/notification.helper';
import useDataTable from '@hooks/useDataTable';
import { Badge, Box, Text, Title } from '@mantine/core';
import dayjs from 'dayjs';
import { snakeCase } from 'lodash';
import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import storeService from 'src/services/store.service';
import SettlementDetailDrawer from './SettlementDetailDrawer';

export default function Transactions() {
  const [selectedOrder, setSelectedOrder] = useState<string>('');
  const [selectedSettlement, setSelectedSettlement] = useState<string>('');

  const [allData, setAllData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [status, setStatus] = useState<number>(
    statusConstant.transaction_status.RECEIVED,
  );

  const { page, setPage, PAGE_SIZE, records } = useDataTable(
    allData?.transactions || [],
    50,
  );

  const fetchData = async (s: number, page: number = 1) => {
    setLoading(true);
    try {
      if (s !== statusConstant.transaction_status.SETTLED) {
        const res = await storeService.getMyTransactions({
          status: s,
          page: page - 1,
        });
        setAllData(res);
      } else {
        const res = await storeService.getSettlementHistory({ page: page - 1 });

        setAllData(res);
      }
    } catch (err) {
      notify.genericError('Error', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(status, page);
  }, [status, page]);

  const isSettledTab = status === statusConstant.transaction_status.SETTLED;

  return (
    <div style={{ position: 'relative' }}>
      <Title mb={8} order={4}>
        Transactions ({allData?.transactions?.length})
      </Title>

      {/* Last Few Orders */}
      <KSlidingTabs
        links={['Received', 'Settled']}
        onChange={(val) => {
          const _format = snakeCase(val).toUpperCase();
          // @ts-ignore
          const _val = statusConstant.transaction_status[_format];
          setStatus(_val);
          setPage(1);
        }}
      />

      {!isSettledTab && (
        <Box mt='md'>
          <Text fz={14}>
            Transaction Amount:{' '}
            <Text fw={700} component='span' c='custom'>
              {formatCurrency(allData?.total?.a)}
            </Text>
            <br /> Settlement Amount:{' '}
            <Text fw={700} component='span' c='custom'>
              {formatCurrency(allData?.total?.a - allData?.total?.sc)}
            </Text>
          </Text>
        </Box>
      )}

      {!isSettledTab && (
        <DataTable
          mt='md'
          withTableBorder
          borderRadius='sm'
          highlightOnHover
          records={records}
          fetching={loading}
          minHeight={!allData?.transactions?.length ? 220 : 0}
          // pagination
          totalRecords={allData?.total?.c || 0}
          recordsPerPage={PAGE_SIZE}
          page={page}
          onPageChange={(p) => setPage(p)}
          // sorting
          // sortStatus={sortStatus}
          // onSortStatusChange={(e) => {
          //   setSortStatus(e);
          // }}
          //
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
              sortable: false,
              title: 'Prices',
              render: (el: any, i) => (
                <>
                  <Text fz={13}>{formatCurrency(el?.amount)}</Text>
                  <Text fz={12} c='red'>
                    ({formatCurrency(el?.service_charge || 0)})
                  </Text>
                </>
              ),
            },
            {
              accessor: 'settlement',
              sortable: false,
              title: 'Settlement With',
              render: (el: any, i) => (
                <>
                  <Badge variant='light'>
                    {statusConstantInverse.transaction_with[el.with]}
                  </Badge>
                </>
              ),
            },
            {
              accessor: 'settlement_amount',
              sortable: false,
              title: 'Settlement Amount',
              render: (el: any, i) => (
                <>
                  <Text c='custom' fz={13}>
                    {formatCurrency(el?.amount - (el?.service_charge || 0))}
                  </Text>
                </>
              ),
            },
            {
              accessor: 'order_number',
              render: (el: any) => <Text>{el?.order?.order_number}</Text>,
              title: 'Order Number',
            },
            {
              accessor: 'wallet_referance_code',
              sortable: false,
              title: 'Reference Code',
              render: (el: any, i) => (
                <Text fz={14}>{el?.wallet_referance_code}</Text>
              ),
            },
            {
              accessor: 'payment_method',
              sortable: false,
              render: (el: any, i) => (
                <Badge variant='light'>
                  {statusConstantInverse.payment_methods[el?.payment_method]}
                </Badge>
              ),
            },
            {
              accessor: 'created_at',
              title: 'Created',
              sortable: false,
              render: (el: any, i) => (
                <Text fz={13}>
                  {dayjs(el.created_at).format(
                    generalConstants.date_format.full_readable,
                  )}
                </Text>
              ),
            },
          ]}
          onRowClick={({ record }) => {
            setSelectedOrder(record?.order?._id);
          }}
          idAccessor='_id'
        />
      )}

      {isSettledTab && (
        <DataTable
          mt='md'
          withTableBorder
          borderRadius='sm'
          highlightOnHover
          records={records}
          fetching={loading}
          minHeight={!allData?.transactions?.length ? 220 : 0}
          // pagination
          totalRecords={allData?.meta?.total || 0}
          recordsPerPage={PAGE_SIZE}
          page={page}
          onPageChange={(p) => setPage(p)}
          // sorting
          // sortStatus={sortStatus}
          // onSortStatusChange={(e) => {
          //   setSortStatus(e);
          // }}
          //
          columns={[
            {
              accessor: 'total_paid',
              sortable: false,
              title: 'Total Amount & Charges',
              render: (el: any, i) => (
                <>
                  <Text fz={13}>{formatCurrency(el?.total_paid)}</Text>
                  <Text fz={12} c='red'>
                    ({formatCurrency(el?.total_service_charge || 0)})
                  </Text>
                </>
              ),
            },
            {
              accessor: 'total_paid',
              sortable: false,
              title: 'Settled Amount',
              render: (el: any, i) => (
                <Text fz={13}>
                  {formatCurrency(el?.total_paid - el?.total_service_charge)}
                </Text>
              ),
            },

            {
              accessor: 'total_transactions',
              sortable: false,
              title: 'Transaction Count',
              render: (el: any, i) => (
                <>
                  <Text c='custom' fz={13}>
                    {el?.total_transactions}
                  </Text>
                </>
              ),
            },
            {
              accessor: 'settlement_id',
              sortable: false,
              title: 'Settelemnt Idetifier',
              render: (el: any, i) => <Text fz={14}>{el?.settlement_id}</Text>,
            },
            {
              accessor: 'created_at',
              sortable: false,
              title: 'Setteled At',
              render: (el: any, i) => (
                <Text fz={13}>
                  {dayjs(el.created_at).format(
                    generalConstants.date_format.full_readable,
                  )}
                </Text>
              ),
            },
          ]}
          onRowClick={({ record }) => {
            setSelectedSettlement(record?._id);
          }}
          idAccessor='_id'
        />
      )}

      <OrderDetailDrawer
        open={!!selectedOrder}
        onClose={() => setSelectedOrder('')}
        order_id={selectedOrder}
        onRefresh={() => {}}
      />

      <SettlementDetailDrawer
        open={!!selectedSettlement}
        onClose={() => setSelectedSettlement('')}
        settlement_id={selectedSettlement}
        onRefresh={() => {}}
      />
    </div>
  );
}
