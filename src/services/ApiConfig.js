const BASE_URL = 'http://localhost:5093'

const endpoints = {
    sharks: {
        getAll: `${BASE_URL}/Sharks`
    },
    tracking: {
        getBySharkId: (sharkId) => `${BASE_URL}/Tracking/shark/${sharkId}`,
        getPrediction: (sharkId, iterations = 1) => `${BASE_URL}/Tracking/shark/${sharkId}/predict?iterations=${iterations}`
    }
}

export default endpoints
