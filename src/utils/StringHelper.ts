class StringHelper {
  static slug(value: string = ''): string {
    if (value === '') {
      return value
    }

    let newValue = value
      .replace(/^\s+|\s+$/g, '') // trim
      .toLowerCase()

    // remove accents, swap ñ for n, etc
    const from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:'
    const to = 'aaaaeeeeiiiioooouuuunc------'

    for (let i = 0, l = from.length; i < l; i++) {
      newValue = newValue.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
    }

    newValue = newValue
      .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-') // collapse dashes

    return newValue
  }

  static capitalize(str: string): string {
    return `${str[0].toUpperCase()}${str.slice(1)}`
  }

  static camelize(value: string): string {
    return value
      .split(' ')
      .map(s => `${s.charAt(0).toUpperCase()}${s.substring(1)}`)
      .join(' ')
  }
}

export { StringHelper }
