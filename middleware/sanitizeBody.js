import xss from 'xss'

const sanitize = (sourceString) => {
    return xss(sourceString, {
    whiteList: [],
    stripIgnoreTag: true,
    stripIgnoreTagBody: ['script'],
    })
}

const stripTags = (payload) => {
    const attributes = Object.assign({}, payload)

for (let key in attributes) {
    if (attributes[key] instanceof Array) {
        attributes[key] = attributes[key].map((element) => {
        if (typeof element === 'string') {
            return sanitize(element)
        } else {
            return stripTags(element)
        }
        })
    } else if (attributes[key] instanceof Object) {
        attributes[key] = stripTags(attributes[key])
    } else {
        attributes[key] = sanitize(attributes[key])
    }
}

    return attributes
}

export default function sanitizeBodyMiddleware(req, res, next) {
    const { id, _id, ...attributes } = req.body?.data?.attributes
    req.sanitizedBody = stripTags(attributes)

    next()
}