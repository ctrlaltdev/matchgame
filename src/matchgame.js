import Haikunator from '../node_modules/haikunator/lib/haikunator.js'
var haikunator = new Haikunator()

/**
 *Check if is DOM Node
 * @param {*} o
 * @returns {Boolean} true if is DOM Node
 */
function isNode(o){
  return (
    typeof Node === "object" ? o instanceof Node : 
    o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName==="string"
  )
}

/**
 *Check if is HTMLELement
 * @param {*} o
 * @returns {Boolean} true if is Element
 */
function isElement(o){
  return (
    typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
    o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
  )
}

/**
 *Get first parent to have a give className
 * @param {!HTMLElement} el child element
 * @param {!String} className className to look for
 * @returns {HTMLElement} parent element having the className
 */
function getParent(el, className) {
  while (el.parentNode) {
    el = el.parentNode
    if (el.classList.contains(className))
      return el
  }
  return null
}

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
    this.itemsToMatch = this.elements.length
    this.curMatched = 0
    this.curMatchID = ''
    this.matchedElems = []
    
    this.placeMatchees(this.elements)
    this.setEventListeners()
  }

  /**
   *Check the length of each Arrays
   * @param {Array.<Array>} [list=this.elements] arrays to check length
   * @returns {Boolean} true if arrays lengths match
   * @memberof matchGame
   */
  verifyLists(list = this.elements) {
    if (typeof list !== 'undefined') {
      let length = list[0].length
      let total = 0
      list.map((sublist) => {
        total += sublist.length
      })
      return total / list.length == length ? true : false
    }
  }

  /**
   *Place the items to match in columns depending on the number of arrays in the first layer. Assign each elements an id based on its index.
   * @param {Array.<Array>} [elements=this.elements] lists to place
   * @returns void
   * @memberof matchGame
   */
  placeMatchees(elements = this.elements) {
    if (this.verifyLists(elements)) {
      let lists = []
      elements.map((elem) => {lists.push([])})

      for (let i = 0 ; i < elements[0].length ; i++) {
        let haishku = haikunator.haikunate()

        for (let j = 0 ; j < elements.length ; j++) {
          let li = document.createElement('li')
          li.setAttribute('data-matchID', haishku)
          li.classList.add('matchItem')

          if (typeof elements[j][i] == 'string') {
            let liTxt = document.createTextNode(elements[j][i])
            li.appendChild(liTxt)
          } else if (isNode(elements[j][i]) || isElement(elements[j][i])) {
            li.appendChild(elements[j][i])
          } else {
            console.warn(typeof elements[j][i], 'not handled')
          }

          lists[j].push(li)
        }
      }

      lists.map((list) => {
        let ul = document.createElement('ul')
        ul.classList.add('matchItems')
        this.shuffleMatchees(list).map((li) => {
          ul.appendChild(li)
        })

        this.domElem.appendChild(ul)
      })

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

  /**
   *Check if element has already been matched
   * @param {!HTMLElement} elem
   * @returns {boolean} true if element has already been matched
   * @memberof matchGame
   */
  wasMatched(matchedElems, elem) {
    return matchedElems.map((match) => {
      if (match == elem) {return true}
      return false
    }).includes(true)
  }

  /**
   *Check if it is a match between elements clicked
   * @param {*} e
   * @memberof matchGame
   */
  checkMatch(e) {
    let target = e.target.classList.contains('matchItem') ? e.target : getParent(e.target, 'matchItem')

    let matchID = target.getAttribute('data-matchID')

    if (this.curMatched > 0 && this.curMatched < this.itemsToMatch) {
      if (this.curMatchID == matchID && !this.wasMatched(this.matchedElems, target)) {
        target.classList.add('selected')
        this.matchedElems.push(target)
        this.foundMatch()
      } else {
        this.clearMatchees()
      }
    } else if (this.curMatched == 0) {
      this.curMatchID = matchID
      target.classList.add('selected')
      this.matchedElems.push(target)
      this.foundMatch()
    }

  }

  foundMatch() {
    this.curMatched++
    if (this.curMatched == this.itemsToMatch) {
      let matched = this.domElem.querySelectorAll('.selected');
      [].forEach.call(matched, (match) => {
        match.classList.replace('selected','found')
      })
      this.clearMatchees()
    }
  }

  clearMatchees() {
    this.curMatched = 0
    this.curMatchID = ''
    this.matchedElems = []
    let matched = this.domElem.querySelectorAll('.selected');
    [].forEach.call(matched, (match) => {
      match.classList.remove('selected')
    })
  }

  /**
   *Set the EventListeners to the list items placed in DOM
   * @private
   * @memberof matchGame
   */
  setEventListeners() {
    let matchees = this.domElem.querySelectorAll('.matchItem');
    [].forEach.call(matchees, (matchee) => {
      matchee.addEventListener('click', this.checkMatch.bind(this))
    })
  }

}

export default matchGame