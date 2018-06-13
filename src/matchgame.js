/**
 *Create a word match game
 * @class wordMatch
 */
class matchGame {

  /**
   *Creates an instance of matchGame.
   * @param {!Array.<Array.<Object>>} elements Array of arrays of object, representing the lists that can match together
   * @param {!HTMLElement} domElem the container of the game
   * @memberof matchGame
   */
  constructor(elements, domElem) {
    this.elements = elements
    this.domElem = domElem
    
    this.elements.map(elem, this.placeMatchees)
  }

  placeMatchees(element) {


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