function englishToBangla(input: number | string) {
  var numbers: {
    [key: string]: string
  } = {
    0: '০',
    1: '১',
    2: '২',
    3: '৩',
    4: '৪',
    5: '৫',
    6: '৬',
    7: '৭',
    8: '৮',
    9: '৯'
  }

  var output: string[] = []
  let inputNumber = input.toString()

  for (var i = 0; i < inputNumber.length; i++) {
    if (numbers.hasOwnProperty(inputNumber[i])) {
      output.push(numbers[inputNumber[i]])
    } else {
      output.push(inputNumber[i])
    }
  }

  return output.join('').toString()
}

export default englishToBangla
