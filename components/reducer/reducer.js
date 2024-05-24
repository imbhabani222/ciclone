import { combineReducers } from "redux";
const initialState = {
  fetching: false,
  result: null,
  error: null,
};

const listData = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_DATA":
      return {
        ...state,
        fetching: true,
        result: null,
        error: null,
      };
    case "FETCH_DATA_SUCCESS":
      return {
        ...state,
        fetching: false,
        result: action.result.data,
        error: null,
      };

    case "FETCH_DATA_FAILED":
      return {
        ...state,
        fetching: false,
        result: null,
        error: action.error,
      };
    default:
      return state;
  }
};

const listTopics = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_TOPICS":
      return {
        ...state,
        fetching: true,
        result: null,
        error: null,
      };
    case "FETCH_TOPICS_SUCCESS":
      return {
        ...state,
        fetching: false,
        result: action.result.data,
        error: null,
      };

    case "FETCH_TOPICS_FAILED":
      return {
        ...state,
        fetching: false,
        result: null,
        error: action.error,
      };
    default:
      return state;
  }
};

const articleDetails = (state = initialState, action) => {
  switch (action.type) {
    case "ARTICLE_DETAILS":
      return {
        ...state,
        fetching: true,
        result: null,
        error: null,
      };
    case "FETCH_ARTICLE_DETAILS_SUCCESS":
      return {
        ...state,
        fetching: false,
        result: action.result.data,
        error: null,
      };

    case "FETCH_ARTICLE_DETAILS__FAILED":
      return {
        ...state,
        fetching: false,
        result: null,
        error: action.error,
      };
    default:
      return state;
  }
};
const campaignFetchData = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_CAMPAIGN":
      return {
        ...state,
        fetching: true,
        result: null,
        error: null,
      };
    case "FETCH_CAMPAIGN_SUCCESS":
      return {
        ...state,
        fetching: false,
        result: action.result.data,
        error: null,
      };

    case "FETCH_CAMPAIGN__FAILED":
      return {
        ...state,
        fetching: false,
        result: null,
        error: action.error,
      };
    default:
      return state;
  }
};
const campaignDetailsFetchData = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_CAMPAIGN_DETAILS":
      return {
        ...state,
        fetching: true,
        result: null,
        error: null,
      };
    case "FETCH_CAMPAIGN_DETAILS_SUCCESS":
      return {
        ...state,
        fetching: false,
        result: action.result.data,
        error: null,
      };

    case "FETCH_CAMPAIGN_DETAILS_FAILED":
      return {
        ...state,
        fetching: false,
        result: null,
        error: action.error,
      };
    default:
      return state;
  }
};
const allimages = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_All_IMAGES":
      return {
        ...state,
        fetching: true,
        result: null,
        error: null,
      };
    case "FETCH_ALL_IMAGES_SUCCESS":
      return {
        ...state,
        fetching: false,
        result: action.result.data,
        error: null,
      };

    case "FETCH_ALL_IMAGES__FAILED":
      return {
        ...state,
        fetching: false,
        result: null,
        error: action.error,
      };
    default:
      return state;
  }
};
const imageDetails = (state = initialState, action) => {
  switch (action.type) {
    case "IMAGE_DETAILS":
      return {
        ...state,
        fetching: true,
        result: null,
        error: null,
      };
    case "FETCH_IMAGE_DETAILS_SUCCESS":
      return {
        ...state,
        fetching: false,
        result: action.result.data,
        error: null,
      };

    case "FETCH_IMAGE_DETAILS_FAILED":
      return {
        ...state,
        fetching: false,
        result: null,
        error: action.error,
      };
    default:
      return state;
  }
};

const topicsRelatedData = (state = initialState, action) => {
  switch (action.type) {
    case "TOPICS_RELATED_DATA":
      return {
        ...state,
        fetching: true,
        result: null,
        error: null,
      };
    case "FETCH_TOPICS_RELATED_DATA_SUCCESS":
      return {
        ...state,
        fetching: false,
        result: action.result.data,
        error: null,
      };

    case "FETCH_TOPICS_RELATED_DATA_FAILED":
      return {
        ...state,
        fetching: false,
        result: null,
        error: action.error,
      };
    default:
      return state;
  }
};

const searchTags = (state = initialState, action) => {
  switch (action.type) {
    case "SEARCH_TAGS":
      return {
        ...state,
        fetching: true,
        result: null,
        error: null,
      };
    case "SEARCH_TAGS_SUCCESS":
      return {
        ...state,
        fetching: false,
        result: action.result.data,
        error: null,
      };

    case "SEARCH_TAGS_FAILED":
      return {
        ...state,
        fetching: false,
        result: null,
        error: action.error,
      };
    default:
      return state;
  }
};
const allVideos = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_VIDEOS":
      return {
        ...state,
        fetching: true,
        result: null,
        error: null,
      };
    case "FETCH_VIDEO_SUCCESS":
      return {
        ...state,
        fetching: false,
        result: action.result.data,
        error: null,
      };

    case "FETCH_VIDEO_FAILED":
      return {
        ...state,
        fetching: false,
        result: null,
        error: action.error,
      };
    default:
      return state;
  }
};
const videoDetails = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_VIDEOS_DETAILS":
      return {
        ...state,
        fetching: true,
        result: null,
        error: null,
      };
    case "FETCH_VIDEO_DETAILS_SUCCESS":
      return {
        ...state,
        fetching: false,
        result: action.result.data,
        error: null,
      };

    case "FETCH_VIDEO_DETAILS_SUCCESS":
      return {
        ...state,
        fetching: false,
        result: null,
        error: action.error,
      };
    default:
      return state;
  }
};
const featured = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_FEATURED":
      return {
        ...state,
        fetching: true,
        result: null,
        error: null,
      };
    case "FETCH_FEATURED_SUCCESS":
      return {
        ...state,
        fetching: false,
        result: action.result.data,
        error: null,
      };

    case "FETCH_FEATURED__FAILED":
      return {
        ...state,
        fetching: false,
        result: null,
        error: action.error,
      };
    default:
      return state;
  }
};
const authorsData = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_AUTHOR":
      return {
        ...state,
        fetching: true,
        result: null,
        error: null,
      };
    case "FETCH_AUTHOR_SUCCESS":
      return {
        ...state,
        fetching: false,
        result: action.result.data,
        error: null,
      };

    case "FETCH_AUTHOR_FAILED":
      return {
        ...state,
        fetching: false,
        result: null,
        error: action.error,
      };
    default:
      return state;
  }
};

const topicsDetails = (state = initialState, action) => {
  switch (action.type) {
    case "TOPICS_DETAILS":
      return {
        ...state,
        fetching: true,
        result: null,
        error: null,
      };
    case "FETCH_TOPICS_DETAILS_SUCCESS":
      return {
        ...state,
        fetching: false,
        result: action.result.data,
        error: null,
      };

    case "FETCH_TOPICS_DETAILS__FAILED":
      return {
        ...state,
        fetching: false,
        result: null,
        error: action.error,
      };
    default:
      return state;
  }
};
const tagsData = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_TAGS":
      return {
        ...state,
        fetching: true,
        result: null,
        error: null,
      };
    case "FETCH_TAGS_SUCCESS":
      return {
        ...state,
        fetching: false,
        result: action.result.data,
        error: null,
      };

    case "FETCH_TAGS_FAILED":
      return {
        ...state,
        fetching: false,
        result: null,
        error: action.error,
      };
    default:
      return state;
  }
};

const trendingTagData = (state = initialState, action) => {
  switch (action.type) {
    case "TRENDING_TAGS":
      return {
        ...state,
        fetching: true,
        result: null,
        error: null,
      };
    case "FETCH_TRENDING_TAG_SUCCESS":
      return {
        ...state,
        fetching: false,
        result: action.result.data,
        error: null,
      };

    case "FETCH_TRENDING_TAG_FAILED":
      return {
        ...state,
        fetching: false,
        result: null,
        error: action.error,
      };
    default:
      return state;
  }
};

const relatedImg = (state = initialState, action) => {
  switch (action.type) {
    case "RELATED_IMAGES":
      return {
        ...state,
        fetching: true,
        result: null,
        error: null,
      };
    case "FETCH_RELATED_IMAGES_SUCCESS":
      return {
        ...state,
        fetching: false,
        result: action.result.data,
        error: null,
      };

    case "FETCH_RELATED_IMAGES_FAILED":
      return {
        ...state,
        fetching: false,
        result: null,
        error: action.error,
      };
    default:
      return state;
  }
};

const commentsData = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_COMMENTS":
      return {
        ...state,
        fetching: true,
        result: null,
        error: null,
      };
    case "FETCH_COMMENTS_SUCCESS":
      return {
        ...state,
        fetching: false,
        result: action.result.data,
        error: null,
      };

    case "FETCH_SOMMENTS__FAILED":
      return {
        ...state,
        fetching: false,
        result: null,
        error: action.error,
      };
    default:
      return state;
  }
};
const addData = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_DATA":
      return {
        ...state,
        fetching: true,
        result: null,
        error: null,
      };
    case "ADD_DATA_SUCCESS":
      return {
        ...state,
        fetching: false,
        result: action.result.data,
        error: null,
      };

    case "ADD_DATA_FAILED":
      return {
        ...state,
        fetching: false,
        result: null,
        error: action.error,
      };

    default:
      return state;
  }
};
const addEmail = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_EMAIL":
      return {
        ...state,
        fetching: true,
        result: null,
        error: null,
      };
    case "ADD_EMAIL_SUCCESS":
      // console.log(action.result.data)
      return {
        ...state,
        fetching: false,
        result: action.result.data,
        error: null,
      };

    case "ADD_EMAIL_FAILED":
      return {
        ...state,
        fetching: false,
        result: null,
        error: action.error,
      };

    default:
      return state;
  }
};
const addUserData = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_USERDATA":
      return {
        ...state,
        fetching: true,
        result: null,
        error: null,
      };
    case "ADD_USERDATA_SUCCESS":
      // console.log(action.result.data)
      return {
        ...state,
        fetching: false,
        result: action.result.data,
        error: null,
      };

    case "ADD_USERDATA_FAILED":
      return {
        ...state,
        fetching: false,
        result: null,
        error: action.error,
      };

    default:
      return state;
  }
};
export default combineReducers({
  listData,
  addData,
  articleDetails,
  searchTags,
  allimages,
  imageDetails,
  featured,
  addEmail,
  addUserData,
  commentsData,
  authorsData,
  tagsData,
  campaignFetchData,
  campaignDetailsFetchData,
  listTopics,
  topicsDetails,
  allVideos,
  videoDetails,
  topicsRelatedData,
  trendingTagData,
  relatedImg,
});
