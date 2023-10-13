'use client';

import { Provider } from 'react-redux';
import { globalStore } from '../store/globalStore';

export default function GlobalProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={globalStore}>{children}</Provider>;
}
