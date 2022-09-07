interface iEjsDefaultData {
  user: undefined | null | Express.User;
  avatarUrl: string;
  reset: () => void;
}

export const ejsDefaultData: iEjsDefaultData = {
  user: null,
  avatarUrl: '',
  reset: () => {
    ejsDefaultData.user = null;
    ejsDefaultData.avatarUrl = '';
  },
};
