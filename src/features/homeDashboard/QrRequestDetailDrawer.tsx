import {
  ActionIcon,
  Badge,
  Box,
  Button,
  ButtonGroup,
  Drawer,
  Group,
  LoadingOverlay,
  ScrollArea,
  Text,
  TextInput,
  Title,
  useMantineColorScheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { getConditionalColor } from '@helpers/general.helper';
import { IconArrowRight, IconEdit, IconPrinter } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { badgeStatusColor } from '@constants/color';
import { useState } from 'react';
import QrRequestStatusEdit from './QrRequestStatusEdit';

const rowWidth = 155;

export default function QrRequestDetailDrawer({
  open,
  onClose,
  store,
  onRefresh,
  onCommentSuccess,
  readOnly = false,
  isPos = false,
}: any) {
  const isMobile = useMediaQuery('(max-width: 767px)', false);
  const { colorScheme } = useMantineColorScheme();
  const [requestShowEdit, setRequestShowEdit] = useState<boolean>(false);

  const kyc_form = useForm();

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
          style={{
            height: isMobile ? '90dvh' : '100vh',
            '--scrollarea-scrollbar-size': '0.25rem',
          }}>
          {/* <LoadingOverlay visible={loading} /> */}
          <Box p='md'>
            <Group justify='space-between'>
              <Group justify='space-between'>
                <Text component='span' fw={700} fz={28}>
                  QR Request Details of {store?.name}
                </Text>
              </Group>
              <Group>
                <ActionIcon onClick={onClose}>
                  <IconArrowRight />
                </ActionIcon>
              </Group>
            </Group>
            <div className='left k-box mt-4'>
              <Group justify='space-between' align='center'>
                <Text fw={700} fz={18}>
                  Store Details
                </Text>
              </Group>

              <Box>
                <Group style={{ marginTop: 16 }}>
                  <Text style={{ width: rowWidth }} fw={600}>
                    Name:
                  </Text>
                  <Text fz='sm'>{store?.name}</Text>
                </Group>

                <Group mt={8}>
                  <Text style={{ width: rowWidth }} fw={600}>
                    Phone Number:
                  </Text>
                  <Text fz='sm'>{store?.phone_number}</Text>
                </Group>

                <Group mt={8}>
                  <Text style={{ width: rowWidth }} fw={600}>
                    KYC Status:
                  </Text>
                  <Badge
                    size='md'
                    variant='light'
                    color={badgeStatusColor[store?.kyc_status]}>
                    {store?.kyc_status || 'N/A'}
                  </Badge>
                </Group>
                <Group mt={8}>
                  <Text style={{ width: rowWidth }} fw={600}>
                    Plan:
                  </Text>
                  <Text fz='sm'>{store?.plan.toUpperCase()}</Text>
                </Group>
                <Group mt={8}>
                  <Text style={{ width: rowWidth }} fw={600}>
                    QR Request:
                  </Text>
                  <Badge
                    variant='light'
                    color={badgeStatusColor[store?.addons?.qr_request]}>
                    {store?.addons?.qr_request || 'N/A'}
                  </Badge>

                  {/* <ActionIcon onClick={() => setRequestShowEdit(true)}>
                    <IconEdit size={18} />
                  </ActionIcon> */}
                  {store?.addons?.qr_request === 'pending' && (
                    <Group>
                      <Button
                        variant='filled'
                        color='green'
                        onClick={() => setRequestShowEdit(true)}>
                        Accept
                      </Button>
                      <Button
                        variant='outline'
                        color='red'
                        onClick={() => {
                          //TODO => call reject api
                        }}>
                        Reject
                      </Button>
                    </Group>
                  )}
                </Group>
              </Box>
            </div>
            <form onSubmit={kyc_form.onSubmit(() => {})}>
              <Box mt='xs' className='k-box'>
                <Title order={5}>KYC Information</Title>

                <div className='grid gap-6 gap-y-3 grid-cols-2'>
                  <TextInput
                    label='Registered Business Name'
                    readOnly={true}
                    placeholder='eg: Blanxer Technology Pvt. Ltd.'
                    value={store?.kyc?.name}
                  />
                  <TextInput
                    label='Registered Address'
                    readOnly={true}
                    placeholder='eg: Lokanthali - 4, Bhaktapur'
                    value={store?.kyc?.address}
                  />
                  <TextInput
                    label='Business Phone Number'
                    readOnly={true}
                    placeholder='eg: +9779800000000'
                    value={store?.kyc?.phone}
                  />
                  <TextInput
                    label='PAN Number'
                    readOnly={true}
                    placeholder='eg: 123456789'
                    value={store?.kyc?.pan}
                  />

                  <TextInput
                    label='Bank Name (Business Account)'
                    readOnly={true}
                    placeholder='eg: NIC ASIA BANK'
                    value={store?.kyc?.bank_name}
                  />

                  <TextInput
                    label='Account Number (Business Account)'
                    readOnly={true}
                    placeholder='eg: 123456789'
                    value={store?.kyc?.account_number}
                  />

                  <TextInput
                    label='Bank Account Name (Business Account)'
                    readOnly={true}
                    placeholder='eg: Blanxer Technology Pvt. Ltd.'
                    value={store?.kyc?.account_name}
                  />

                  <TextInput
                    label='Bank Account Branch'
                    readOnly={true}
                    placeholder='eg: Thapathali, Kathmandu'
                    value={store?.kyc?.bank_branch}
                  />
                </div>
                <Group>
                  <Box mt='md'>
                    <Text fz={14} fw={500}>
                      Registration Documents
                    </Text>

                    <Box mt={12}>
                      {store?.kyc?.registration_photos?.map((el: string) => (
                        <Box
                          key={el}
                          style={{
                            position: 'relative',
                            display: 'inline-block',
                          }}>
                          <a
                            href={el}
                            rel='noopener noreferrer'
                            target='_blank'>
                            <img
                              style={{
                                width: 300,
                                height: 300,
                                objectFit: 'cover',
                                borderRadius: 8,
                                marginRight: 12,
                                marginBottom: 12,
                              }}
                              alt=''
                              src={el}
                            />
                          </a>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Group>
              </Box>
            </form>
          </Box>
        </ScrollArea>
      </Drawer>
      <QrRequestStatusEdit
        open={requestShowEdit}
        onClose={(val?: any) => {
          setRequestShowEdit(false);
        }}
        store={store}
      />
    </>
  );
}
