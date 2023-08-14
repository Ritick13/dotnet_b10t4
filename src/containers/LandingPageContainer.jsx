import React, { useState } from 'react';
import {
  AppShell,
  useMantineTheme, ScrollArea
} from '@mantine/core';
import { HeaderNav } from '../components/Header';
import { TopLanding } from '../components/Landing/TopLanding';
import { FeaturesGrid } from '../components/Landing/Features';
import { Faq } from '../components/Landing/FAQ';

export function LandingPageContainer() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[1]
        }
      }}
      header={
        <HeaderNav opened={opened} setOpened={setOpened} />
      }
    >
      <ScrollArea style={{ height: window.innerHeight - 120 }}>
        <TopLanding />
        <FeaturesGrid />
        <Faq />
      </ScrollArea>
    </AppShell>
  );
}
