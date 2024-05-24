import { call, put, takeLatest, all } from "redux-saga/effects";
import axios from "axios";

const createUsingAxios = (url, payload = null) => {
  return axios.post(url, payload);
};

const fetchUsingAxios = (url, payload = null) => {
  return axios.get(url, payload);
};
// https://ci-demo.hutechweb.com/
// https://ci-demo.hutechweb.com/

function* fetchData() {
  try {
    const posts = yield call(
      fetchUsingAxios,
      " https://ci-demo.hutechweb.com/api/getPosts?post_type=articles&limit=10"
    );
    yield put({ type: "FETCH_DATA_SUCCESS", result: posts });
  } catch (e) {
    yield put({ type: "FETCH_DATA_FAILED", error: e.message });
  }
}

function* fetchTopicList() {
  try {
    const posts = yield call(
      fetchUsingAxios,
      " https://ci-demo.hutechweb.com/api/getPosts?post_type=topics"
    );
    yield put({ type: "FETCH_TOPICS_SUCCESS", result: posts });
  } catch (e) {
    yield put({ type: "FETCH_TOPICS_FAILED", error: e.message });
  }
}

function* fetchTopiDetails(action) {
  // console.log(action.post_id);
  try {
    const posts = yield call(
      fetchUsingAxios,
      ` https://ci-demo.hutechweb.com/api/getPosts?post_type=topics&post_id=${action.post_id}`
    );
    yield put({ type: "FETCH_TOPICS_DETAILS_SUCCESS", result: posts });
  } catch (e) {
    yield put({ type: "FETCH_TOPICS_DETAILS__FAILED", error: e.message });
  }
}
function* getTrendingTags(action) {
  try {
    const posts = yield call(
      fetchUsingAxios,
      ` https://ci-demo.hutechweb.com/api/getTrendingTags?limit=12&post_type=articles`
    );
    yield put({ type: "FETCH_TRENDING_TAG_SUCCESS", result: posts });
  } catch (e) {
    yield put({ type: "FETCH_TRENDING_TAG_FAILED", error: e.message });
  }
}

function* fetchtopicsRelatedTags(action) {
  try {
    const posts = yield call(
      fetchUsingAxios,
      ` https://ci-demo.hutechweb.com/api/search?tags=${action.tag}&post_type=articles`
    );
    yield put({ type: "FETCH_TOPICS_RELATED_DATA_SUCCESS", result: posts });
  } catch (e) {
    yield put({ type: "FETCH_TOPICS_RELATED_DATA_FAILED", error: e.message });
  }
}

function* fetchArticleDetails(action) {
  try {
    const posts = yield call(
      fetchUsingAxios,
      ` https://ci-demo.hutechweb.com/api/getPosts?post_type=articles&post_id=${action.post_id}`
    );
    yield put({ type: "FETCH_ARTICLE_DETAILS_SUCCESS", result: posts });
  } catch (e) {
    yield put({ type: "FETCH_ARTICLE_DETAILS__FAILED", error: e.message });
  }
}
function* fetchCampaign(action) {
  try {
    const campaignData = yield call(
      fetchUsingAxios,

      ` https://ci-demo.hutechweb.com/api/getPosts?post_type=campaigns&limit=10`
    );
    yield put({ type: "FETCH_CAMPAIGN_SUCCESS", result: campaignData });
  } catch (e) {
    yield put({ type: "FETCH_CAMPAIGN_FAILED", error: e.message });
  }
}
function* fetchCampaignDetails(action) {
  try {
    const campaignDetailsData = yield call(
      fetchUsingAxios,
      ` https://ci-demo.hutechweb.com/api/getPosts?post_type=campaigns&post_id=${action.post_id}`
    );
    yield put({
      type: "FETCH_CAMPAIGN_DETAILS_SUCCESS",
      result: campaignDetailsData,
    });
  } catch (e) {
    yield put({ type: "FETCH_CAMPAIGN_DETAILS_FAILED", error: e.message });
  }
}
function* fetchAllImages(action) {
  // console.log("image rd calling+++++++++++++++++");
  try {
    const posts = yield call(
      fetchUsingAxios,
      ` https://ci-demo.hutechweb.com/api/getPosts?post_type=gallery&limit=10`
    );
    yield put({ type: "FETCH_ALL_IMAGES_SUCCESS", result: posts });
    // console.log("success____________-", posts);
  } catch (e) {
    yield put({ type: "FETCH_ALL_IMAGES__FAILED", error: e.message });
    // console.log("erroe_____________-", e);
  }
}
function* fetchImageDetails(action) {
  try {
    const posts = yield call(
      fetchUsingAxios,
      ` https://ci-demo.hutechweb.com/api/getPosts?post_type=gallery&post_id=${action.post_id}`
    );
    yield put({ type: "FETCH_IMAGE_DETAILS_SUCCESS", result: posts });
  } catch (e) {
    yield put({ type: "FETCH_IMAGE_DETAILS__FAILED", error: e.message });
  }
}
function* searchTags(action) {
  try {
    const posts = yield call(
      fetchUsingAxios,
      ` https://ci-demo.hutechweb.com/api/search?tags=${action?.name}`
    );
    yield put({ type: "FETCH_IMAGE_DETAILS_SUCCESS", result: posts });
  } catch (e) {
    yield put({ type: "FETCH_IMAGE_DETAILS__FAILED", error: e.message });
  }
}
function* fetchFeatured() {
  try {
    const posts = yield call(
      fetchUsingAxios,
      ` https://ci-demo.hutechweb.com/api/search?post_type=gallery&tags=photo-feature`
    );
    yield put({ type: "FETCH_FEATURED_SUCCESS", result: posts });
  } catch (e) {
    yield put({ type: "FETCH_FEATURED__FAILED", error: e.message });
  }
}
function* fetchVideo(action) {
  try {
    const videos = yield call(
      fetchUsingAxios,
      ` https://ci-demo.hutechweb.com/api/getPosts?post_type=video`
    );
    yield put({ type: "FETCH_VIDEO_SUCCESS", result: videos });
  } catch (e) {
    yield put({ type: "FETCH_VIDEO_FAILED", error: e.message });
  }
}
function* fetchVideoDetails(action) {
  try {
    const videosDetails = yield call(
      fetchUsingAxios,
      ` https://ci-demo.hutechweb.com/api/getPosts?post_type=video&post_id=${action.post_id}`
    );
    yield put({ type: "FETCH_VIDEO_DETAILS_SUCCESS", result: videosDetails });
  } catch (e) {
    yield put({ type: "FETCH_VIDEO_DETAILS__FAILED", error: e.message });
  }
}

function* featchRelated(action) {
  console.log(action.tag);
  let data = "science-conservation";
  try {
    const post = yield call(
      fetchUsingAxios,
      ` https://ci-demo.hutechweb.com/api/search?post_type=gallery&tags=${action.tag}&limit=10`
      // ` https://ci-demo.hutechweb.com/api/search?post_type=gallery&tags=endangered-species&limit=100`
    );
    yield put({ type: "FETCH_RELATED_IMAGES_SUCCESS", result: post });
  } catch (e) {
    yield put({ type: "FETCH_RELATED_IMAGES_FAILED", error: e.message });
  }
}

function* fetchCommentsData(action) {
  try {
    const comments = yield call(
      fetchUsingAxios,
      ` https://ci-demo.hutechweb.com/api/getComments?post_id=${action.post_id}`
    );
    yield put({ type: "FETCH_COMMENTS_SUCCESS", result: comments });
  } catch (e) {
    yield put({ type: "FETCH_SOMMENTS__FAILED", error: e.message });
  }
}
function* fetchAuthorData(action) {
  // console.log("action++++", action);
  try {
    const authorData = yield call(
      fetchUsingAxios,
      ` https://ci-demo.hutechweb.com/api/getPopularUser?limit=10`
    );
    // console.log(authorData, "authorData");
    yield put({ type: "FETCH_AUTHOR_SUCCESS", result: authorData });
  } catch (e) {
    yield put({ type: "FETCH_AUTHOR_FAILED", error: e.message });
  }
}
function* fetchTagData(action) {
  // console.log("action++++", action);
  try {
    const tagData = yield call(
      fetchUsingAxios,
      ` https://ci-demo.hutechweb.com/api/getTrendingTags?limit=10`
    );
    // console.log(tagData, "tagData");
    yield put({ type: "FETCH_TAGS_SUCCESS", result: tagData });
  } catch (e) {
    yield put({ type: "FETCH_TAGS_FAILED", error: e.message });
  }
}
function* addData(action) {
  try {
    const data = yield call(
      createUsingAxios,
      "http://conservationindia.herokuapp.com/api/post/addtopic",
      action.payload
    );
    yield put({ type: "ADD_DATA_SUCCESS", result: data });
  } catch (e) {
    yield put({ type: "ADD_DATA_FAILED", error: e.message });
  }
}
function* addEmailFun(action) {
  try {
    const emailData = yield call(
      createUsingAxios,
      "http://conservationindia.herokuapp.com/api/post/addSubscribe",
      action.payload,
      { contentType: "application/json" }
    );
    yield put({ type: "ADD_EMAIL_SUCCESS", result: emailData });
  } catch (e) {
    yield put({ type: "ADD_EMAIL_FAILED", error: e.message });
  }
}
function* addAskQusFun(action) {
  try {
    const AskData = yield call(
      createUsingAxios,
      "http://conservationindia.herokuapp.com/api/post/askci",
      action.payload,
      { contentType: "application/json" }
    );
    yield put({ type: "ADD_USERDATA_SUCCESS", result: AskData });
  } catch (e) {
    yield put({ type: "ADD_USERDATA_FAILED", error: e.message });
  }
}
function* allSagas() {
  yield all([
    takeLatest("FETCH_DATA", fetchData),
    takeLatest("FETCH_ARTICLE_DETAILS", fetchArticleDetails),
    takeLatest("FETCH_CAMPAIGN", fetchCampaign),
    takeLatest("FETCH_CAMPAIGN_DETAILS", fetchCampaignDetails),
    takeLatest("FETCH_All_IMAGES", fetchAllImages),
    takeLatest("FETCH_IMAGE_DETAILS", fetchImageDetails),
    takeLatest("SEARCH_TAGS", searchTags),
    takeLatest("FETCH_VIDEOS", fetchVideo),
    takeLatest("FETCH_VIDEOS_DETAILS", fetchVideoDetails),
    takeLatest("FETCH_FEATURED", fetchFeatured),
    takeLatest("FETCH_COMMENTS", fetchCommentsData),
    takeLatest("FETCH_TAGS", fetchTagData),
    takeLatest("FETCH_AUTHOR", fetchAuthorData),
    takeLatest("ADD_DATA", addData),
    takeLatest("ADD_EMAIL", addEmailFun),
    takeLatest("ADD_USERDATA", addAskQusFun),
    takeLatest("FETCH_TOPICS", fetchTopicList),
    takeLatest("TOPICS_DETAILS", fetchTopiDetails),
    takeLatest("TOPICS_RELATED_DATA", fetchtopicsRelatedTags),
    takeLatest("TRENDING_TAGS", getTrendingTags),
    takeLatest("RELATED_IMAGES", featchRelated),
  ]);
}

export default allSagas;
