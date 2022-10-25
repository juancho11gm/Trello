import React, { ReactElement } from 'react';
import { CardContainer } from '../../Utils/Styles';

interface CardProps {
  text: string;
  innerRef: (element?: HTMLElement | null) => any;
}

export const Card = ({ text, innerRef, ...dragProps }: CardProps): ReactElement => {
  return (
    <CardContainer ref={innerRef} {...dragProps}>
      {text}
    </CardContainer>
  );
};
