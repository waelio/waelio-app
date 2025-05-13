// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Bookmarks, BookmarksData, BookmarksPatch, BookmarksQuery } from './bookmarks.schema'

export type { Bookmarks, BookmarksData, BookmarksPatch, BookmarksQuery }

export interface BookmarksParams extends MongoDBAdapterParams<BookmarksQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class BookmarksService<ServiceParams extends Params = BookmarksParams> extends MongoDBService<
  Bookmarks,
  BookmarksData,
  BookmarksParams,
  BookmarksPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then(db => db.collection('bookmarks'))
  }
}
