import { IncomingHttpHeaders } from "http";
import type { NextApiRequest, NextApiResponse } from "next";
import { Webhook, WebhookRequiredHeaders } from "svix";
import { buffer } from "micro";
import { prisma } from "grindylocks/server/db";

export const config = {
    api: {
        bodyParser: false,
    },
};

const webhookSecret: string = process.env.WEBHOOK_SECRET || "";

export default async function handler(
    req: NextApiRequestWithSvixRequiredHeaders,
    res: NextApiResponse
) {
    const payload = (await buffer(req)).toString();
    const headers = req.headers;
    const wh = new Webhook(webhookSecret);
    let evt: Event | null = null;
    try {
        evt = wh.verify(payload, headers) as Event;
    } catch (_) {
        return res.status(400).json({});
    }


    const eventType: EventType = evt.type;
    if (eventType === "user.created" || eventType === "user.updated") {
        const { id } = evt.data;
        if (!evt.data.email_addresses[0]) throw new Error("Email required")
        const email = evt.data.email_addresses[0].email_address
        const username = evt.data.username
        const account = await prisma.account.create({ data: { userId: id, email, username } });
        res.status(200).json(account)
    }

    else res.status(400).json("Event must be user.created")
}

type NextApiRequestWithSvixRequiredHeaders = NextApiRequest & {
    headers: IncomingHttpHeaders & WebhookRequiredHeaders;
};

type Event = {
    data: { id: string; email_addresses: { email_address: string }[], username: string };
    object: "event";
    type: EventType;
};

type EventType = "user.created" | "user.updated" | "*";