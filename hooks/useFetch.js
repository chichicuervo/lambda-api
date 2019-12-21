import { useCallback, useEffect, useReducer } from 'react'

export const getData = (data, { unserialize = JSON.parse, field = 'data', ...options } = {}) => {
    if (typeof data === 'string' && data.match(/^\s*(\[|\{|null)/))
        data = unserialize(data)

    if (data && data[field] && typeof data[field] === 'string')
        data = unserialize(data[field])

    if (data && data[field])
        data = data[field]

    return data
}

export const getError = obj => {
    for ( let i of [obj.error, obj.Error, obj]) {
        for (let j of ['error', 'Error']) {
            const error = ((obj, field) => {
                if (obj && obj[field]) {
                    const { error, Error } = obj[field]
                    if (error) return error
                    if (Error) return Error
                }
            })(i, j)

            if (error) return error
        }
    }

    if (obj && obj.errorMessage) return obj.data

    return obj
}

export const reducer = (state, action) => {
    switch (action.type) {
        case 'LOADING': {
            return { ...state, loading: true, complete: false }
        }
        case 'SUCCESS': {
            let { data, error, ...response } = action.payload
            return {
                ...state,
                data: getData(action.payload),
                response,
                error: null,
                loading: false,
                complete: true,
            }
        }
        case 'ERROR': {
            let { data, error, ...response } = action.payload
            return {
                ...state,
                data: getData(action.payload),
                response,
                error: true,
                errorDetails: getError(action.payload),
                loading: false,
                complete: true,
            }
        }
        default:
            return state
    }
}

const localFetch = async (url, { body, serializer = JSON.stringify, expect = 'json', ...options } = {}) => {
    options = {
        ...options,
        body:  body && typeof body === 'string' ? body : serializer(body),
    }

    const response = await fetch(url, options)

    const { headers, ok, status, statusText, ...resp } = response
    if (!response[expect] || !(response[expect] instanceof Function)) {
        throw new Error('Invalid response expect function')
    }

    const data = ![204, 205].includes(status) && await response[expect]()
    const trailers = await resp.trailers

    return { data, headers, ok, status, statusText, url, trailers }
}

export { localFetch as fetch }

export const callbackFetch = async (url, options, { onLoading, onSuccess, onFail, onError } = {}) => {
    try {
        onLoading({ url, options })

        const { ok, ...payload } = await localFetch(url, options)

        ok ? onSuccess({ ok, ...payload }) : onFail({ ok, ...payload })

        return { ok, ...payload }
    } catch (error) {
        onError({ ok, error })
    }
}

export const dispatchFetch = async (url, dispatch, options) =>
    callbackFetch(url, options, {
        onLoading: ()      => dispatch({ type: 'LOADING' }),
        onSuccess: payload => dispatch({ type: 'SUCCESS', payload }),
        onFail:    payload => dispatch({ type: 'ERROR', payload }),
        onError:   payload => dispatch({ type: 'ERROR', payload })
    })

export const useDispatchFetch = (dispatch) => async (url, options) => {
    return dispatchFetch(url, dispatch, options)
}

export const useFetchReducer = () => {
    const [state, dispatch] = useReducer(reducer, {
        data: [],
        error: null,
        loading: true,
    })

    return { state, dispatch }
}

export const useFetch = () => {
    const { state, dispatch } = useFetchReducer()

    return { state, fetch : useDispatchFetch(dispatch) }
}

export const useStatefulFetch = (url, options) => {
    const { state, fetch } = useFetch()

    const fetchQuery = useCallback(fetch, [url])

    useEffect(() => {
        fetchQuery(url)
    }, [fetchQuery, url])

    return state
}

export default useFetch
