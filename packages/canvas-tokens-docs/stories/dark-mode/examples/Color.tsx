import * as React from 'react';
import {system} from '@workday/canvas-tokens-web';
import {Avatar} from '@workday/canvas-kit-react/avatar';
import {Banner} from '@workday/canvas-kit-react/banner';
import {PrimaryButton, SecondaryButton, TertiaryButton} from '@workday/canvas-kit-react/button';
import {Card} from '@workday/canvas-kit-react/card';
import {Checkbox} from '@workday/canvas-kit-react/checkbox';
import {FormField} from '@workday/canvas-kit-react/form-field';
import {Box, Flex, Grid} from '@workday/canvas-kit-react/layout';
import {Pill} from '@workday/canvas-kit-react/pill';
import {Switch} from '@workday/canvas-kit-react/switch';
import {Table} from '@workday/canvas-kit-react/table';
import {Tabs} from '@workday/canvas-kit-react/tabs';
import {TextInput} from '@workday/canvas-kit-react/text-input';
import {Heading, Text} from '@workday/canvas-kit-react/text';
import {userFillIcon} from '@workday/canvas-system-icons-web';

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

const teams = [
  {name: 'Design Systems', lead: 'Ava Thompson', members: 8, tag: 'Product'},
  {name: 'Platform', lead: 'Liam Carter', members: 14, tag: 'Engineering'},
  {name: 'People Analytics', lead: 'Noah Patel', members: 5, tag: 'Data'},
];

export const DarkMode = () => {
  const [dark, setDark] = React.useState(false);
  const mode = dark ? 'dark' : 'light';

  return (
    // The Sana CSS applies dark values to `[data-theme="sana-canvas"][data-color-mode="dark"]`
    <Flex
      data-theme="sana-canvas"
      data-color-mode={mode}
      cs={{
        flexDirection: 'column',
        gap: v(system.gap.lg),
        padding: v(system.padding.xl),
        backgroundColor: v(c.surface.root),
        color: v(c.fg.root),
        border: `1px solid ${v(c.border.root)}`,
        borderRadius: v(system.shape.xl),
      }}
    >
      <Flex cs={{justifyContent: 'space-between', alignItems: 'center'}}>
        <Heading size="medium" as="h3">
          Workforce dashboard
        </Heading>
        <Flex cs={{alignItems: 'center', gap: v(system.gap.sm)}}>
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

      <Grid cs={{gridTemplateColumns: 'repeat(3, 1fr)', gap: v(system.gap.lg)}}>
        {stats.map(stat => (
          <Card key={stat.label}>
            <Card.Heading>{stat.label}</Card.Heading>
            <Card.Body>
              <Flex cs={{alignItems: 'center', gap: v(system.gap.sm)}}>
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
        <Box cs={{marginBlockStart: v(system.gap.lg)}}>
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
          <Tabs.Panel>
            <Grid cs={{gridTemplateColumns: 'repeat(3, 1fr)', gap: v(system.gap.lg)}}>
              {teams.map(team => (
                <Card key={team.name}>
                  <Card.Heading>{team.name}</Card.Heading>
                  <Card.Body>
                    <Flex cs={{flexDirection: 'column', gap: v(system.gap.sm)}}>
                      <Flex cs={{alignItems: 'center', gap: v(system.gap.sm)}}>
                        <Avatar name={team.lead} size="extraSmall" />
                        <Text typeLevel="body.medium">{team.lead}</Text>
                      </Flex>
                      <Text typeLevel="subtext.large">{team.members} members</Text>
                      <Box>
                        <Pill>{team.tag}</Pill>
                      </Box>
                    </Flex>
                  </Card.Body>
                </Card>
              ))}
            </Grid>
          </Tabs.Panel>
          <Tabs.Panel>
            <Flex cs={{flexDirection: 'column', gap: v(system.gap.md), maxWidth: '24rem'}}>
              <FormField>
                <FormField.Label>Report name</FormField.Label>
                <FormField.Field>
                  <FormField.Input as={TextInput} placeholder="Quarterly headcount" />
                </FormField.Field>
              </FormField>
              <Checkbox label="Include terminated employees" />
              <Checkbox label="Group by department" defaultChecked />
              <Flex cs={{alignItems: 'center', gap: v(system.gap.sm)}}>
                <Switch defaultChecked />
                <Text typeLevel="body.medium">Email me a weekly summary</Text>
              </Flex>
            </Flex>
          </Tabs.Panel>
        </Box>
      </Tabs>

      <Flex cs={{gap: v(system.gap.sm), justifyContent: 'flex-end'}}>
        <TertiaryButton>Cancel</TertiaryButton>
        <SecondaryButton>Save draft</SecondaryButton>
        <PrimaryButton>Submit</PrimaryButton>
      </Flex>

      <Flex
        cs={{
          justifyContent: 'flex-end',
          padding: v(system.padding.md),
          borderRadius: v(system.shape.md),
          backgroundColor: v(c.surface.contrast.root),
        }}
      >
        <PrimaryButton icon={userFillIcon} variant="inverse">
          Logout
        </PrimaryButton>
      </Flex>
    </Flex>
  );
};
