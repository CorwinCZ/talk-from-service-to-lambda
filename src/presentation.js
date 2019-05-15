import React from 'react';
import {
  Deck,
  Heading,
  ListItem,
  List,
  Slide,
  Text,
  Link,
  Appear,
} from 'spectacle';
import createTheme from 'spectacle/lib/themes/default';

require('normalize.css');

const theme = createTheme(
  {
    primary: 'white',
    secondary: '#1F2022',
    tertiary: '#03A9FC',
    quaternary: '#CECECE',
  },
  {
    primary: 'Montserrat',
    secondary: 'Helvetica',
  },
);

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck transition={['fade']} transitionDuration={500} theme={theme}>
        <Slide bgColor="primary">
          <Heading size={1} fit caps lineHeight={1} textColor="secondary">
            From service to Lambda
          </Heading>
          <Text margin="10px 0 0" textColor="tertiary" size={1} bold>
            Petr Čaněk
          </Text>
          <br />
          <Link
            href="https://github.com/CorwinCZ/talk-from-service-to-lambda"
            taget="_blank"
          >
            https://github.com/CorwinCZ/talk-from-service-to-lambda
          </Link>
        </Slide>

        {/* --- Problem description --- */}
        <Slide bgColor="primary" textColor="tertiary">
          <Heading size={3} textColor="secondary" caps>
            The problem
          </Heading>
          <List>
            <Appear>
              <ListItem size={30}>Data import</ListItem>
            </Appear>
            <Appear>
              <ListItem size={30}>.xml file of various size</ListItem>
            </Appear>
            <Appear>
              <ListItem size={30}>From few MB to ~300MB</ListItem>
            </Appear>
            <Appear>
              <ListItem size={30}>Periodic - every 15 minutes</ListItem>
            </Appear>
          </List>
        </Slide>

        {/* --- Data processing --- */}
        <Slide bgColor="primary" textColor="tertiary">
          <Heading size={6} textColor="secondary" caps>
            Data processing
          </Heading>
          <List>
            <Appear>
              <ListItem size={30}>Convert .xml to JSON objects</ListItem>
            </Appear>
            <Appear>
              <ListItem size={30}>
                Translate keys from German to English
              </ListItem>
            </Appear>
            <Appear>
              <ListItem size={30}>
                Download attachments (few dozens items)
              </ListItem>
            </Appear>
            <Appear>
              <ListItem size={30}>
                Call 3th party API to enrich part of data (slow and throttling
                inputs)
              </ListItem>
            </Appear>
            <Appear>
              <ListItem size={30}>Store data by calling our API</ListItem>
            </Appear>
          </List>
        </Slide>

        {/* --- Requirements --- */}
        <Slide bgColor="primary" textColor="tertiary">
          <Heading size={6} textColor="secondary" caps>
            Requirements
          </Heading>
          <List>
            <Appear>
              <ListItem size={30}>
                Time - it should complete in seconds per item
              </ListItem>
            </Appear>
            <Appear>
              <ListItem size={30}>No data loss</ListItem>
            </Appear>
            <Appear>
              <ListItem size={30}>
                3th party service fails -> continue without it
              </ListItem>
            </Appear>
            <Appear>
              <ListItem size={30}>
                It will change - a lot. New enrichments, new data sources.
              </ListItem>
            </Appear>
            <Appear>
              <ListItem size={30}>
                Architecture, components or code should be re-used by other
                projects / imports
              </ListItem>
            </Appear>
            <Appear>
              <ListItem size={30}>Automate - everything!</ListItem>
            </Appear>
          </List>
        </Slide>

        {/* --- Service / Server way --- */}
        <Slide bgColor="secondary" textColor="primary">
          <Heading size={2} textColor="primary" caps>
            Service / server
          </Heading>
          <Text size={1} textColor="tertiary" bold>
            The "traditional" way
          </Text>
        </Slide>

        {/* --- Server set-up --- */}
        <Slide bgColor="primary" textColor="tertiary">
          <Heading size={6} textColor="secondary" caps>
            Server set-up
          </Heading>
          <List>
            <Appear>
              <ListItem size={30}>
                Node.js server in docker, running in AWS EC2 instance
              </ListItem>
            </Appear>
            <Appear>
              <ListItem size={30}>
                Took the file and called bunch of functions in chain
              </ListItem>
            </Appear>
            <Appear>
              <ListItem size={30}>1 - Split into chunks</ListItem>
            </Appear>
            <Appear>
              <ListItem size={30}>2 - translate keys</ListItem>
            </Appear>
            <Appear>
              <ListItem size={30}>3 - download attachments</ListItem>
            </Appear>
            <Appear>
              <ListItem size={30}>4 - call 3th party API</ListItem>
            </Appear>
            <Appear>
              <ListItem size={30}>
                5 - send data to our API for storage
              </ListItem>
            </Appear>
          </List>
        </Slide>

        {/* --- Disadvantages --- */}
        <Slide bgColor="primary" textColor="tertiary">
          <Heading size={6} textColor="secondary" caps>
            Disadvantages
          </Heading>
          <List>
            <Appear>
              <ListItem size={30}>
                When the process fails, data can be lost
              </ListItem>
            </Appear>
            <Appear>
              <ListItem size={30}>Hard monitoring of status</ListItem>
            </Appear>
            <Appear>
              <ListItem size={30}>Only code can be shared</ListItem>
            </Appear>
            <Appear>
              <ListItem size={30}>
                Cost - server was iddle most of the time
              </ListItem>
            </Appear>
          </List>
        </Slide>
      </Deck>
    );
  }
}
