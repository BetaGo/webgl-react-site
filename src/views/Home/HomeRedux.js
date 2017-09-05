const END_CAMERA_ANIMATE = 'END_CAMERA_ANIMATE';

const initialState = {
  isCameraAnimateEnd: false
};

export function endCameraAnimate() {
  return {
    type: END_CAMERA_ANIMATE
  };
}

export default function home(state = initialState, action) {
  switch (action.type) {
    case END_CAMERA_ANIMATE: {
      return {
        ...state,
        isCameraAnimateEnd: true
      };
    }

    default:
      return state;
  }
}
