import { FC } from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface Props {
  onChange: (value?: string) => void;
}

export const AddressInput: FC<Props> = ({ onChange }) => {
  return <AddressSuggestions token="8d2ee59490fb5818000373392de86ce6e877e189" onChange={(data) => onChange?.(data?.value)} />;
};
