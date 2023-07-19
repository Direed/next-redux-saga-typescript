import { Typography } from 'antd';

import { Header, ToastText, Wrapper } from 'components/common';

import { terms, privacy } from './termsPageHelpers';
import {useRouter} from "next/router";

const { Title } = Typography;

interface ITermsPageRule {
  title: string;
  children: ITermsPageRuleChild[];
}

interface ITermsPageRuleChild {
  subtitle?: string;
  text: string
}

export const TermsPage = () => {
  const router = useRouter();
  const rules = router.pathname.includes('privacy') ? privacy : terms;

  return (
    <Wrapper>
      <Header
        title='Rules and Complience'
        leftOnClick={router.back}
      />
      {rules.map((term: ITermsPageRule) => (
        <div key={term.title}>
          <Title
            level={3}
            style={{ marginBottom: 30 }}
          >
            {term.title}
          </Title>
          {term.children.map(({ subtitle, text }: ITermsPageRuleChild) => (
            <div key={text}>
              {subtitle && (
                <Title level={4}
                  style={{
                    fontWeight: 'normal',
                    marginBottom: 20,
                  }}
                >
                  {subtitle}
                </Title>
              )}
              <ToastText
                text={text}
                textAlign='left'
                margin='0 0 15px 0'
              />
            </div>
          ))}
        </div>
      ))}
    </Wrapper>
  );
};