// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { BookmarksService } from './bookmarks.class'

// Main data model schema
export const bookmarksSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    text: Type.String(),
  },
  { $id: 'Bookmarks', additionalProperties: false }
)
export type Bookmarks = Static<typeof bookmarksSchema>
export const bookmarksValidator = getValidator(bookmarksSchema, dataValidator)
export const bookmarksResolver = resolve<Bookmarks, HookContext<BookmarksService>>({})

export const bookmarksExternalResolver = resolve<Bookmarks, HookContext<BookmarksService>>({})

// Schema for creating new entries
export const bookmarksDataSchema = Type.Pick(bookmarksSchema, ['text'], {
  $id: 'BookmarksData'
})
export type BookmarksData = Static<typeof bookmarksDataSchema>
export const bookmarksDataValidator = getValidator(bookmarksDataSchema, dataValidator)
export const bookmarksDataResolver = resolve<Bookmarks, HookContext<BookmarksService>>({})

// Schema for updating existing entries
export const bookmarksPatchSchema = Type.Partial(bookmarksSchema, {
  $id: 'BookmarksPatch'
})
export type BookmarksPatch = Static<typeof bookmarksPatchSchema>
export const bookmarksPatchValidator = getValidator(bookmarksPatchSchema, dataValidator)
export const bookmarksPatchResolver = resolve<Bookmarks, HookContext<BookmarksService>>({})

// Schema for allowed query properties
export const bookmarksQueryProperties = Type.Pick(bookmarksSchema, ['_id', 'text'])
export const bookmarksQuerySchema = Type.Intersect(
  [
    querySyntax(bookmarksQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type BookmarksQuery = Static<typeof bookmarksQuerySchema>
export const bookmarksQueryValidator = getValidator(bookmarksQuerySchema, queryValidator)
export const bookmarksQueryResolver = resolve<BookmarksQuery, HookContext<BookmarksService>>({})
