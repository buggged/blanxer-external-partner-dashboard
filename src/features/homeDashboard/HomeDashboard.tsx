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
import { badgeStatusColor } from '@constants/color';
import QrRequestDetailDrawer from './QrRequestDetailDrawer';

export default function HomeDashboard() {
  const [loading, setLoading] = useState<boolean>(false);
  const [tab, setTab] = useState<string>('Pending');
  const [requests, setRequests] = useState<any[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);

  const PAGE_SIZE = 20;

  const fetchQrRequestData = async () => {
    try {
      setLoading(true);
      const response = await dashboardService.getDashboard(tab.toLowerCase());
      setRequests(response.stores);
    } catch (err) {
      notify.genericError('Error', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQrRequestData();
  }, [tab]);

  const onClose = () => {
    setSelectedRequest(null);
  };

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
            title: 'Name',
            sortable: false,
            render: (el: any) => (
              <>
                <Text fz={14}>{el?.kyc?.name}</Text>
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
                color={badgeStatusColor[el.addons?.qr_request]}>
                {el.addons?.qr_request || 'N/A'}
              </Badge>
            ),
          },
          {
            accessor: 'pan',
            title: 'PAN',
            sortable: false,
            render: (el: any) => <Text fz={14}>{el?.kyc?.pan}</Text>,
          },
          {
            accessor: 'bank_name',
            title: 'Bank Name',
            sortable: false,
            render: (el: any) => <Text fz={14}>{el?.kyc?.bank_name}</Text>,
          },
          {
            accessor: 'account_number',
            title: 'Account Number',
            sortable: false,
            render: (el: any) => <Text fz={14}>{el?.kyc?.account_number}</Text>,
          },
          {
            accessor: 'phone',
            title: 'Phone Number',
            sortable: false,
            render: (el: any) => <Text fz={14}>{el?.kyc?.phone}</Text>,
          },
          {
            accessor: 'bank_branch',
            title: 'Bank Branch',
            sortable: false,
            render: (el: any) => <Text fz={14}>{el?.kyc?.bank_branch}</Text>,
          },
          {
            accessor: 'address',
            title: 'Address',
            sortable: false,
            render: (el: any) => <Text fz={14}>{el?.kyc?.address}</Text>,
          },
        ]}
        onRowClick={({ record }) => {
          setSelectedRequest(record);
        }}
        idAccessor='_id'
      />
      <QrRequestDetailDrawer
        open={!!selectedRequest}
        onClose={() => onClose()}
        store={selectedRequest}
        onRefresh={() => fetchQrRequestData()}
      />
    </div>
  );
}
