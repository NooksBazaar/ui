import React from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.svg';
import { List, ListItem, ListItemIcon, ListItemText, SvgIcon } from '@material-ui/core';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';

const NAVIGATION_WIDTH = 19;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas: 'nav' 'content';
  height: 100%;

  ${({ theme }) => theme.breakpoints.up('md')} {
    min-height: 100vh;
    grid-template-columns: ${({ theme }) => theme.spacing(NAVIGATION_WIDTH)}px 1fr;
    grid-template-areas: 'nav content';
  }
`;

const Content = styled.div`
  position: relative;
  grid-area: content;
  padding: ${({ theme }) => theme.spacing(2)}px;
`;

const Navigation = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.palette.background.paper};
  grid-area: nav;
  z-index: 1;
  padding-top: ${({ theme }) => theme.spacing(2)}px;
  padding-bottom: ${({ theme }) => theme.spacing(2)}px;
  box-shadow: ${({ theme }) => theme.shadows[2]};

  ${({ theme }) => theme.breakpoints.up('md')} {
    position: fixed;
    top: 0;
    width: ${({ theme }) => theme.spacing(NAVIGATION_WIDTH)}px;
    height: 100vh;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  padding-bottom: ${({ theme }) => theme.spacing(2)}px;
`;

const Logo = styled.img`
  max-height: ${({ theme }) => theme.spacing(5)}px;
`;

export interface ShellProps {
  children: React.ReactNode;
}

export function Shell({ children }: ShellProps) {
  const router = useRouter();
  const { t } = useTranslation('common');

  return (
    <Layout>
      <Navigation>
        <LogoContainer>
          <Logo src={logo} alt={t('logo.alt', `Nook's Bazaar Logo`)}/>
        </LogoContainer>

        <List component="nav" aria-label="site navbar">
          <Link href="/">
            <ListItem
              button
              selected={router.pathname === '/'}
            >
              <ListItemIcon>
                <SvgIcon>
                  <FontAwesomeIcon icon={['fas', 'home']} />
                </SvgIcon>
              </ListItemIcon>
              <ListItemText primary={t('page.home', 'Home')} />
            </ListItem>
          </Link>
          <Link href="/items">
            <ListItem
              button
              selected={router.pathname === '/items'}
            >
              <ListItemIcon>
                <SvgIcon>
                  <FontAwesomeIcon icon={['fas', 'blender-phone']} />
                </SvgIcon>
              </ListItemIcon>
              <ListItemText primary={t('page.items', 'Items')} />
            </ListItem>
          </Link>
        </List>
      </Navigation>
      <Content>{children}</Content>
    </Layout>
  );
}
