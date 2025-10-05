const BASE_URL = 'http://localhost:5093'

const endpoints = {
    sharks: {
        getAll: `${BASE_URL}/Sharks`
    },
    tracking: {
        getBySharkId: (sharkId) => `${BASE_URL}/Tracking/shark/${sharkId}`,
        getPrediction: (sharkId, iterations = 1) => `${BASE_URL}/Tracking/shark/${sharkId}/predict?iterations=${iterations}`
    },
    whiteShark: {
        getPrediction: (sharkId, iterations = 1) => `${BASE_URL}/Tracking/white-shark/${sharkId}/predict?iterations=${iterations}`
    },
    lemonShark: {
        getPrediction: (sharkId, iterations = 1) => `${BASE_URL}/Tracking/lemon-shark/${sharkId}/predict?iterations=${iterations}`
    }
}

export default endpoints
