import { CheckOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';

import { ToastButton } from 'components/AntdComponents';
import { Header, ToastText, Wrapper } from 'components/common';

interface IChainReminders {
  setReminders: (status: boolean) => void;
  slectedReminders: number[];
  setSlectedReminders: (prevState: number[]) => void;
}

const reminder = [{
  id: 1,
  title: 'Every Day',
}, {
  id: 2,
  title: 'Every Saturday',
}, {
  id: 3,
  title: '2 Weeks Before the Deadline',
}, {
  id: 4,
  title: '8 Hours Before the Deadline',
}];

export const ChainReminders = ({
  setReminders,
  setSlectedReminders,
  slectedReminders,
}: IChainReminders) => {

  const toggleReminder = (id: number) => {
    const reminderExist = slectedReminders.find(remId => remId === id);

    if(reminderExist) {
      setSlectedReminders(slectedReminders.filter(remId => remId !== id));
    } else {
      setSlectedReminders([...slectedReminders, id]);
    }
  };

  return (
    <Wrapper>
      <Header leftOnClick={() => setReminders(false)} title='End Date Reminders' />
      <Row style={{ marginBottom: 30 }}>
        <ToastText
          fontSize={13}
          textAlign='left'
          text="Select when and how often you want to notify a person who hasn't sent his video yet"
        />
      </Row>
      {reminder.map(rem => (
        <Row key={rem.id} style={{ marginBottom: 20 }} align='middle' justify='space-between'>
          <Col flex={1}>
            <ToastButton
              block
              type='text'
              text={rem.title}
              onClick={() => toggleReminder(rem.id)}
              style={{
                color: 'black',
                fontWeight: 700,
                textAlign: 'left',
              }}
            />
          </Col>
          {slectedReminders.find(remId => remId === rem.id) && <CheckOutlined style={{ fontSize: '24px' }} />}
        </Row>
      ))}
    </Wrapper>
  );
};