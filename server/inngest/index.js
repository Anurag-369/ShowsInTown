import { Inngest } from "inngest";
import User from "../models/user.js";

export const inngest = new Inngest({ 
  id: "movie-ticket-booking",
  eventKey: process.env.INNGEST_EVENT_KEY, // Add this
});

// inngest function to save user data to db
const syncUserCreation = inngest.createFunction(
    { id: 'sync-user-from-clerk' },
    { event: 'clerk/user.created' },
    async ({ event, step }) => {
        return await step.run('save-user-to-db', async () => {
            const { id, first_name, last_name, email_addresses, image_url } = event.data;
            const userData = {
                _id: id,
                email: email_addresses[0].email_address,
                name: first_name + ' ' + last_name,
                image: image_url
            };
            return await User.create(userData);
        });
    }
);

// inngest function to delete user from db
const syncUserDeletion = inngest.createFunction(
    { id: 'delete-user-with-clerk' },
    { event: 'clerk/user.deleted' },
    async ({ event, step }) => {
        return await step.run('delete-user-from-db', async () => {
            const { id } = event.data;
            return await User.findByIdAndDelete(id);
        });
    }
);

// inngest function to update user
const syncUserUpdation = inngest.createFunction(
    { id: 'update-user-from-clerk' },
    { event: 'clerk/user.updated' },
    async ({ event, step }) => {
        return await step.run('update-user-in-db', async () => {
            const { id, first_name, last_name, email_addresses, image_url } = event.data;
            const userData = {
                email: email_addresses[0].email_address,
                name: first_name + ' ' + last_name,
                image: image_url
            };
            return await User.findByIdAndUpdate(id, userData);
        });
    }
);

export const functions = [
    syncUserCreation,
    syncUserDeletion,
    syncUserUpdation
];