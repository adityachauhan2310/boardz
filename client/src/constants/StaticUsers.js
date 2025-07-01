import deletedUserAvatar from '../assets/images/deleted-user.png';

export const StaticUserIds = {
  DELETED: null,
};

const DELETED = {
  id: StaticUserIds.DELETED,
  name: 'deletedUser',
  avatar: {
    thumbnailUrls: {
      cover180: deletedUserAvatar,
    },
  },
};

export const STATIC_USER_BY_ID = {
  [StaticUserIds.DELETED]: DELETED,
};

export default {
  DELETED,
};
