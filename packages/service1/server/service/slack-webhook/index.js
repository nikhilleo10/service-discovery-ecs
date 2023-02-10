import slackNotify from "slack-notify";
import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.ENVIRONMENT_NAME}` });

export function getSlackClient() {
    try {
        const slackWebhookUrl = process.env.SLACK_WEBHOOK;
        if (slackWebhookUrl) {
            return slackNotify(slackWebhookUrl)
        } else {
           throw new Error('Slack cannot be initialized.') 
        }
    } catch (error) {
        throw new Error(error.message)
    }
}

export const slackBotProfileDetails = {
    username: process.env.SLACK_BOT_USERNAME || 'Service Discovery Bot',
    icon_url: process.env.SLACK_BOT_PROFILE_IMAGE_URL,
}

export const errorSlackBotProfileDetails = {
    username: process.env.ERROR_SLACK_BOT_USERNAME || 'Error Bot',
    icon_emoji: process.env.ERROR_ICON_EMOJI,
}