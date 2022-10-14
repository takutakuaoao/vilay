type KeyValue = 'O' | 'N' | 'S' | 'ctrl' | 'cmd'

export class Key {
  public static ofCtrl(): Key {
    return new Key('ctrl')
  }

  public static ofCmd(): Key {
    return new Key('cmd')
  }

  public static ofN(): Key {
    return new Key('N')
  }

  public static ofO(): Key {
    return new Key('O')
  }

  public static ofS(): Key {
    return new Key('S')
  }

  public constructor(private value: KeyValue) {}

  public capitalize(): string {
    if (this.value.length === 1) {
      return this.value.charAt(0).toUpperCase()
    }

    return this.value.charAt(0).toUpperCase() + this.value.slice(1).toLowerCase()
  }

  public toString(): string {
    return this.value
  }
}
