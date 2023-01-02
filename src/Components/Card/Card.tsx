import { ReactElement } from 'react';
import { CardContainer } from '@styles/styles';

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
