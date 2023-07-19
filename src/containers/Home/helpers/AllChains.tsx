import { Row, Space } from 'antd';

import { ToastButton } from 'components/AntdComponents';
import { PhotoWithInfo } from 'components/common';
import { TCreatedChain } from 'types';

interface IAllChains {
  onClick: (status: boolean) => void;
  onRedirect: (chain: TCreatedChain) => void;
  createdChains: TCreatedChain[];
}

export const AllChains = ({
  createdChains,
  onClick,
  onRedirect,
}: IAllChains) => (
  <>
    <Row justify='space-between' align='middle' style={{ marginBottom: 15 }}>
      <span>Your Video Chains</span>
      <ToastButton
        onClick={() => onClick(true)}
        text='Show all'
        type='link'
        size='small'
      />
    </Row>
    <Row>
      <Space size={10} direction='vertical' style={{ width: '100%' }}>
        {createdChains?.map(chain => (
          <PhotoWithInfo
            key={chain?.chainId}
            text={chain?.recipientName}
            photo={chain?.recipientImg}
            chainInfo={(
              <>
                <span style={{ fontWeight: 600 }}>{chain?.recipientName}&nbsp;</span> Chain
              </>
            )}
            onClick={() => onRedirect(chain)}
            timeLeftProps={{
              deadline: chain?.deadline,
              created: chain?.created,
              finalized: chain?.finalized,
            }}
            displayTimeLeft
          />
        ))}
      </Space>
    </Row>
  </>
);
