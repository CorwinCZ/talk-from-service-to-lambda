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
  Image,
} from 'spectacle';
import createTheme from 'spectacle/lib/themes/default';

import serverBudget from './assets/server-budget.png';
import lambdaDiagram from './assets/lambda-diagram.png';
import lambdaBudget from './assets/lambda-budget.png';
import lambdaMonitoring from './assets/lambda-monitoring.png';

// memes
import letsDoIt from './assets/letsDoIt.jpg';

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
            href="http://talk-from-service-to-lambda.surge.sh"
            taget="_blank"
          >
            http://talk-from-service-to-lambda.surge.sh
          </Link>
        </Slide>

        {/* --- Problem description --- */}
        <Slide bgColor="primary" textColor="tertiary">
          <Heading size={3} textColor="secondary" caps>
            The problem
          </Heading>
          <List>
            <Appear>
              <ListItem>Data import</ListItem>
            </Appear>
            <Appear>
              <ListItem>.xml file of various size</ListItem>
            </Appear>
            <Appear>
              <ListItem>Size ranging from few MB to ~300MB</ListItem>
            </Appear>
            <Appear>
              <ListItem>Hundreds of items on average</ListItem>
            </Appear>
            <Appear>
              <ListItem>Periodic - every 15 minutes</ListItem>
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
              <ListItem>Convert .xml to JSON objects</ListItem>
            </Appear>
            <Appear>
              <ListItem>Translate keys from German to English</ListItem>
            </Appear>
            <Appear>
              <ListItem>Download attachments (few dozens per item)</ListItem>
            </Appear>
            <Appear>
              <ListItem>
                Call 3th party API to enrich part of data (slow and throttling
                inputs)
              </ListItem>
            </Appear>
            <Appear>
              <ListItem>Store data by calling our API</ListItem>
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
              <ListItem>Time - it should complete in seconds per item</ListItem>
            </Appear>
            <Appear>
              <ListItem>No data loss</ListItem>
            </Appear>
            <Appear>
              <ListItem>
                3th party service fails -> continue without it
              </ListItem>
            </Appear>
            <Appear>
              <ListItem>
                It will change - a lot. New enrichments, new data sources.
              </ListItem>
            </Appear>
            <Appear>
              <ListItem>
                Architecture, components or code should be re-used by other
                projects / imports
              </ListItem>
            </Appear>
            <Appear>
              <ListItem>Automate - everything!</ListItem>
            </Appear>
          </List>
        </Slide>

        {/* --- Lets do it --- */}
        <Slide bgColor="quaternary">
          <Image src={letsDoIt} />
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
              <ListItem>
                Node.js server in docker, running in AWS EC2 instance
              </ListItem>
            </Appear>
            <Appear>
              <ListItem>
                Took the file and called bunch of functions in chain
              </ListItem>
            </Appear>
            <Appear>
              <ListItem>1 - Split into chunks</ListItem>
            </Appear>
            <Appear>
              <ListItem>2 - Translate keys</ListItem>
            </Appear>
            <Appear>
              <ListItem>3 - Download attachments</ListItem>
            </Appear>
            <Appear>
              <ListItem>4 - Call 3th party API</ListItem>
            </Appear>
            <Appear>
              <ListItem>5 - Send data to our API for storage</ListItem>
            </Appear>
          </List>
        </Slide>

        {/* --- Advantages --- */}
        <Slide bgColor="primary" textColor="tertiary">
          <Heading size={6} textColor="secondary" caps>
            Advantages
          </Heading>
          <List>
            <Appear>
              <ListItem>
                Creation of new server is easy - been there, done that
              </ListItem>
            </Appear>
            <Appear>
              <ListItem>All code in one repository</ListItem>
            </Appear>
            <Appear>
              <ListItem>
                Easy to use - give the file, run command, wait for output
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
              <ListItem>This is "naive" implementation</ListItem>
            </Appear>
            <Appear>
              <ListItem>When the process fails, data can be lost</ListItem>
            </Appear>
            <Appear>
              <ListItem>Hard monitoring of status</ListItem>
            </Appear>
            <Appear>
              <ListItem>Only code can be shared</ListItem>
            </Appear>
            <Appear>
              <ListItem>Cost - server was iddle most of the time</ListItem>
            </Appear>
          </List>
        </Slide>

        {/* --- Server cost image --- */}
        <Slide bgColor="quaternary">
          <Image src={serverBudget} />
        </Slide>

        {/* --- Possible improvements --- */}
        <Slide bgColor="primary" textColor="tertiary">
          <Heading size={6} textColor="secondary" caps>
            Possible improvements
          </Heading>
          <List>
            <Appear>
              <ListItem>Use queues in between of steps</ListItem>
            </Appear>
            <Appear>
              <ListItem>Split into multiple services</ListItem>
            </Appear>
            <Appear>
              <ListItem>
                Enrichment and file splitting should be separate processes
              </ListItem>
            </Appear>
            <Appear>
              <ListItem>Don't use JavaScript for file processing...</ListItem>
            </Appear>
          </List>
        </Slide>

        {/* --- Lambda / serverless --- */}
        <Slide bgColor="secondary" textColor="primary">
          <Heading size={2} textColor="primary" caps>
            Lambda serverless
          </Heading>
          <Text size={1} textColor="tertiary" bold>
            The "cool" way
          </Text>
        </Slide>

        {/* --- Lambda description --- */}
        <Slide bgColor="quaternary" bgImage={lambdaDiagram} />

        {/* --- Lambda price --- */}
        <Slide bgColor="quaternary">
          <Image src={lambdaBudget} margin="-133px 0" />
        </Slide>

        {/* --- Advantages Lambda --- */}
        <Slide bgColor="primary" textColor="tertiary">
          <Heading size={6} textColor="secondary" caps>
            Advantages
          </Heading>
          <List>
            <Appear>
              <ListItem>Pay for what you use</ListItem>
            </Appear>
            <Appear>
              <ListItem>Clear separation of concerns</ListItem>
            </Appear>
            <Appear>
              <ListItem>AWS integration</ListItem>
            </Appear>
            <Appear>
              <ListItem>Simple to create and run</ListItem>
            </Appear>
            <Appear>
              <ListItem>Status monitoring ?</ListItem>
            </Appear>
            <Appear>
              <ListItem>Simple task concurency - 1000 default</ListItem>
            </Appear>
          </List>
        </Slide>

        {/* --- Lambda monitoring --- */}
        <Slide bgColor="quaternary">
          <Image src={lambdaMonitoring} />
        </Slide>

        {/* --- Disadvantages Lambda --- */}
        <Slide bgColor="primary" textColor="tertiary">
          <Heading size={6} textColor="secondary" caps>
            Disadvantages
          </Heading>
          <List>
            <Appear>
              <ListItem>Initial learning required - different concept</ListItem>
            </Appear>
            <Appear>
              <ListItem>Debugging - console.logs everywhere</ListItem>
            </Appear>
            <Appear>
              <ListItem>Local development / cloud testing</ListItem>
            </Appear>
            <Appear>
              <ListItem>Lambda / repositories ratio + deployment</ListItem>
            </Appear>
            <Appear>
              <ListItem>AWS IAM - rights to other services...</ListItem>
            </Appear>
          </List>
        </Slide>

        {/* --- Conclusion --- */}
        <Slide bgColor="secondary" textColor="primary">
          <Heading size={2} textColor="primary" caps>
            Conclusion
          </Heading>
          <Text size={1} textColor="tertiary" bold>
            To Lambda or not to Lambda
          </Text>
        </Slide>

        {/* --- Questions in conclusion --- */}
        <Slide bgColor="tertiary" textColor="primary">
          <Heading size={4} textColor="primary">
            Would I use Lambda again?
          </Heading>
          <Appear>
            <Text size={1} textColor="secondary" bold>
              Yes. But not for everything.
            </Text>
          </Appear>
        </Slide>

        {/* --- Questions in conclusion --- */}
        <Slide bgColor="tertiary" textColor="primary">
          <Heading size={4} textColor="primary">
            Is it suitable for full blown API server?
          </Heading>
          <Appear>
            <Text size={1} textColor="secondary" bold>
              No. At least not yet.
            </Text>
          </Appear>
          <Appear>
            <List textColor="secondary">
              <ListItem>Code / repositories / deployment handling</ListItem>
              <ListItem>DB migrations</ListItem>
            </List>
          </Appear>
        </Slide>

        {/* --- Good use-cases --- */}
        <Slide bgColor="tertiary" textColor="primary">
          <Heading size={4} textColor="primary">
            Good Lambda use-cases
          </Heading>
          <List textColor="secondary">
            <Appear>
              <ListItem>Single purpose API's</ListItem>
            </Appear>
            <Appear>
              <ListItem>Data processing</ListItem>
            </Appear>
            <Appear>
              <ListItem>AWS services triggers (S3, SQS, API Gateway)</ListItem>
            </Appear>
            <Appear>
              <ListItem>Ad hoc compute heavy tasks (non-core)</ListItem>
            </Appear>
          </List>
        </Slide>

        <Slide bgColor="secondary" textColor="primary">
          <Heading size={4} textColor="primary">
            So what is Lambda?
          </Heading>
        </Slide>

        <Slide bgColor="secondary" textColor="primary">
          <Heading size={4} textColor="primary">
            Another tool in our toolbelt.
          </Heading>
        </Slide>

        <Slide bgColor="primary">
          <Heading size={1} fit caps lineHeight={1} textColor="secondary">
            Discussion & Q&A
          </Heading>
          <br />
          <Link
            href="http://talk-from-service-to-lambda.surge.sh"
            taget="_blank"
          >
            http://talk-from-service-to-lambda.surge.sh
          </Link>
          <br />
          <br />
          <Link
            href="https://github.com/CorwinCZ/talk-from-service-to-lambda"
            taget="_blank"
          >
            https://github.com/CorwinCZ/talk-from-service-to-lambda
          </Link>
        </Slide>
      </Deck>
    );
  }
}
