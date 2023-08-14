import React, { useState, useEffect } from 'react';
import {
  createStyles, Navbar, UnstyledButton,
  ActionIcon,
  useMantineColorScheme, Center, getStylesRef, rem
  // Transition
} from '@mantine/core';
import {
  IconLogout,
  IconSun, IconMoonStars
} from '@tabler/icons-react';
import {
  Link, useLocation
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../../hooks/useAuth';
import { navLinks } from '../../routes/navLinks';
import { UserInfo } from './UserInfo';
// import { languages } from '../../utils/lng';

const useStyles = createStyles((theme) => ({
  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
    }`
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
    }`
  },

  link: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,

      [`& .${getStylesRef('icon')}`]: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black
      }
    }
  },

  linkIcon: {
    ref: getStylesRef('icon'),
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
    marginRight: theme.spacing.sm
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
      [`& .${getStylesRef('icon')}`]: {
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color
      }
    }
  }
}));

export function NavBar({ opened, setOpened }) {
  const location = useLocation();
  const { classes, cx } = useStyles();
  const [active, setActive] = useState('/home');

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const {
    logout,
    user
  } = useAuth();

  // const [language, setLanguage] = useState('English');

  // const magicTranslate = (lng) => {
  //   if (lng === language) return;
  //   setLanguage(lng);

  //   const googleTranslateIframes = document.querySelectorAll('iframe.skiptranslate');
  //   let googleTranslateIframe = null;
  //   if (lng !== 'English') {
  //     for (let i = 0; i < googleTranslateIframes.length; i += 1) {
  //       if (googleTranslateIframes[i].contentWindow.document.body.innerHTML.includes(lng)) {
  //         googleTranslateIframe = googleTranslateIframes[i];
  //         break;
  //       }
  //     }
  //     const iframeWindow = googleTranslateIframe.contentWindow.document;
  //     const spans = iframeWindow.getElementsByTagName('span');
  //     for (let i = 0; i < spans.length; i += 1) {
  //       if (spans[i].innerHTML === lng) {
  //         spans[i].click();
  //         break;
  //       }
  //     }
  //   } else {
  //     for (let i = 0; i < googleTranslateIframes.length; i += 1) {
  //
  // if (googleTranslateIframes[i].contentWindow.document.bod
  // y.innerHTML.includes('Show original')) {
  //         googleTranslateIframe = googleTranslateIframes[i];
  //         break;
  //       }
  //     }
  //     const iframeWindow = googleTranslateIframe.contentWindow.document;
  //     const buttons = iframeWindow.getElementsByTagName('button');
  //     for (let i = 0; i < buttons.length; i += 1) {
  //       if (buttons[i].innerHTML === 'Show original') {
  //         buttons[i].click();
  //         break;
  //       }
  //     }
  //   }

  //   googleTranslateIframe = document.querySelector('iframe.skiptranslate');
  //   googleTranslateIframe.style.display = 'none';
  // };

  useEffect(() => {
    setActive(location.pathname);
  }, [location]);

  const links = navLinks.map((item) => (
  // const links = navLinks.map((item) => (
    <Link
      className={cx(classes.link, { [classes.linkActive]: (active.includes(item.link) && item.link !== '/home') || item.link === active })}
      to={item.link}
      key={item.label}
      onClick={() => {
        setOpened(false);
        setActive(item.link);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label.toUpperCase()}</span>
    </Link>
  ));

  return (
    // <Transition duration={200} mounted={opened} transition="fade" timingFunction="ease">
    //   {(styles) => (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 260 }}
      style={{ zIndex: 2 }}
    >
      <Navbar.Section grow>
        {links}
      </Navbar.Section>
      {opened && (
        <Center>
          <ActionIcon
            onClick={() => toggleColorScheme()}
            size="lg"
            sx={(theme) => ({
              backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
              color: theme.colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors.blue[6]
            })}
          >
            {colorScheme !== 'dark' ? <IconSun size={18} /> : <IconMoonStars size={18} />}
          </ActionIcon>
        </Center>
      )}

      {/* <Select
        style={{ marginTop: 20, zIndex: 2 }}
        data={languages.map((item) => ({
          value: item.name,
          label: item.nativeName
        }))}
        placeholder="Pick one"
        label="Select Language"
        className="notranslate"
        classNames={classes}
        onChange={(value) => {
          magicTranslate(value);
        }}
        value={language}
      /> */}

      <Navbar.Section className={classes.footer}>
        {user
         && <UserInfo name={user.name} role={user.role} dept={user.dept} />}
        <UnstyledButton className={classes.link} onClick={logout}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </UnstyledButton>
      </Navbar.Section>
    </Navbar>
    //   )}
    // </Transition>
  );
}

NavBar.propTypes = {
  opened: PropTypes.bool.isRequired,
  setOpened: PropTypes.func.isRequired
};
