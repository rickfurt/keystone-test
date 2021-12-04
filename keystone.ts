import {config, list} from '@keystone-6/core';
import {checkbox, password, text} from '@keystone-6/core/fields';
import {document} from '@keystone-6/fields-document';
import {statelessSessions} from '@keystone-6/core/session';
import {createAuth} from '@keystone-6/auth';

const {withAuth} = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
});

const session = statelessSessions({
  secret: 'rickisthebestmaninthewholefuckingworld',
});

const lists = {
  Section: list({
    fields: {
      type: text({validation: {isRequired: true}}),
      header: text(),
      subHeader: text(),
      content: document({
        formatting: true,
        links: true,
        dividers: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
        ],
        relationships: {
          mention: {
            kind: 'inline',
            listKey: 'Author',
            label: 'Mention', // This will display in the Admin UI toolbar behind the `+` icon
            selection: 'id name', // These fields will be available to the renderer
          },
        },
      }),
    },
  }),
  Post: list({
    fields: {
      title: text({validation: {isRequired: true}}),
      slug: text({isIndexed: 'unique', isFilterable: true}),
      content: text(),
    },
  }),
  Summary: list({
    fields: {
      title: text({validation: {isRequired: true}}),
      content: text(),
    },
  }),
  User: list({
    fields: {
      name: text(),
      email: text({isIndexed: 'unique'}),
      password: password(),
      isAdmin: checkbox(),
    },
  })
};


export default withAuth(
  config({
    db: {provider: 'sqlite', url: process.env.DATABASE_URL || 'file:./app.db'},
    lists,
    session,
    experimental: {
      generateNextGraphqlAPI: true,
      generateNodeAPI: true,
    },
  })
);