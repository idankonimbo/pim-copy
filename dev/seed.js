import { devUser } from './helpers/credentials.js';
export const seed = async (payload) => {
    const { totalDocs } = await payload.count({
        collection: 'users',
        where: {
            email: {
                equals: devUser.email,
            },
        },
    });
    if (!totalDocs) {
        await payload.create({
            collection: 'users',
            data: devUser,
        });
    }
};
