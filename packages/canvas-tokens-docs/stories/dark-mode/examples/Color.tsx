import * as React from 'react';
import {system} from '@workday/canvas-tokens-web';
import {Avatar} from '@workday/canvas-kit-react/avatar';
import {Banner} from '@workday/canvas-kit-react/banner';
import {PrimaryButton, SecondaryButton, TertiaryButton} from '@workday/canvas-kit-react/button';
import {Card} from '@workday/canvas-kit-react/card';
import {Box, Flex, Grid} from '@workday/canvas-kit-react/layout';
import {Pill} from '@workday/canvas-kit-react/pill';
import {Switch} from '@workday/canvas-kit-react/switch';
import {Table} from '@workday/canvas-kit-react/table';
import {Tabs} from '@workday/canvas-kit-react/tabs';
import {Heading, Text} from '@workday/canvas-kit-react/text';

const v = (token: string) => `var(${token})`;
const c = system.color;

const stats = [
  {label: 'Open requisitions', value: '128', change: '+12%'},
  {label: 'Time to hire (days)', value: '34', change: '-4%'},
  {label: 'Offer acceptance', value: '86%', change: '+3%'},
];

const people = [
  {name: 'Ava Thompson', role: 'Product Designer', status: 'Active'},
  {name: 'Liam Carter', role: 'Software Engineer', status: 'Onboarding'},
  {name: 'Noah Patel', role: 'Data Analyst', status: 'On leave'},
];

export const DarkMode = () => {
  const [dark, setDark] = React.useState(false);
  const mode = dark ? 'dark' : 'light';

  return (
    // The Sana CSS applies dark values to `[data-theme="sana-canvas"][data-mode="dark"]`
    <Flex
      data-theme="sana-canvas"
      data-color-mode={mode}
      data-mode={mode}
      flexDirection="column"
      gap="m"
      padding="l"
      backgroundColor={v(c.surface.root)}
      color={v(c.fg.root)}
      border={`1px solid ${v(c.border.root)}`}
      borderRadius="l"
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Heading size="medium" as="h3">
          Workforce dashboard
        </Heading>
        <Flex alignItems="center" gap="xs">
          <Text typeLevel="body.medium">Dark mode</Text>
          <Switch checked={dark} onChange={e => setDark(e.currentTarget.checked)} />
          <Avatar name="Raisa Primerova" size="extraSmall" />
        </Flex>
      </Flex>

      <Banner hasError={false}>
        <Banner.Icon />
        <Banner.Label>Payroll runs tomorrow. Review pending changes.</Banner.Label>
        <Banner.ActionText>Review</Banner.ActionText>
      </Banner>

      <Grid gridTemplateColumns="repeat(3, 1fr)" gridGap="m">
        {stats.map(stat => (
          <Card key={stat.label}>
            <Card.Heading>{stat.label}</Card.Heading>
            <Card.Body>
              <Flex alignItems="center" gap="xs">
                <Heading size="large" as="p">
                  {stat.value}
                </Heading>
                <Pill>{stat.change}</Pill>
              </Flex>
            </Card.Body>
          </Card>
        ))}
      </Grid>

      <Tabs>
        <Tabs.List>
          <Tabs.Item>People</Tabs.Item>
          <Tabs.Item>Teams</Tabs.Item>
          <Tabs.Item>Reports</Tabs.Item>
        </Tabs.List>
        <Box marginTop="m">
          <Tabs.Panel>
            <Table>
              <Table.Head>
                <Table.Row>
                  <Table.Header>Name</Table.Header>
                  <Table.Header>Role</Table.Header>
                  <Table.Header>Status</Table.Header>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {people.map(person => (
                  <Table.Row key={person.name}>
                    <Table.Cell>{person.name}</Table.Cell>
                    <Table.Cell>{person.role}</Table.Cell>
                    <Table.Cell>
                      <Pill>{person.status}</Pill>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Tabs.Panel>
        </Box>
      </Tabs>

      <Flex gap="xs" justifyContent="flex-end">
        <TertiaryButton>Cancel</TertiaryButton>
        <SecondaryButton>Save draft</SecondaryButton>
        <PrimaryButton>Submit</PrimaryButton>
      </Flex>
    </Flex>
  );
};
