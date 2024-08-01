'use client';

export function createWistiaVideo({
    id,
    name,
    type,
    archived,
    created,
    updated,
    duration,
    hashed_id,
    description,
    progress,
    status,
    thumbnail,
    account_id
  }) {
    return {
      id,
      name,
      type,
      archived,
      created,
      updated,
      duration,
      hashed_id,
      description,
      progress,
      status,
      thumbnail: {
        url: thumbnail?.url,
        width: thumbnail?.width,
        height: thumbnail?.height
      },
      account_id
    };
  }