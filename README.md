# Service Discovery

## Create a .env.local file in each service with the following keys:
Create a .env.local file by using this command: `cp env.example .env.local`

## Slack integration
For integrating slack with the application we need to create an app on Slack and get the Webhook URL from it. <br />
You can follow this guide to create a slack integraion for yourself. [Slack integration guide.](https://www.wednesday.is/writing-tutorials/part-1-a-proactive-approach-to-handling-application-errors#toc-6)

## Docker env
To run the application on docker please create an .evn.production in each services with `cp env.example .env.production`

## Install all the dependencies:
- Run `yarn` to install dependencies

## Start both the projects with:
- Use `lerna run start:local` to run both the services in packages directory

