import KSlidingTabs from '@components/KSlidingTabs';
import { statusConstantInverse } from '@constants/status';
import generalConstants from '@constants/general';
import { formatCurrency } from '@helpers/general.helper';
import notify from '@helpers/notification.helper';
import { Badge, Text } from '@mantine/core';
import dashboardService from '@services/dashboard.service';
import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

export default function HomeDashboard() {
  const [loading, setLoading] = useState<boolean>(false);
  const [tab, setTab] = useState<string>('Pending');
  const [requests, setRequests] = useState<any>(null);
  const [selectedOrder, setSelectedOrder] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  // Constants
  const PAGE_SIZE = 20;

  // Mock data for testing
  const mockRequests = [
    {
      _id: '1',
      customer_name: 'Ram Bahadur',
      status: 'Pending',
      phone_number: '+977-9841234567',
      address: 'Kathmandu, Nepal',
      created_at: '2024-01-15T10:30:00Z',
    },
    {
      _id: '2',
      customer_name: 'Sita Sharma',
      status: 'Pending',
      phone_number: '+977-9851234567',
      address: 'Pokhara, Nepal',
      created_at: '2024-01-16T14:20:00Z',
    },
    {
      _id: '3',
      customer_name: 'Hari Thapa',
      status: 'Approved',
      phone_number: '+977-9861234567',
      address: 'Lalitpur, Nepal',
      created_at: '2024-01-17T09:15:00Z',
    },
    {
      _id: '4',
      customer_name: 'Maya Gurung',
      status: 'Rejected',
      phone_number: '+977-9871234567',
      address: 'Chitwan, Nepal',
      created_at: '2024-01-18T11:45:00Z',
    },
    {
      _id: '5',
      customer_name: 'Krishna Shrestha',
      status: 'Pending',
      phone_number: '+977-9881234567',
      address: 'Bhaktapur, Nepal',
      created_at: '2024-01-19T16:30:00Z',
    },
    {
      _id: '6',
      customer_name: 'Gita Pradhan',
      status: 'Approved',
      phone_number: '+977-9891234567',
      address: 'Biratnagar, Nepal',
      created_at: '2024-01-20T08:15:00Z',
    },
    {
      _id: '7',
      customer_name: 'Rajesh Tamang',
      status: 'Pending',
      phone_number: '+977-9801234567',
      address: 'Dharan, Nepal',
      created_at: '2024-01-21T13:20:00Z',
    },
    {
      _id: '8',
      customer_name: 'Kamala Rai',
      status: 'Approved',
      phone_number: '+977-9811234567',
      address: 'Janakpur, Nepal',
      created_at: '2024-01-22T10:00:00Z',
    },
    {
      _id: '9',
      customer_name: 'Binod Magar',
      status: 'Rejected',
      phone_number: '+977-9821234567',
      address: 'Butwal, Nepal',
      created_at: '2024-01-23T15:45:00Z',
    },
    {
      _id: '10',
      customer_name: 'Sunita Limbu',
      status: 'Pending',
      phone_number: '+977-9831234567',
      address: 'Hetauda, Nepal',
      created_at: '2024-01-24T12:30:00Z',
    },
  ];

  const mockData = {
    requests: mockRequests,
    total: {
      count: mockRequests.length,
      pending: mockRequests.filter(r => r.status === 'Pending').length,
      approved: mockRequests.filter(r => r.status === 'Approved').length,
      rejected: mockRequests.filter(r => r.status === 'Rejected').length,
    },
  };

  // Use mock data instead of API call for testing
  const allData = mockData;
  
  // Filter records based on selected tab
  const getFilteredRecords = () => {
    if (tab === 'Pending') {
      return allData.requests.filter(r => r.status === 'Pending');
    } else if (tab === 'Approved') {
      return allData.requests.filter(r => r.status === 'Approved');
    } else if (tab === 'Rejected') {
      return allData.requests.filter(r => r.status === 'Rejected');
    }
    return allData.requests;
  };
  
  const records = getFilteredRecords();

  const fetchData = async () => {
    setLoading(true);

    try {
      // For now, using mock data. Uncomment below for real API call
      // const res = await dashboardService.getDashboard();
      // setRequests(res);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setRequests(mockData);
    } catch (err) {
      notify.genericError('Error', err);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        records={records}
        fetching={loading}
        minHeight={!records?.length ? 220 : 0}
        // pagination
        totalRecords={records.length || 0}
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
            accessor: 'customer_name',
            title: 'Customer',
            sortable: false,
            render: (el: any) => (
              <>
                <Text fz={14}>{el?.customer_name}</Text>
                <Text c='blue' fz={11}>
                  {el?.phone_number}
                </Text>
              </>
            ),
          },
          {
            accessor: 'status',
            title: 'Status',
            sortable: false,
            render: (el: any) => (
              <Badge 
                variant='light' 
                color={
                  el.status === 'Pending' ? 'orange' : 
                  el.status === 'Approved' ? 'green' : 'red'
                }
              >
                {el.status}
              </Badge>
            ),
          },
          {
            accessor: 'address',
            title: 'Address',
            sortable: false,
            render: (el: any) => (
              <Text fz={13}>{el?.address}</Text>
            ),
          },
          {
            accessor: 'created_at',
            title: 'Created',
            sortable: false,
            render: (el: any) => (
              <Text fz={13}>
                {dayjs(el.created_at).format(
                  generalConstants.date_format.full_readable,
                )}
              </Text>
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
