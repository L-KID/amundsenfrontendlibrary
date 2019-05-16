import { call, put, takeEvery } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

 import {
  AddBookmark,
  AddBookmarkRequest,
  GetBookmarks,
  GetBookmarksForUser,
  GetBookmarksForUserRequest,
  GetBookmarksRequest,
  RemoveBookmark,
  RemoveBookmarkRequest
} from "./types";

 import {
  addBookmark,
  removeBookmark,
  getBookmarks,
  getBookmarksForUser,
} from "./api/v0";


 // AddBookmarks
export function* addBookmarkWorker(action: AddBookmarkRequest): SagaIterator {
  let response;
  try {
    yield call(addBookmark, action);

    // Manage added bookmark on FE or re-fetch all bookmarks?
    response = yield call(getBookmarks);
    yield put({ type: GetBookmarks.SUCCESS, payload: response.table_bookmarks });
  } catch(e) {
    yield put({ type: AddBookmark.FAILURE, payload: response });
   }
}
export function* addBookmarkWatcher(): SagaIterator {
  yield takeEvery(AddBookmark.ACTION , addBookmarkWorker)
}


 // RemoveBookmarks
export function* removeBookmarkWorker(action: RemoveBookmarkRequest): SagaIterator {
  let response;
  try {
    let { resourceKey, resourceType } = action;
    response = yield call(removeBookmark, action);
    yield put({ type: RemoveBookmark.SUCCESS, payload: { resourceKey, resourceType }});
  } catch(e) {
    yield put({ type: RemoveBookmark.FAILURE, payload: response });
  }
}
export function* removeBookmarkWatcher(): SagaIterator {
  yield takeEvery(RemoveBookmark.ACTION , removeBookmarkWorker)
}


 // GetBookmarks
export function* getBookmarksWorker(action: GetBookmarksRequest): SagaIterator {
  let response;
  try {
    response = yield call(getBookmarks);
    yield put({ type: GetBookmarks.SUCCESS, payload: response.table_bookmarks });
  } catch(e) {
    yield put({ type: GetBookmarks.FAILURE, payload: response });
  }
}
export function* getBookmarkskWatcher(): SagaIterator {
  yield takeEvery(GetBookmarks.ACTION, getBookmarksWorker)
}


 // GetBookmarksForUser
export function* getBookmarkForUserWorker(action: GetBookmarksForUserRequest): SagaIterator {
  let response;
  try {
    response = yield call(getBookmarksForUser, action);
    yield put({ type: GetBookmarksForUser.SUCCESS, payload: response.table_bookmarks });
  } catch(e) {
    yield put({ type: GetBookmarksForUser.FAILURE, payload: response });
   }
}
export function* getBookmarksForUserWatcher(): SagaIterator {
  yield takeEvery(GetBookmarksForUser.ACTION, getBookmarkForUserWorker)
}
