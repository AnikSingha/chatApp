/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMessages = /* GraphQL */ `
  subscription OnCreateMessages($filter: ModelSubscriptionMessagesFilterInput) {
    onCreateMessages(filter: $filter) {
      senderID
      text
      timestamp
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateMessages = /* GraphQL */ `
  subscription OnUpdateMessages($filter: ModelSubscriptionMessagesFilterInput) {
    onUpdateMessages(filter: $filter) {
      senderID
      text
      timestamp
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteMessages = /* GraphQL */ `
  subscription OnDeleteMessages($filter: ModelSubscriptionMessagesFilterInput) {
    onDeleteMessages(filter: $filter) {
      senderID
      text
      timestamp
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
      username
      pfp
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
      username
      pfp
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
      username
      pfp
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
