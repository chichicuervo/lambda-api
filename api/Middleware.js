import ApiObject from './Object'

export class ApiMiddleware extends ApiObject {

    constructor(req, res, next, { noHandle, ...options } = {}) {
        req.log.trace('ApiMiddleware:constructor')

        super(req, res, options)

        const handler = (async () => {
            req.log.trace(`ApiMiddleware:handler/${this.className}`)
            try {
                this.resolve && (await this.resolve())
                next()
            } catch (error) {
                const { message, fileName, lineNumber, ...e } = error
                req.log.error(`ApiMiddleware:handler/${this.className}/catch`, { message, fileName, lineNumber, ...e })
                res.error(500)
            }
        }).bind(this)

        if ( noHandle ) this.handler = handler
        else return handler
    }
}

export default ApiMiddleware
