class BaseError {
  constructor (message, status) {
    // extending error doesnt work with babel (https://stackoverflow.com/a/33877501)
    // super(message)
    this.message = message

    this.name = this.constructor.name

    Error.captureStackTrace(this, this.constructor)

    // this.status = status || 500

    this.code = 100
  }

  toJson () {
    return {
      name: this.name,
      // status: this.status,
      message: this.message,
      code: this.code
    }
  }
}

class MetadataError extends BaseError {
  constructor (message) {
    super(message || 'Metadata Error')
    this.code = 200
  }
}

class MissingPermissionError extends MetadataError {
  constructor (message) {
    super(message || 'Missing Permission')
    this.code = 210
  }
}

export {
  BaseError,
  MetadataError,
  MissingPermissionError
}
