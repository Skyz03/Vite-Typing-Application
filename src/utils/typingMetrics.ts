export function calculateAccuracy(
    typed: string,
    target: string
  ): number {
    if (typed.length === 0) return 100
  
    let correct = 0
    for (let i = 0; i < typed.length; i++) {
      if (typed[i] === target[i]) correct++
    }
  
    return Math.round((correct / typed.length) * 100)
  }
  
  export function calculateWPM(
    typedChars: number,
    timeInSeconds: number
  ): number {
    if (timeInSeconds === 0) return 0
  
    const words = typedChars / 5
    const minutes = timeInSeconds / 60
  
    return Math.round(words / minutes)
  }
  