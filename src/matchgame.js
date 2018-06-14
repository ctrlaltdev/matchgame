import Haikunator from '../node_modules/haikunator/lib/haikunator.js'
var haikunator = new Haikunator()

/**
 *Create a word match game
 * @class wordMatch
 */
class matchGame {

  /**
   *Creates an instance of matchGame.
   * @param {!Array.<Array>} elements Arrays of arrays representing the lists that can match together
   * @param {!HTMLElement} domElem the container of the game
   * @memberof matchGame
   */
  constructor(elements, domElem) {
    this.elements = elements
    this.domElem = domElem
    
    this.placeMatchees(this.elements)
  }

  verifyLists(list) {
    let length = list[0].length
    for (let i = 0, k = list.length ; i < k ; i++) {
      if (list[i].length !== length) {
        return false
      }
    }
    return true
  }

  placeMatchees(elements) {
    if (this.verifyLists(elements)) {
      for (let i = 0, k = elements[0].length ; i < k ; i++) {
        for (let j = 0, l = elements.length ; j < l ; l++) {
          console.log(elements[j][i])
        }
        console.info(haikunator.haikunate())
      }
    } else {
      console.warn('The lists don\'t contain the same number of elements')
      return false
    }
  }

  /**
   *The Fisher-Yates (aka Knuth) shuffle
   * @param {!Array} array array that you want shuffled
   * @returns {Array} shuffled array
   * @memberof matchGame
   */
  shuffleMatchees(array) {
    let currentIndex = array.length, temporaryValue, randomIndex

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1

      // And swap it with the current element.
      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }

    return array
  }

  checkMatch() {

  }

  foundMatch() {

  }

  clearMatchees() {

  }

  setEventListeners() {
    let matchees = this.domElem.querySelectorAll('.matchItem');
    [].forEach.call(matchees, (matchee) => {

    })
  }

}

export default matchGame