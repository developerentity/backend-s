/**
 * Create Update Delete repo
 */
export const videoRepository = {};

/**
 * For Read only repo
 */
export const videoQueryRepository = {
  getVideos(): VideoOutputModel[] {
    const dbVideos: DBVideo[] = [];
    const dbAuthors: DBAuthor[] = [];

    return dbVideos.map((dbVideo) => {
      const dbAuthor = dbAuthors.find(
        (author) => author._id === dbVideo.authorId
      );
      return this._mapDBVideoToVideoOutputModel(dbVideo, dbAuthor!);
    });
  },
  getVideoByID(id: string): VideoOutputModel {
    // should get from mondoDB client in future
    const dbVideo: DBVideo = {
      _id: "2345",
      title: "afsd",
      authorId: "3434",
      banObject: {
        isBanned: false,
        banReason: "Rude language",
      },
    };
    const dbAuthor: DBAuthor = {
      _id: "3434",
      firstName: "John",
      lastName: "Dou",
    };
    return this._mapDBVideoToVideoOutputModel(dbVideo, dbAuthor);
  },
  getBannedVideos(id: string): BannedVideoOutputModel {
    const dbVideo: DBVideo = {
      _id: "2345",
      title: "afsd",
      authorId: "3434",
      banObject: {
        isBanned: true,
        banReason: "Rude language",
      },
    };
    const dbAuthor: DBAuthor = {
      _id: "3434",
      firstName: "John",
      lastName: "Dou",
    };
    return {
      id: dbVideo._id,
      title: dbVideo.title,
      author: {
        id: dbAuthor!._id,
        name: dbAuthor!.firstName + " " + dbAuthor.lastName,
      },
      banReason: dbVideo.banObject!.banReason,
    };
  },
  _mapDBVideoToVideoOutputModel(dbVideo: DBVideo, dbAuthor: DBAuthor) {
    return {
      id: dbVideo._id,
      title: dbVideo.title,
      author: {
        id: dbAuthor!._id,
        name: dbAuthor!.firstName + " " + dbAuthor!.lastName,
      },
    };
  },
};

type DBVideo = {
  _id: string;
  title: string;
  authorId: string;
  banObject: {
    isBanned: boolean;
    banReason: string;
  } | null;
};

type DBAuthor = {
  _id: string;
  firstName: string;
  lastName: string;
};

type VideoOutputModel = {
  id: string;
  title: string;
  author: {
    id: string;
    name: string;
  };
};

type BannedVideoOutputModel = {
  id: string;
  title: string;
  author: {
    id: string;
    name: string;
  };
  banReason: string;
};
