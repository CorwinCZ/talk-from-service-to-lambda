import React, { Component } from 'react';
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
import suchLambda from './assets/suchLambda.jpg';
import easyJob from './assets/easyJob.jpg';

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

export default class Presentation extends Component {
  renderAppearListItem = inputString => (
    <Appear>
      <ListItem>{inputString}</ListItem>
    </Appear>
  );

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
            {this.renderAppearListItem(`Data import`)}
            {this.renderAppearListItem(`.xml file of various sizes`)}
            {this.renderAppearListItem('Size ranging from few MB to ~300MB 💽')}
            {this.renderAppearListItem(`Hundreds of items on average 💯`)}
            {this.renderAppearListItem(`Periodic - every 15 minutes ⏱️`)}
          </List>
        </Slide>

        <Slide bgColor="quaternary">
          <Image src={easyJob} />
        </Slide>

        {/* --- Data processing --- */}
        <Slide bgColor="primary" textColor="tertiary">
          <Heading size={6} textColor="secondary" caps>
            Data processing
          </Heading>
          <List>
            {this.renderAppearListItem(`Convert .xml to JSON objects`)}
            {this.renderAppearListItem(`Translate keys from 🇩🇪 to 🇬🇧`)}
            {this.renderAppearListItem(
              `Download attachments (few dozens per item) 🖼️`,
            )}
            {this.renderAppearListItem(
              `Call 3th party API to enrich part of data (slow and throttling requests)`,
            )}
            {this.renderAppearListItem(`Store data by calling our API`)}
          </List>
        </Slide>

        {/* --- Requirements --- */}
        <Slide bgColor="primary" textColor="tertiary">
          <Heading size={6} textColor="secondary" caps>
            Requirements
          </Heading>
          <List>
            {this.renderAppearListItem(`No data loss`)}
            {this.renderAppearListItem(
              `3th party service fails -> continue without it`,
            )}
            {this.renderAppearListItem(
              `It will change - a lot. New enrichments, new data sources`,
            )}
            {this.renderAppearListItem(
              `Architecture, components or code should be re-used by other projects / imports`,
            )}
            {this.renderAppearListItem(`Automate - everything! 🤖`)}
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
            {this.renderAppearListItem(
              `Node.js server in docker, running in AWS EC2 instance`,
            )}
            {this.renderAppearListItem(
              `Took the file and called bunch of functions in chain`,
            )}
            {this.renderAppearListItem(`1 - Split into chunks ✔️`)}
            {this.renderAppearListItem(`2 - Translate keys ✔️`)}
            {this.renderAppearListItem(`3 - Download attachments ✔️`)}
            {this.renderAppearListItem(`4 - Call 3th party API ✔️`)}
            {this.renderAppearListItem(
              `5 - Send data to our API for storage ✔️`,
            )}
          </List>
        </Slide>

        {/* --- Advantages --- */}
        <Slide bgColor="primary" textColor="tertiary">
          <Heading size={6} textColor="secondary" caps>
            Server advantages 👍
          </Heading>
          <List>
            {this.renderAppearListItem(
              `Creation of new server is easy - been there, done that`,
            )}
            {this.renderAppearListItem(`All code in one repository`)}
            {this.renderAppearListItem(
              `Easy to use - give the file, run command, wait for output`,
            )}
          </List>
        </Slide>

        {/* --- Disadvantages --- */}
        <Slide bgColor="primary" textColor="tertiary">
          <Heading size={6} textColor="secondary" caps>
            Server disadvantages 👎
          </Heading>
          <List>
            {this.renderAppearListItem(`This is "naive" implementation`)}
            {this.renderAppearListItem(
              `When the process fails, data can be lost`,
            )}
            {this.renderAppearListItem(`Hard monitoring of status`)}
            {this.renderAppearListItem(`Only code can be shared`)}
            {this.renderAppearListItem(
              `Cost - server was iddle most of the time 💸`,
            )}
          </List>
        </Slide>

        {/* --- Server cost image --- */}
        <Slide bgColor="quaternary">
          <Image src={serverBudget} />
        </Slide>

        {/* --- Possible improvements --- */}
        <Slide bgColor="primary" textColor="tertiary">
          <Heading size={6} textColor="secondary" caps>
            Possible improvements 📈
          </Heading>
          <List>
            {this.renderAppearListItem(`Use queues in between of steps`)}
            {this.renderAppearListItem(`Split into multiple services`)}
            {this.renderAppearListItem(
              `Enrichment and file splitting should be separate processes`,
            )}
            {this.renderAppearListItem(
              `Don't use JavaScript for file processing...`,
            )}
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

        {/* --- Such Lambda --- */}
        <Slide bgColor="quaternary">
          <Image src={suchLambda} />
        </Slide>

        {/* --- Lambda price --- */}
        <Slide bgColor="quaternary">
          <Image src={lambdaBudget} margin="-133px 0" />
        </Slide>

        {/* --- Advantages Lambda --- */}
        <Slide bgColor="primary" textColor="tertiary">
          <Heading size={6} textColor="secondary" caps>
            Lambda advantages 👍
          </Heading>
          <List>
            {this.renderAppearListItem(`Pay for what you use 💸`)}
            {this.renderAppearListItem(`Clear separation of concerns`)}
            {this.renderAppearListItem(`AWS integration 🎉`)}
            {this.renderAppearListItem(`Simple to create and run`)}
            {this.renderAppearListItem(`Status monitoring ?`)}
            {this.renderAppearListItem(`Simple task concurency - 1000 default`)}
          </List>
        </Slide>

        {/* --- Lambda monitoring --- */}
        <Slide bgColor="quaternary">
          <Image src={lambdaMonitoring} />
        </Slide>

        {/* --- Disadvantages Lambda --- */}
        <Slide bgColor="primary" textColor="tertiary">
          <Heading size={6} textColor="secondary" caps>
            Lambda disadvantages 👎
          </Heading>
          <List>
            {this.renderAppearListItem(
              `Initial learning required - different concept`,
            )}
            {this.renderAppearListItem(`Debugging - console.logs everywhere`)}
            {this.renderAppearListItem(`Local development / cloud testing ☁️`)}
            {this.renderAppearListItem(
              `Lambda / repositories ratio + deployment`,
            )}
            {this.renderAppearListItem(`AWS IAM - rights to other services...`)}
            {this.renderAppearListItem(`Vendor / cloud lock-in 🔒`)}
          </List>
        </Slide>

        {/* --- How to Lambda --- */}
        <Slide bgColor="primary" textColor="tertiary">
          <Heading size={6} textColor="secondary" caps>
            How-to Lambda
          </Heading>
          <List>
            {this.renderAppearListItem(
              `Lambda is somewhere between function and module`,
            )}
            {this.renderAppearListItem(`Lambdas are state-less`)}
            {this.renderAppearListItem(`If not, use Step Functions`)}
            {this.renderAppearListItem(`Data flow should be uni-directional`)}
            {this.renderAppearListItem(`Think of logging from line 0`)}
            {this.renderAppearListItem(
              `Running Lambda two times with same data should give same result`,
            )}
            {this.renderAppearListItem(
              `If previous is not possible use dead letter queues`,
            )}
          </List>
        </Slide>

        {/* --- Serverless types --- */}
        <Slide bgColor="primary" textColor="tertiary">
          <Heading size={6} textColor="secondary" caps>
            Serverless types
          </Heading>
          <List>
            {this.renderAppearListItem(`AWS Lambda`)}
            {this.renderAppearListItem(`Azure Functions`)}
            {this.renderAppearListItem(`Google Cloud Functions`)}
            {this.renderAppearListItem(
              `Serverless framework + Apache, CloudFlare, Kubeless`,
            )}
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

          <Text size={1} textColor="secondary" bold>
            Yes. But not for everything.
          </Text>
        </Slide>

        {/* --- Questions in conclusion --- */}
        <Slide bgColor="tertiary" textColor="primary">
          <Heading size={4} textColor="primary">
            Is it suitable for full blown API server?
          </Heading>

          <Text size={1} textColor="secondary" bold>
            No. At least not yet.
          </Text>

          <List textColor="secondary">
            {this.renderAppearListItem(
              `Code / repositories / deployment handling`,
            )}
            {this.renderAppearListItem(`DB migrations`)}
            {this.renderAppearListItem(
              `But maybe for really big teams it could be better?`,
            )}
          </List>
        </Slide>

        {/* --- Good use-cases --- */}
        <Slide bgColor="tertiary" textColor="primary">
          <Heading size={4} textColor="primary">
            Good Lambda use-cases
          </Heading>
          <List textColor="secondary">
            {this.renderAppearListItem(`Single purpose API's`)}
            {this.renderAppearListItem(`Data processing`)}
            {this.renderAppearListItem(
              `AWS services triggers (S3, SQS, API Gateway)`,
            )}
            {this.renderAppearListItem(`Ad hoc compute heavy tasks (non-core)`)}
            {this.renderAppearListItem(`IoT / HW data processing`)}
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
