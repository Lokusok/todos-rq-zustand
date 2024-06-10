import style from './style.module.scss';

import React, { memo } from 'react';

import SectionTitle from './section-title';
import SectionContent from './section-content';
import SectionFooter from './section-footer';

type TProps = {
  children: React.ReactNode;
};

function Section({ children }: TProps) {
  return <section className={style.root}>{children}</section>;
}

export default {
  Root: memo(Section),
  Title: memo(SectionTitle),
  Content: memo(SectionContent),
  Footer: memo(SectionFooter),
};
