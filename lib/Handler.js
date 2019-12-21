import ApiObject from './Object'

export class ApiHandler extends ApiObject {
    constructor(req, res, { noHandle, ...options } = {}) {
        const log = req.log
        log.trace('ApiHandler:constructor')

        super(req, res, options)

        const handler = (async () => {
            req.log.trace(`ApiHandler:handler/${this.className}`)
            try {
                return this.resolve && (await this.resolve()) || { response : null }
            } catch (error) {
                const { message, fileName, lineNumber, ...e } = error
                log.error(`ApiHandler:handler/${this.className}/catch`, { message, fileName, lineNumber, ...e })

                res.status(500)
                return { error: { message, fileName, lineNumber, ...e } }
            }
        }).bind(this)

        if ( noHandle ) this.handler = handler
        else return handler
    }
}

export default ApiHandler
