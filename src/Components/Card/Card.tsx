import React from 'react';
import { CardContainer } from '../../Utils/Styles';

interface CardProps {
    text: string
}

export const Card = ({ text }: CardProps) => {
    return <CardContainer>{text}</CardContainer>;  
};