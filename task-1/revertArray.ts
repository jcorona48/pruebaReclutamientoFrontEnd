


type Char = string | number;

type SpecialChar = {
    index: number;
    char: Char;
}

const isSpecialCharacter = (char: Char) => {
    return !(typeof char == 'number') && !char.match(/[a-zA-Z0-9]/);
}


 const revertArray = (arr: Char[]) => {
    const specialChars: SpecialChar[] = []

    for (let i = 0; i < arr.length; i++) {
        if (isSpecialCharacter(arr[i])) {
            const specialChar: SpecialChar = {index: i, char: arr[i]}
            specialChars.push(specialChar)
        }
    }

    const reversedArr = arr.filter(char => !isSpecialCharacter(char)).reverse();

    specialChars.forEach((specialChar) => {
        reversedArr.splice(specialChar.index, 0, specialChar.char)
    })

    return reversedArr;
}

const arr = ['n', 2, '&', 'a', 'l', 9, '$', 'q', 47, 'i', 'a', 'j', 'b', 'z', '%', 8];

const result = revertArray(arr);

console.log(result) 
