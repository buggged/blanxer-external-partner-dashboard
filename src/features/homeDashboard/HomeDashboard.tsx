import KSlidingTabs from '@components/KSlidingTabs';
import { statusConstantInverse } from '@constants/status';
import generalConstants from '@constants/general';
import { formatCurrency } from '@helpers/general.helper';
import notify from '@helpers/notification.helper';
import { Badge, Button, Text } from '@mantine/core';
import dashboardService from '@services/dashboard.service';
import { DataTable } from 'mantine-datatable';
import { use, useEffect, useState } from 'react';
import dayjs from 'dayjs';

export default function HomeDashboard() {
  const [loading, setLoading] = useState<boolean>(false);
  const [tab, setTab] = useState<string>('Pending');
  const [requests, setRequests] = useState<any>(null);
  const [selectedOrder, setSelectedOrder] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  const PAGE_SIZE = 20;

  const fetchQrRequestData = async () => {
    try {
      const response = await dashboardService.getDashboard(tab.toLowerCase());
      console.log('the requests are : ', response);
      setRequests(response.stores);
    } catch (err) {
      notify.genericError('Error', err);
    }
  };

  useEffect(() => {
    fetchQrRequestData();
  }, [tab]);

  return (
    <div>
      <KSlidingTabs
        links={['Pending', 'Approved', 'Rejected']}
        onChange={setTab}
      />

      <DataTable
        mt='md'
        withTableBorder
        borderRadius='sm'
        highlightOnHover
        records={requests}
        fetching={loading}
        minHeight={!requests?.length ? 220 : 0}
        // pagination
        totalRecords={requests.length || 0}
        recordsPerPage={PAGE_SIZE}
        page={page}
        onPageChange={(p) => setPage(p)}
        columns={[
          {
            accessor: 'name',
            title: 'Store Name',
            sortable: false,
            render: (el: any) => (
              <>
                <Text fz={14}>{el?.name}</Text>
                <Text c='blue' fz={11}>
                  {el?.phone_number}
                </Text>
              </>
            ),
          },
          {
            accessor: 'kyc_status',
            title: 'KYC Status',
            sortable: false,
            render: (el: any) => (
              <Badge
                variant='light'
                color={
                  el.kyc_status === 'pending'
                    ? 'orange'
                    : el.kyc_status === 'approved'
                    ? 'green'
                    : 'red'
                }>
                {el.kyc_status}
              </Badge>
            ),
          },
          {
            accessor: 'qr_request',
            title: 'QR Request',
            sortable: false,
            render: (el: any) => (
              <Badge
                variant='light'
                color={el.addons?.qr_request === 'pending' ? 'orange' : 'gray'}>
                {el.addons?.qr_request || 'N/A'}
              </Badge>
            ),
          },
          {
            accessor: 'sub_domain',
            title: 'Domain',
            sortable: false,
            render: (el: any) => (
              <>
                <Text fz={13}>{el?.sub_domain}.blanxer.com</Text>
                {el?.custom_domain && (
                  <Text c='dimmed' fz={11}>
                    {el.custom_domain}
                  </Text>
                )}
              </>
            ),
          },
          {
            accessor: 'plan',
            title: 'Plan',
            sortable: false,
            render: (el: any) => (
              <Badge variant='outline' color='blue'>
                {el?.plan}
              </Badge>
            ),
          },
        ]}
        onRowClick={({ record }) => {
          setSelectedOrder(record?._id);
        }}
        idAccessor='_id'
      />
    </div>
  );
}
